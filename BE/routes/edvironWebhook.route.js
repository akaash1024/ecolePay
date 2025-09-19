const Order = require("../models/order.model");
const OrderStatus = require("../models/orderStatus.model");

const edvironWebhook = async (req, res, next) => {
    try {
        const { status, order_info } = req.body;

        if (status !== 200 || !order_info) {
            return res.status(400).json({ message: "Invalid webhook payload" });
        }

        const {
            order_id,
            order_amount,
            transaction_amount,
            gateway,
            bank_reference,
            status: paymentStatus,
            payment_mode,
            payemnt_details,
            Payment_message,
            payment_time,
            error_message
        } = order_info;

        // Find the order
        const order = await Order.findOne({ collect_request_id: order_id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Find the OrderStatus
        const orderStatus = await OrderStatus.findOne({ order_id: order._id });
        if (!orderStatus) return res.status(404).json({ message: "OrderStatus not found" });

        // Update fields
        orderStatus.status = paymentStatus;
        orderStatus.transaction_amount = transaction_amount;
        orderStatus.payment_mode = payment_mode || gateway;
        orderStatus.payment_details = payemnt_details || "";
        orderStatus.payment_message = Payment_message || "";
        orderStatus.bank_reference = bank_reference || "";
        orderStatus.payment_time = payment_time ? new Date(payment_time) : new Date();
        orderStatus.error_message = error_message || "";

        await orderStatus.save();

        return res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};

module.exports = edvironWebhook;
