const fs = require("fs/promises");
const path = require("path");

const weblogger = async (req, res, next) => {
    const { order_info } = req.body;
    console.log(order_info);

    const logEntry = `
                    [${new Date().toISOString()}]
                    OrderID: ${order_info?.order_id}
                    Gateway: ${order_info?.gateway}
                    Status: ${order_info?.order_status}
                    Amount: ${order_info?.order_amount} / ${order_info?.transaction_amount}
                    Payment Mode: ${order_info?.payment_mode}
                    Bank Ref: ${order_info?.bank_reference}
                    Message: ${order_info?.payment_message}
                    Error: ${order_info?.error_message}
                    ---
                    `;

    const datatxt_FilePath = path.join(__dirname, "..", "webhookLog.txt")
    try {
        await fs.appendFile(datatxt_FilePath, logEntry, "utf-8");
        console.log(logEntry.trim());

        next()
    } catch (err) {
        next(err);
    }
}

module.exports = weblogger