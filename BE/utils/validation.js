const { z } = require("zod");

// Create Order
const createOrderSchema = z.object({
    amount: z.number().positive({ message: "Amount must be > 0" }),
    callback_url: z.string().url({ message: "Invalid callback URL" }),
    student_Id: z.string().length(24, { message: "Invalid student ID" }),
    gateway_name: z.enum(["online", "cash"]).optional()
});

const validateCreateOrder = (req, res, next) => {
    try {
        createOrderSchema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ success: false, errors: err.errors });
    }
};

// Check Transaction Params
const checkTransactionParamsSchema = z.object({
    custom_order_id: z.string().length(24, { message: "Invalid custom_order_id" })
});

const validateCheckTransaction = (req, res, next) => {
    try {
        checkTransactionParamsSchema.parse(req.params);
        next();
    } catch (err) {
        return res.status(400).json({ success: false, errors: err.errors });
    }
};

module.exports = { validateCreateOrder, validateCheckTransaction };
