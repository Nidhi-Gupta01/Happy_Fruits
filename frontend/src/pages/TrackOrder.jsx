import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const statuses = [
  "Order Confirmed",
  "Order Accepted",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function TrackOrder() {
  const [searchParams] = useSearchParams();

  const [orderId, setOrderId] = useState(
    searchParams.get("orderId") || ""
  );

  const [mobile, setMobile] = useState("");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= TRACK ORDER =================

  const fetchOrder = async (showLoader = true) => {
    if (!orderId.trim() || !mobile.trim()) {
      setError("Please enter Order ID and mobile number.");
      return;
    }

    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${API_URL}/orders/track`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId.trim(),
            mobile: mobile.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Order not found or mobile number does not match."
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Track Order Error:", error);

      if (showLoader) {
        setOrder(null);
      }

      setError(
        error.message ||
          "Unable to track your order."
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  // ================= AUTO POLLING =================

  useEffect(() => {
    if (!order || !mobile.trim()) return;

    if (
      order.status === "Delivered" ||
      order.status === "Cancelled"
    ) {
      return;
    }

    const interval = setInterval(() => {
      fetchOrder(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [order, mobile]);

  // ================= STATUS INDEX =================

  const currentStatusIndex = order
    ? statuses.indexOf(order.status)
    : -1;

  const isCancelled =
    order?.status === "Cancelled";

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // ================= FORM =================

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrder(true);
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-[#fffaf0]">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link to="/">
            <img
              src="/logo.svg.png"
              alt="Happy Fruits"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">

            <Link
              to="/shop"
              className="hidden font-semibold text-[#164d58] transition hover:text-[#ff7114] sm:block"
            >
              Shop Fruits
            </Link>

            <Link
              to="/cart"
              className="rounded-full bg-[#164d58] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7114]"
            >
              🛒 Cart
            </Link>

          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-4xl text-center">

          <span className="font-semibold tracking-[0.22em] text-[#ff7114]">
            HAPPY FRUITS
          </span>

          <h1 className="mt-3 text-4xl font-black text-[#164d58] sm:text-5xl">
            Track Your Order 📦
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Enter your Order ID and mobile number to
            check the latest status of your fresh fruit order.
          </p>

        </div>
      </section>

      {/* ================= SEARCH FORM ================= */}

      <main className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-4xl">

          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm sm:p-8"
          >

            <div className="grid gap-5 sm:grid-cols-[1fr_220px_auto] sm:items-end">

              {/* ORDER ID */}

              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  Order ID
                </label>

                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => {
                    setOrderId(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your Order ID"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 text-sm outline-none transition focus:border-[#ff7114]"
                />
              </div>

              {/* MOBILE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-[#164d58]">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setError("");
                  }}
                  placeholder="10-digit number"
                  maxLength="10"
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 text-sm outline-none transition focus:border-[#ff7114]"
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-[#ff7114] px-7 py-3.5 font-black text-white shadow-md transition hover:bg-[#e96109] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Tracking..."
                  : "Track Order"}
              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

          </form>

          {/* ================= ORDER RESULT ================= */}

          {order && (
            <div className="mt-8 space-y-6">

              {/* ORDER HEADER */}

              <div className="rounded-[30px] bg-[#164d58] p-6 text-white shadow-lg sm:p-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-white/70">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-lg font-black">
                      {order._id}
                    </p>
                  </div>

                  <div className="w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                    {order.status}
                  </div>

                </div>

                <div className="mt-5 text-sm text-white/70">
                  Ordered on {formatDate(order.createdAt)}
                </div>

              </div>

              {/* CANCELLED */}

              {isCancelled ? (
                <div className="rounded-[30px] border border-red-100 bg-white p-7 text-center shadow-sm">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
                    ✕
                  </div>

                  <h2 className="mt-5 text-2xl font-black text-red-600">
                    Order Cancelled
                  </h2>

                  <p className="mx-auto mt-2 max-w-lg text-gray-500">
                    Unfortunately, this order has been cancelled.
                    Please contact Happy Fruits if you need help.
                  </p>

                </div>
              ) : (
                <>
                  {/* ================= STATUS TIMELINE ================= */}

                  <div className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="text-2xl font-black text-[#164d58]">
                      Order Status
                    </h2>

                    <div className="mt-8 space-y-7">

                      {statuses.map((status, index) => {

                        const completed =
                          index <= currentStatusIndex;

                        const current =
                          index === currentStatusIndex;

                        return (
                          <div
                            key={status}
                            className="relative flex gap-4"
                          >

                            {/* LINE */}

                            {index < statuses.length - 1 && (
                              <div
                                className={`absolute left-[15px] top-8 h-[calc(100%+12px)] w-[2px] ${
                                  index < currentStatusIndex
                                    ? "bg-[#298447]"
                                    : "bg-gray-200"
                                }`}
                              />
                            )}

                            {/* DOT */}

                            <div
                              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                                completed
                                  ? "bg-[#298447] text-white"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {completed ? "✓" : index + 1}
                            </div>

                            {/* TEXT */}

                            <div className="pb-1">
                              <p
                                className={`font-bold ${
                                  completed
                                    ? "text-[#164d58]"
                                    : "text-gray-400"
                                }`}
                              >
                                {status}
                              </p>

                              {current && (
                                <p className="mt-1 text-sm text-[#298447]">
                                  Your order is currently here.
                                </p>
                              )}
                            </div>

                          </div>
                        );
                      })}

                    </div>

                    <div className="mt-7 rounded-2xl bg-[#fffaf0] p-4 text-center text-sm text-gray-500">
                      🔄 Order status automatically refreshes every
                      few seconds.
                    </div>

                  </div>

                  {/* ================= DELIVERY DETAILS ================= */}

                  <div className="grid gap-6 md:grid-cols-2">

                    <div className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm">

                      <h2 className="text-xl font-black text-[#164d58]">
                        Delivery Details
                      </h2>

                      <div className="mt-5 space-y-4 text-sm">

                        <div>
                          <p className="text-gray-400">
                            Customer
                          </p>

                          <p className="mt-1 font-bold text-[#164d58]">
                            {order.customer.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">
                            Mobile
                          </p>

                          <p className="mt-1 font-bold text-[#164d58]">
                            {order.customer.mobile}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">
                            Address
                          </p>

                          <p className="mt-1 leading-6 text-gray-600">
                            {order.customer.address},{" "}
                            {order.customer.city} -{" "}
                            {order.customer.pincode}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* ================= ORDER SUMMARY ================= */}

                    <div className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm">

                      <h2 className="text-xl font-black text-[#164d58]">
                        Order Summary
                      </h2>

                      <div className="mt-5 space-y-4">

                        {order.items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center justify-between gap-3"
                          >

                            <div className="flex min-w-0 items-center gap-3">

                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff8ec]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-9 w-9 object-contain"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-bold text-[#164d58]">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {item.quantity} × ₹{item.price}
                                </p>
                              </div>

                            </div>

                            <p className="shrink-0 font-bold text-[#ff7114]">
                              ₹{item.price * item.quantity}
                            </p>

                          </div>
                        ))}

                      </div>

                      <div className="mt-5 space-y-3 border-t border-dashed border-gray-200 pt-5">

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Subtotal</span>
                          <span>₹{order.subtotal}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Delivery</span>
                          <span>₹{order.deliveryCharge}</span>
                        </div>

                        <div className="flex justify-between border-t border-gray-100 pt-3">
                          <span className="font-bold text-[#164d58]">
                            Total
                          </span>

                          <span className="text-xl font-black text-[#ff7114]">
                            ₹{order.totalAmount}
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>
                </>
              )}

            </div>
          )}

          {/* ================= BOTTOM LINKS ================= */}

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">

            <Link
              to="/shop"
              className="text-[#164d58] hover:text-[#ff7114]"
            >
              🍊 Shop Fresh Fruits
            </Link>

            <span className="text-gray-300">|</span>

            <Link
              to="/"
              className="text-[#164d58] hover:text-[#ff7114]"
            >
              Home
            </Link>

          </div>

        </div>
      </main>
    </div>
  );
}

export default TrackOrder;