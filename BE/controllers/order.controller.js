

const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const { StudentAuth } = require("../models/studentAuth.model");
const OrderStatus = require("../models/orderStatus.model");




// Create order
const createOrderRequest = async (req, res, next) => {
    try {
        const { amount, callback_url, student_Id, gateway_name } = req.body;

        const payload = { school_id: process.env.SCHOOL_ID, amount, callback_url };
        const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });

        const { data } = await axios.post(
            "https://dev-vanilla.edviron.com/erp/create-collect-request",
            { ...payload, sign },
            { headers: { Authorization: `Bearer ${process.env.EDVIRON_API_KEY}` } }
        );

        const { collect_request_id, collect_request_url } = data;
        if (!collect_request_id) return res.status(500).json({ message: "Failed to create collect request" });

        const student = await StudentAuth.findById(student_Id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const totalOrders = await Order.countDocuments();
        const sequenceNumber = String(totalOrders + 1).padStart(3, "0"); // 001, 002, etc.

        const newOrder = await Order.create({
            trustee_id: req.userId,
            student_info: { name: student.name, id: student._id.toString(), email: student.email },
            collect_request_id,
            amount
        });

        await OrderStatus.create({
            collect_id: newOrder._id,
            order_amount: amount,
            transaction_amount: 0,
            payment_mode: gateway_name || "online",
            status: "pending",
            custom_order_id: `ORD${sequenceNumber}`
        });

        res.status(200).json({ success: true, newOrder, paymentLink: collect_request_url });
    } catch (err) {
        next(err);
    }
};




// Get all transactions
const getTransactions = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const transactions = await OrderStatus.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "collect_id",
                    foreignField: "_id",
                    as: "order_info"
                }
            },
            { $unwind: "$order_info" },
            { $sort: { custom_order_id: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 0,
                    collect_id: "$collect_id",
                    school_id: "$order_info.school_id",
                    gateway: "$order_info.gateway_name",
                    order_amount: "$order_amount",
                    transaction_amount: "$transaction_amount",
                    status: "$status",
                    custom_order_id: "$custom_order_id",

                }
            }
        ]);

        const totalOrders = await Order.countDocuments();

        res.status(200).json({ success: true, ordersList: transactions, totalOrders });
    } catch (err) {
        next(err);
    }
};


// Transactions by school
const getTransactionsBySchool = async (req, res, next) => {
    try {
        const { schoolId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(schoolId))
            return res.status(400).json({ success: false, message: "Invalid schoolId" });

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sort || "payment_time";
        const sortOrder = req.query.order === "desc" ? -1 : 1;
        const skip = (page - 1) * limit;

        const transactions = await OrderStatus.aggregate([
            { $lookup: { from: "orders", localField: "collect_id", foreignField: "_id", as: "order_info" } },
            { $unwind: "$order_info" },
            { $match: { "order_info.school_id": new mongoose.Types.ObjectId(schoolId) } },
            { $sort: { [sortField]: sortOrder } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 0,
                    collect_id: "$collect_id",
                    school_id: "$order_info.school_id",
                    gateway: "$order_info.gateway_name",
                    order_amount: "$order_amount",
                    transaction_amount: "$transaction_amount",
                    status: "$status",
                    custom_order_id: "$order_info.collect_request_id",
                    payment_time: "$payment_time"
                }
            }
        ]);

        res.status(200).json({ success: true, data: transactions });
    } catch (err) {
        next(err);
    }
};


const checkOrder_status = async (req, res, next) => {
    const { customOrderId } = req.params;
    //68d17659154d1bce65b60d77
    try {
        const getOrderStatus = await OrderStatus.findOne({ custom_order_id: customOrderId })

        const getOrder = await Order.findOne({ _id: getOrderStatus.collect_id.toString() });
        const { collect_request_id, student_info } = getOrder

        const payload = { school_id: process.env.SCHOOL_ID, collect_request_id };
        const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });

        const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${process.env.SCHOOL_ID}&sign=${sign}`;

        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${process.env.EDVIRON_API_KEY}` }
        });

        const studentData = await StudentAuth.find({ _id: student_info.id }).select("-password")

        return res.status(200).json({ orderStaus: data, studentData });
    } catch (error) {
        next(error);
    }
};



module.exports = { createOrderRequest, checkOrder_status, getTransactions, getTransactionsBySchool, checkOrder_status };