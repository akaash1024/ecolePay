
const adminAuthRouter = require("express").Router();
const admindAuthController = require("../controllers/adminAuth.controller");

const upload = require("../middleware/multer.middleware");



function checkdata(req, res, next) {
    console.log(`is am i reached here`);
    
    console.log(req.body);
    next()

}

// Admin routes
adminAuthRouter.route("/register").post(checkdata, upload.single("avatar"), admindAuthController.register)
adminAuthRouter.route("/login").post(admindAuthController.login)


// Student routes
// studentAuthRouter.post("/student/register", upload.single("avatar"), studentAuthController.register);
// studentAuthRouter.post("/student/login", studentAuthController.login);

module.exports = adminAuthRouter;
