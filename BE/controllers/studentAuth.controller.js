const { StudentAuth } = require("../models/studentAuth.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const register = async (req, res, next) => {
    try {
        const { name, email, password, studentId } = req.body;

        const existing = await StudentAuth.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        if (!req.file?.path) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(req.file.path);

        const newStudent = await StudentAuth.create({
            name,
            email,
            password,
            studentId,
            avatar: avatar.url,
        });

        const token = newStudent.generateToken();

        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            token,
            userId: newStudent._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const student = await StudentAuth.findOne({ email }).select("+password");

        if (!student) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isValid = await student.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = student.generateToken();

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
            userId: student._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
