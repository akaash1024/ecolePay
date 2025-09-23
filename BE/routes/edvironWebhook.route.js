const Order = require("../models/order.model");
const OrderStatus = require("../models/orderStatus.model");
const fs = require("fs/promises");
const path = require("path");

const edvironWebhook = async (req, res, next) => {
    try {
        const { status, order_info } = req.body;

        if (status !== 200 || !order_info) {
            return res.status(400).json({ message: "Invalid webhook payload" });
        }

        const {
            order_id,
            transaction_amount,
            gateway,
            bank_reference,
            order_status,
            payment_mode,
            payment_details,
            payment_message,
            payment_time,
            error_message
        } = order_info;

        // Find the order
        // collection (Link id) 68d13097154d1bce65b604bb
        // orderId // orderStatus = 68d130921dd8ef0412ff6e8f
        
        const order = await Order.findOne({ _id: order_id });
        console.log(order);

        if (!order) return res.status(404).json({ message: "Order not found" });
        
        // // Find the OrderStatus
        const orderStatus = await OrderStatus.findOne({ collect_id: order._id });
        if (!orderStatus) return res.status(404).json({ message: "OrderStatus not found" });
        console.log(orderStatus);
        
        // res.status(200).json({message: "Reach till here", result:orderStatus})

        // // Update fields
        orderStatus.status = order_status;
        orderStatus.transaction_amount = transaction_amount;
        orderStatus.payment_mode = payment_mode || gateway;
        orderStatus.payment_details = payment_details || "";
        orderStatus.payment_message = payment_message || "";
        orderStatus.bank_reference = bank_reference || "";
        orderStatus.payment_time = payment_time ? new Date(payment_time) : new Date();
        orderStatus.error_message = error_message || "";

        await orderStatus.save();

        return res.status(200).json({ success: true, messaage: `Order number ${order_id} has been updated☑️` });
    } catch (err) {
        next(err);
    }

};

module.exports = edvironWebhook;
