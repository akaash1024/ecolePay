const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentAuthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: { type: String, enum: ["student"], default: "student" },
});

// hash password before saving
studentAuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// compare password
studentAuthSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// generate JWT token
studentAuthSchema.methods.generateToken = function () {
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

const StudentAuth = mongoose.model("StudentAuth", studentAuthSchema);
module.exports = { StudentAuth };
