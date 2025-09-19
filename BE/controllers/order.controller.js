const axios = require("axios");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.model");
const { StudentAuth } = require("../models/studentAuth.model");
const OrderStatus = require("../models/orderStatus.model");

const createOrderRequest = async (req, res, next) => {
    try {
        const { amount, callback_url, student_Id, gateway_name } = req.body;

        // Payload for signing
        const payload = {
            school_id: process.env.SCHOOL_ID,
            amount,
            callback_url,
            webhook: "https://ecolepay.onrender.com/webhook",
        };

        const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });
        const requestPayload = { ...payload, sign };

        // Call external API to create collect request
        const url = "https://dev-vanilla.edviron.com/erp/create-collect-request";
        const { data } = await axios.post(url, requestPayload, {
            headers: { Authorization: `Bearer ${process.env.EDVIRON_API_KEY}` }
        });

        const { collect_request_id, collect_request_url } = data;

        if (!collect_request_id) {
            return res.status(500).json({ message: "Failed to create collect request" });
        }

        // Find student
        const student = await StudentAuth.findById(student_Id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Create Order
        const newOrder = await Order.create({
            trustee_id: req.userId,
            student_info: {
                name: student.name,
                id: student._id.toString(),
                email: student.email
            },
            gateway_name: gateway_name || "online",
            collect_request_id,
            amount
        });

        // Create initial OrderStatus (pending)
        await OrderStatus.create({
            order_id: newOrder._id,
            order_amount: amount,
            transaction_amount: 0,
            payment_mode: gateway_name || "online",
            status: "pending"
        });

        return res.status(200).json({ success: true, newOrder, paymentLink: collect_request_url });
    } catch (err) {
        next(err);
    }
};

const checkOrder_status = async (req, res, next) => {
    try {
        const { collect_request_id } = req.params;
        const payload = { school_id: process.env.SCHOOL_ID, collect_request_id };
        const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });

        const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${process.env.SCHOOL_ID}&sign=${sign}`;

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${process.env.EDVIRON_API_KEY}` } // Ensure env var
        });

        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrderRequest, checkOrder_status };
