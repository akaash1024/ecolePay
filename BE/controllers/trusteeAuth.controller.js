
const School = require("../models/school.model");
const { TrusteeAuth } = require("../models/trusteeAuth.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
}


const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await TrusteeAuth.findOne({ email });
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



        const newtrustee = await TrusteeAuth.create({
            name,
            email,
            password,
            role,
            avatar: avatar.url,
        });

        const token = newtrustee.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "trustee registered successfully",
            token,
            userId: newtrustee._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const trustee = await TrusteeAuth.findOne({ email }).select("+password");

        if (!trustee) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isValid = await trustee.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = trustee.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        const safeTrustee = await TrusteeAuth.findById(trustee._id).select("-password");

        const school = await School.findOne({ _id: process.env.SCHOOL_ID });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: safeTrustee,
            userId: trustee._id.toString(),
            school,
        });

    } catch (error) {
        next(error);
    }
};


const user = async (req, res, next) => {
    try {
        const userData = req.user;
        const school = await School.findOne({ _id: process.env.SCHOOL_ID });
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            userData,
            school,
        });

    } catch (error) {
        next(error)
    }
}
module.exports = { register, login, user, logout };
