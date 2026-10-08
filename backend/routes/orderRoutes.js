const express = require("express");
const protectAdmin = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  trackOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// =====================================================
// CUSTOMER
// =====================================================

// Create new order
router.post("/", createOrder);

// Track order - Order ID + Mobile required
router.post("/track", trackOrder);


// =====================================================
// ADMIN
// =====================================================

// Get all orders
router.get("/", protectAdmin, getOrders);

// Get single order
router.get("/:id", protectAdmin, getOrderById);

// Update order status
router.put("/:id/status", protectAdmin, updateOrderStatus);

module.exports = router;