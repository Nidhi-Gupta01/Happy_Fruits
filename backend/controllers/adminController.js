const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully 🔐",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin Register Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to register admin",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful 🔐",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const Order = require("../models/Order");
    const Product = require("../models/Product");

    console.log("Dashboard request received");
    console.log("Admin:", req.admin);

    const totalOrders = await Order.countDocuments();

    const confirmedOrders = await Order.countDocuments({
      status: "Order Confirmed",
    });

    const preparingOrders = await Order.countDocuments({
      status: "Preparing",
    });

    const outForDeliveryOrders = await Order.countDocuments({
      status: "Out for Delivery",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });

    const totalProducts = await Product.countDocuments();

    const availableProducts = await Product.countDocuments({
      isAvailable: true,
    });

    console.log("Dashboard stats:", {
      totalOrders,
      confirmedOrders,
      preparingOrders,
      outForDeliveryOrders,
      deliveredOrders,
      cancelledOrders,
      totalProducts,
      availableProducts,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        confirmedOrders,
        preparingOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders,
        totalProducts,
        availableProducts,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getDashboardStats,
};