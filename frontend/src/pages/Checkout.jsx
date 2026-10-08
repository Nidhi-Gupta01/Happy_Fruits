import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart();

  const deliveryCharge = cart.length > 0 ? 30 : 0;
  const grandTotal = cartTotal + deliveryCharge;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryNote: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // ================= EMPTY CART =================

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-[#fffaf0]">
        <header className="border-b border-[#e8dfcf] bg-[#fffaf0]">
          <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link to="/">
              <img
                src="/logo.svg.png"
                alt="Happy Fruits"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <Link
              to="/shop"
              className="rounded-full bg-[#164d58] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#ff7114]"
            >
              ← Shop Fruits
            </Link>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-78px)] items-center justify-center px-5">
          <div className="max-w-md rounded-[30px] bg-white p-10 text-center shadow-sm">
            <div className="text-6xl">🛒</div>

            <h1 className="mt-5 text-3xl font-black text-[#164d58]">
              Your Cart is Empty
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              Add some fresh fruits before proceeding to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-[#ff7114] px-7 py-3 font-bold text-white"
            >
              Browse Fruits →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  // ================= PLACE ORDER =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setError("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const orderData = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.phone.trim(),
          city: formData.city.trim(),
          address: formData.address.trim(),
          pincode: formData.pincode.trim(),
          note: formData.deliveryNote.trim(),
        },

        items: cart.map((item) => ({
          productId: item.productId || item.id,
          name: item.name,
          image: item.image || "",
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
        })),

        subtotal: cartTotal,
        deliveryCharge,
        totalAmount: grandTotal,
        paymentMethod: "Cash on Delivery",
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to place your order."
        );
      }

      setOrderSuccess(data.order);

      clearCart();
    } catch (error) {
      console.error("Place Order Error:", error);

      setError(
        error.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= SUCCESS =================

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#fffaf0]">
        <header className="border-b border-[#e8dfcf] bg-[#fffaf0]">
          <div className="mx-auto flex h-[78px] max-w-7xl items-center px-5 sm:px-8">
            <Link to="/">
              <img
                src="/logo.svg.png"
                alt="Happy Fruits"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-78px)] items-center justify-center px-5 py-12">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-7 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl">
              ✓
            </div>

            <p className="mt-6 font-semibold tracking-[0.2em] text-[#298447]">
              ORDER CONFIRMED
            </p>

            <h1 className="mt-3 text-3xl font-black text-[#164d58] sm:text-4xl">
              Thank You for Your Order! 🍊
            </h1>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-500">
              Your order has been successfully placed.
              We will prepare your fresh fruits with care.
            </p>

            <div className="mt-8 rounded-2xl bg-[#fffaf0] p-5 text-left">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Order ID
                </span>

                <span className="break-all text-right text-sm font-bold text-[#164d58]">
                  {orderSuccess._id}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Total
                </span>

                <span className="text-xl font-black text-[#ff7114]">
                  ₹{orderSuccess.totalAmount}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Payment
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-[#298447]">
                  Cash on Delivery
                </span>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Link
                to="/shop"
                className="rounded-2xl bg-[#164d58] px-5 py-3 font-bold text-white transition hover:bg-[#ff7114]"
              >
                Shop More
              </Link>

              <Link
                to="/"
                className="rounded-2xl border border-[#164d58] px-5 py-3 font-bold text-[#164d58] transition hover:bg-[#164d58] hover:text-white"
              >
                Home
              </Link>

              <Link
                to={`/track-order?orderId=${orderSuccess._id}`}
                className="rounded-2xl bg-[#ff7114] px-5 py-3 font-bold text-white transition hover:bg-[#e96109]"
              >
                Track Order
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ================= CHECKOUT =================

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/">
            <img
              src="/logo.svg.png"
              alt="Happy Fruits"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <Link
            to="/cart"
            className="rounded-full bg-[#164d58] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7114]"
          >
            ← Back to Cart
          </Link>
        </div>
      </header>

      {/* PAGE TITLE */}

      <section className="px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <span className="font-semibold tracking-[0.22em] text-[#ff7114]">
            HAPPY FRUITS
          </span>

          <h1 className="mt-3 text-4xl font-black text-[#164d58] sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your delivery details and place your order.
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <main className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-black text-[#164d58]">
              Delivery Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fields marked with * are required.
            </p>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* NAME */}

            <div className="mt-7">
              <label className="mb-2 block text-sm font-bold text-[#164d58]">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
              />
            </div>

            {/* EMAIL + PHONE */}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
                />
              </div>
            </div>

            {/* ADDRESS */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-[#164d58]">
                Complete Address *
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                placeholder="House no., street, landmark..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
              />
            </div>

            {/* CITY + PINCODE */}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  Pincode *
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
                />
              </div>
            </div>

            {/* NOTE */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-[#164d58]">
                Delivery Note
                <span className="ml-2 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <textarea
                name="deliveryNote"
                value={formData.deliveryNote}
                onChange={handleChange}
                rows="3"
                placeholder="Any special delivery instruction?"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 outline-none transition focus:border-[#ff7114]"
              />
            </div>

            {/* PAYMENT */}

            <div className="mt-7 rounded-2xl border border-[#eee5d6] bg-[#fffaf0] p-5">
              <p className="text-sm font-bold text-[#164d58]">
                Payment Method
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#ff7114] bg-white" />

                <div>
                  <p className="font-bold text-[#164d58]">
                    Cash on Delivery
                  </p>

                  <p className="text-xs text-gray-500">
                    Pay when your order is delivered.
                  </p>
                </div>
              </div>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#ff7114] px-6 py-4 font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e96109] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Placing Order..."
                : `Place Order • ₹${grandTotal}`}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              🔒 Your order details are securely submitted to Happy Fruits.
            </p>
          </form>

          {/* ORDER SUMMARY */}

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black text-[#164d58]">
                Order Summary
              </h2>

              {/* ITEMS */}

              <div className="mt-6 max-h-[360px] space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#fff8ec]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-[#164d58]">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>

                    <p className="font-bold text-[#ff7114]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 border-t border-dashed border-gray-200 pt-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ₹{cartTotal}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-gray-800">
                    ₹{deliveryCharge}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold text-[#164d58]">
                    Total
                  </span>

                  <span className="text-2xl font-black text-[#ff7114]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#fffaf0] p-4">
                <p className="text-sm font-bold text-[#164d58]">
                  🍊 Freshness Promise
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your fruits are selected and packed with care.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Checkout;