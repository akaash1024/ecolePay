const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const trusteeAuthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["trustee"], default: "trustee" },
    avatar: { type: String, required: true },
});

// Hash password before save
trusteeAuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

trusteeAuthSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

trusteeAuthSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );
};

const TrusteeAuth = mongoose.model("TrusteeAuth", trusteeAuthSchema);
module.exports = { TrusteeAuth };
