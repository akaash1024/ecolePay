const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId("65b0e6293e9f76a9694d84b5"),
        required: true
    },
    trustee_id: { type: mongoose.Schema.Types.ObjectId, ref: "TrusteeAuth", required: true },
    student_info: {
        name: { type: String, required: true },
        id: { type: String, required: true },
        email: { type: String, required: true }
    },
    gateway_name: { type: String, },
    collect_request_id: { type: String, required: true },
    amount: { type: Number, required: true }
}, {
    timestamps: true
});


orderSchema.index({ school_id: 1 });
orderSchema.index({ collect_request_id: 1 });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
