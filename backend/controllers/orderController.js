const Order = require("../models/Order");
const transporter = require("../config/mailer");

// =====================================================
// CREATE ORDER
// =====================================================
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // -------------------------------------------------
    // ADMIN EMAIL
    // -------------------------------------------------
    try {
      const itemsHtml = order.items
        .map(
          (item) => `
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ${item.name}
              </td>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ${item.quantity} ${item.unit}
              </td>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ₹${item.price}
              </td>
            </tr>
          `
        )
        .join("");

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `🍊 New Order Received - ${order._id}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">
            <h2 style="color:#ff7114;">🍊 New Happy Fruits Order</h2>

            <p><strong>Order ID:</strong> ${order._id}</p>

            <h3>Customer Details</h3>

            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Mobile:</strong> ${order.customer.mobile}</p>
            <p><strong>City:</strong> ${order.customer.city}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>Pincode:</strong> ${order.customer.pincode}</p>
            <p><strong>Note:</strong> ${order.customer.note || "No note"}</p>

            <h3>Order Items</h3>

            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="background:#fff3e8;">
                  <th style="padding:8px;text-align:left;">Product</th>
                  <th style="padding:8px;text-align:left;">Quantity</th>
                  <th style="padding:8px;text-align:left;">Price</th>
                </tr>
              </thead>

              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top:20px;">
              <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
              <p><strong>Delivery:</strong> ₹${order.deliveryCharge}</p>
              <h3>Total: ₹${order.totalAmount}</h3>
              <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            </div>
          </div>
        `,
      });

      console.log("Admin email sent successfully 📧");
    } catch (emailError) {
      console.error("Admin email failed:", emailError.message);
    }

    // -------------------------------------------------
    // CUSTOMER CONFIRMATION EMAIL
    // -------------------------------------------------
    try {
      const itemsHtml = order.items
        .map(
          (item) => `
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ${item.name}
              </td>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ${item.quantity} ${item.unit}
              </td>
              <td style="padding:8px;border-bottom:1px solid #eee;">
                ₹${item.price}
              </td>
            </tr>
          `
        )
        .join("");

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.customer.email,
        subject: `🍊 Your Happy Fruits Order is Confirmed - ${order._id}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">

            <h2 style="color:#ff7114;">
              🍊 Thank You for Ordering from Happy Fruits!
            </h2>

            <p>Hi ${order.customer.name},</p>

            <p>
              Your order has been successfully placed.
            </p>

            <div style="background:#fff7ef;padding:15px;border-radius:12px;">
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Total:</strong> ₹${order.totalAmount}</p>
              <p><strong>Payment:</strong> ${order.paymentMethod}</p>
              <p><strong>Status:</strong> ${order.status}</p>
            </div>

            <h3>Order Summary</h3>

            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="background:#fff3e8;">
                  <th style="padding:8px;text-align:left;">Product</th>
                  <th style="padding:8px;text-align:left;">Quantity</th>
                  <th style="padding:8px;text-align:left;">Price</th>
                </tr>
              </thead>

              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top:20px;">
              <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
              <p><strong>Delivery:</strong> ₹${order.deliveryCharge}</p>
              <h3>Total: ₹${order.totalAmount}</h3>
            </div>

            <h3>Delivery Address</h3>

            <p>
              ${order.customer.address}<br/>
              ${order.customer.city} - ${order.customer.pincode}
            </p>

            <p>
              You can track your order from the
              <strong>Track Order</strong> section on our website.
            </p>

            <p>
              Thank you for choosing Happy Fruits 🍊
            </p>

          </div>
        `,
      });

      console.log("Customer confirmation email sent successfully 📧");
    } catch (emailError) {
      console.error(
        "Customer confirmation email failed:",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully 🍊",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ORDERS - ADMIN
// =====================================================
const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ORDER - ADMIN ONLY
// =====================================================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// =====================================================
// PUBLIC TRACK ORDER
// ORDER ID + MOBILE REQUIRED
// =====================================================
const trackOrder = async (req, res) => {
  try {
    const { orderId, mobile } = req.body;

    if (!orderId || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Order ID and mobile number are required.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or mobile number does not match.",
      });
    }

    const storedMobile = String(order.customer.mobile).trim();
    const enteredMobile = String(mobile).trim();

    if (storedMobile !== enteredMobile) {
      return res.status(404).json({
        success: false,
        message: "Order not found or mobile number does not match.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Track Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to track order",
    });
  }
};

// =====================================================
// UPDATE ORDER STATUS - ADMIN
// =====================================================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Order Confirmed",
      "Order Accepted",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Don't send email if status hasn't changed
    if (order.status === status) {
      return res.status(200).json({
        success: true,
        message: "Order status is already set to this value.",
        order,
      });
    }

    const previousStatus = order.status;

    order.status = status;

    await order.save();

    // -------------------------------------------------
    // CUSTOMER STATUS EMAIL
    // -------------------------------------------------
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.customer.email,
        subject: `🍊 Happy Fruits Order Update - ${order._id}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;">

            <h2 style="color:#ff7114;">
              🍊 Your Happy Fruits Order Has Been Updated
            </h2>

            <p>Hi ${order.customer.name},</p>

            <p>
              There is an update regarding your order.
            </p>

            <div style="background:#fff7ef;padding:18px;border-radius:12px;">

              <p>
                <strong>Order ID:</strong>
                ${order._id}
              </p>

              <p>
                <strong>Previous Status:</strong>
                ${previousStatus}
              </p>

              <p>
                <strong>Current Status:</strong>
                ${status}
              </p>

              <p>
                <strong>Total Amount:</strong>
                ₹${order.totalAmount}
              </p>

            </div>

            ${
              status === "Delivered"
                ? `
                  <p>
                    🎉 Your order has been delivered successfully.
                    Thank you for shopping with Happy Fruits!
                  </p>
                `
                : status === "Cancelled"
                ? `
                  <p>
                    Your order has been cancelled.
                    If you have any questions, please contact Happy Fruits.
                  </p>
                `
                : `
                  <p>
                    We will keep you updated as your order progresses.
                  </p>
                `
            }

          </div>
        `,
      });

      console.log("Order status email sent successfully 📧");
    } catch (emailError) {
      console.error(
        "Order status email failed:",
        emailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  trackOrder,
  updateOrderStatus,
};