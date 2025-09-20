const mongoose = require("mongoose");

const webhookLogSchema = new mongoose.Schema(
    {
        collect_id : { type: String, required: true },
        payload: { type: Object, required: true },
        received_at: { type: Date, default: Date.now },
        status: { type: String, default: "pending" }
    },
    {
        timestamps: true
    }
);

const WebhookLog = mongoose.model("WebhookLog", webhookLogSchema);

module.exports = WebhookLog;
