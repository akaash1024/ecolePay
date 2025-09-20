const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema({
    collect_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    order_amount: { type: Number, required: true },
    transaction_amount: { type: Number, default: 0 },
    payment_mode: { type: String, enum: ["cash", "online"], required: true },
    payment_details: { type: String, default: "" },
    bank_reference: { type: String, default: "" },
    payment_message: { type: String, default: "" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    error_message: { type: String, default: "" },
    payment_time: { type: Date, default: null }
}, {
    timestamps: true
});


orderStatusSchema.index({ collect_id: 1 });
orderStatusSchema.index({ status: 1 });
orderStatusSchema.index({ payment_time: -1 });

const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);
module.exports = OrderStatus;
