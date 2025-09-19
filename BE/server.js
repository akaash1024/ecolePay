require("dotenv").config();
const express = require("express");
const { connectDB } = require("./database/connectDB");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const trusteeAuthRouter = require("./routes/trusteeAuth.route");

const errorHandler = require("./middleware/errorHandler.middleware");
const studentAuthRouter = require("./routes/studentAuth.route");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/orderRouter.route");
const edvironWebhook = require("./routes/edvironWebhook.route");


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Single webhook route
app.post("/webhook", edvironWebhook);

app.use("/api/trustee", trusteeAuthRouter)

app.use("/api/order", orderRouter)


// TODO student- FUTURE Scaling
app.use("/api/student", studentAuthRouter)



/*
// Generate token for collect-request creation
app.use("/generateToken", (req, res) => {
    const pg_key = process.env.PG_SECRET_KEY || "edvtest01"; // secure it via env
    const payload = {
        school_id: "65b0e6293e9f76a9694d84b4",
        amount: "5000",
        callback_url: "https://hiredd-dun.vercel.app/"
    };

    try {
        const token = jwt.sign(payload, pg_key, { algorithm: "HS256" });
        console.log("SIGN:", token);
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error generating token:", err.message);
        return res.status(500).json({ error: "Token generation failed" });
    }
});

app.get("/check-status", async (req, res) => {
    try {
        const school_id = "65b0e6293e9f76a9694d84b4";
        const collect_request_id = "68cce01d154d1bce65b56d2f"; 
        const pg_key = "edvtest01"; 
        const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVlSWQiOiI2NWIwZTU1MmRkMzE5NTBhOWI0MWM1YmEiLCJJbmRleE9mQXBpS2V5Ijo2fQ.IJWTYCOurGCFdRM2xyKtw6TEcuwXxGnmINrXFfsAdt0"

        // Generate sign token
        const payload = { school_id, collect_request_id };
        const sign = jwt.sign(payload, pg_key, { algorithm: "HS256" });
        console.log("✅ Generated Sign:", sign);

        // Build URL
        const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${school_id}&sign=${sign}`;

        // Call API with Authorization header
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${api_key}` },
        });

        console.log("Payment Status:", response.data);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("❌ Error checking status:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to check payment status" });
    }
});

*/



const PORT = process.env.PORT || 5000;
app.use(errorHandler)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is listening at http://localhost:${PORT}/`);
    });
});
