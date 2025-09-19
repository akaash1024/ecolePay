const jwt = require("jsonwebtoken");
const User = require("../model/user.model");


const isAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Token not provided." });
    }
    
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userData = await User.findById(decoded.userId).select("-password");
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = isAuthenticated;
