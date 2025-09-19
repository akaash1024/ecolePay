const axios = require("axios");
const jwt = require("jsonwebtoken");

const createOrderRequest = async (req, res, next) => {
    try {
        const { amount, callback_url } = req.body;
        console.log(amount);
        console.log(callback_url);
        
        const payload = {
            school_id: process.env.SCHOOL_ID,
            amount,
            callback_url,
        };
        
        
        
        // // Sign payload
        const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, {
            algorithm: "HS256",
        });

        const requestPayload = { ...payload, sign };
        
        const url = "https://dev-vanilla.edviron.com/erp/create-collect-request";

        const response = await axios.post(url, requestPayload, {
            headers: { Authorization: `Bearer ${process.env.APII_KEY}` },
        });

        return res.status(200).json(response.data);
        
    } catch (err) {
        next(err); // let errorHandler middleware handle it
    }
};


const checkOrder_status = async (req, res, next) => {
    const school_id = process.env.SCHOOL_ID;
    const pg_key = process.env.PG_SECRET_KEY;

    
    try {
        const { collect_request_id } = req.params;

        const payload = { school_id, collect_request_id };

        const sign = jwt.sign(payload, pg_key, { algorithm: "HS256" });

        const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${school_id}&sign=${sign}`;

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${process.env.APII_KEY}` },
        });

        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};



module.exports = { createOrderRequest, checkOrder_status };
