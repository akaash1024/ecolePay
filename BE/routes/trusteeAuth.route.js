
const trusteeAuthRouter = require("express").Router();
const trusteedAuthController = require("../controllers/trusteeAuth.controller");
const isAuthenticated = require("../middleware/isAuthenicated.middleware");
const studentAuthController = require("../controllers/studentAuth.controller")
const upload = require("../middleware/multer.middleware");



function checkdata(req, res, next) {
    console.log(`is am i reached here`);

    console.log(req.body);
    next()

}

// get logged in user
trusteeAuthRouter.route("/me").get(isAuthenticated, trusteedAuthController.user);


// trustee routes
trusteeAuthRouter.route("/register").post(checkdata, upload.single("avatar"), trusteedAuthController.register)
trusteeAuthRouter.route("/login").post(trusteedAuthController.login)
trusteeAuthRouter.route("/logout").get(trusteedAuthController.logout) 


// Student routes


trusteeAuthRouter.route("/create-user").post(isAuthenticated, upload.single("avatar"), studentAuthController.register)
// studentAuthRouter.post("/student/login", studentAuthController.login);

module.exports = trusteeAuthRouter;