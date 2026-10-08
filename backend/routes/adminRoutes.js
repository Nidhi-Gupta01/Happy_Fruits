const express = require("express");

const {
  loginAdmin,
  getDashboardStats,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// PUBLIC
// =====================================================

// Admin Login
router.post("/login", loginAdmin);


// =====================================================
// PROTECTED ADMIN ROUTES
// =====================================================

// Dashboard Stats
router.get(
  "/dashboard",
  protectAdmin,
  getDashboardStats
);


module.exports = router;