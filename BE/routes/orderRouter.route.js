const isAuthenticated = require("../middleware/isAuthenicated.middleware");
const orderController = require("../controllers/order.controller");
const edvironWebhook = require("./edvironWebhook.route");
const { validateCreateOrder, validateCheckTransaction } = require("../utils/validation");

const orderRouter = require("express").Router()


orderRouter.route("/transactions").get(isAuthenticated, orderController.getTransactions)

orderRouter.route("/transactions/school/:schoolId").post(isAuthenticated, orderController.getTransactionsBySchool)



orderRouter.route("/create-payment").post(isAuthenticated, validateCreateOrder, orderController.createOrderRequest)


orderRouter.route("/check-status/:customOrderId").get(isAuthenticated, orderController.checkOrder_status)



module.exports = orderRouter;