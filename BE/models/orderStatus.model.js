const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
    {
        collect_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        order_amount: { type: Number, required: true },
        transaction_amount: { type: Number, required: true },
        payment_mode: { type: String, required: true },
        payment_details: { type: String, default: "" },
        bank_reference: { type: String, default: "" },
        payment_message: { type: String, default: "" },
        status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
        error_message: { type: String, default: "" },
        payment_time: { type: Date, default: null }
    },
    {
        timestamps: true 
    }
);

const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);

module.exports = OrderStatus;
