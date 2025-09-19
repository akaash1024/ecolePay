const isAuthenticated = require("../middleware/isAuthenicated.middleware");
const transactionController = require("../controllers/transaction.controller")

const transactionRouter = require("express").Router()


transactionRouter.route("/create-payment").post( transactionController.createOrderRequest)
transactionRouter.route("/check-status/:collect_request_id").get( transactionController.checkOrder_status)



module.exports = transactionRouter;