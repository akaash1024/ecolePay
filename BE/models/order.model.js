const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    school_id: {type: mongoose.Schema.Types.ObjectId,default: "65b0e6293e9f76a9694d84b4", required: true},
    trustee_id: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true },
    student_info: {
        name: { type: String, required: true },
        id: { type: String, required: true }, 
        email: { type: String, required: true }
    },
    gateway_name: {type: String,required: true}
    }, 
    
    {
    timestamps: true 
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
