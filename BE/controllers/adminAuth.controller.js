const { AdminAuth } = require("../models/adminAuth.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await AdminAuth.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        

        const newAdmin = await AdminAuth.create({
            name,
            email,
            password,
            role,
            avatar: avatar.url,
        });

        const token = newAdmin.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            token,
            userId: newAdmin._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminAuth.findOne({ email }).select("+password");

        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isValid = await admin.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = admin.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            userId: admin._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
