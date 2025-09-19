const isAuthenticated = require("../middleware/isAuthenicated.middleware");
const orderController = require("../controllers/order.controller")

const orderRouter = require("express").Router()


orderRouter.route("/create-payment").post( isAuthenticated,orderController.createOrderRequest)

orderRouter.route("/check-status/:collect_request_id").get( orderController.checkOrder_status)



module.exports = orderRouter;