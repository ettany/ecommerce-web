const orderRouter = require("express").Router();
const authMiddle = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");
const Order = require("../models/orderModel");

orderRouter.get(
  "/",
  [authMiddle.isAuth, authMiddle.isSellerOrAdmin],
  orderController.getOrderList
);

orderRouter.post("/", authMiddle.isAuth, orderController.createOrder);

orderRouter.get("/mine", authMiddle.isAuth, orderController.getOrderHistory);
orderRouter.get(
  "/paySummary",
  [authMiddle.isAuth, authMiddle.isAdmin],
  orderController.paySummary
);
orderRouter.get(
  "/paySummary1",
  [authMiddle.isAuth, authMiddle.isAdmin],
  orderController.paySummary1
);
orderRouter.get(
  "/monthRevenue",
  [authMiddle.isAuth, authMiddle.isSellerOrAdmin],
  orderController.calculateMonthRevenue
);
orderRouter.put(
  "/watch/:orderId",
  [authMiddle.isAuth, authMiddle.isSellerOrAdmin],
  orderController.updateWatchOrder
);

orderRouter.put(
  "/paySellerSalary/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  orderController.paySellerSalary
);

orderRouter.get("/:id", authMiddle.isAuth, orderController.getOrderByID);

orderRouter.delete(
  "/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  orderController.deleteOrder
);

orderRouter.put("/:id/pay", authMiddle.isAuth, orderController.updateOrderByID);

orderRouter.put(
  "/:id/deliver",
  authMiddle.isAuth,
  orderController.deliverOrder
);

module.exports = orderRouter;
