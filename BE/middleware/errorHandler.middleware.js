const errorHandler = (err, req, res, next) => {
    console.log(`What am i not getting the err`, err);
    
    const success = false;
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || err.stack || "Something went wrong";
    console.log(status);
    

    res.status(status).json({ success, status, message, extraDetails });
};



module.exports = errorHandler;