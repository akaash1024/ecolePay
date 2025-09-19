

const studentAuthRouter = require("express").Router()
const studentAuthController = require("../controllers/studentAuth.controller")
const isAuthenticated = require("../middleware/isAuthenicated.middleware")



// student
studentAuthRouter.route("/login").post(studentAuthController.login)



module.exports = studentAuthRouter