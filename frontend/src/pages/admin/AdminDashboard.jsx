 import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchDashboard();
  }, [navigate, token]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");
        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load dashboard.");
      }

      setStats(data.stats || data.dashboard || data);
    } catch (err) {
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const adminInfo = JSON.parse(
    localStorage.getItem("adminInfo") || "{}"
  );

  const getStat = (...keys) => {
    if (!stats) return 0;

    for (const key of keys) {
      if (stats[key] !== undefined && stats[key] !== null) {
        return stats[key];
      }
    }

    return 0;
  };

  const totalOrders = getStat("totalOrders", "orders");
  const totalProducts = getStat(
    "totalProducts",
    "products",
    "totalFruits"
  );
  const confirmedOrders = getStat(
    "confirmedOrders",
    "orderConfirmed"
  );
  const acceptedOrders = getStat(
    "acceptedOrders",
    "orderAccepted"
  );
  const preparingOrders = getStat(
    "preparingOrders",
    "preparing"
  );
  const outForDelivery = getStat(
    "outForDelivery",
    "outForDeliveryOrders"
  );
  const deliveredOrders = getStat(
    "deliveredOrders",
    "delivered"
  );
  const cancelledOrders = getStat(
    "cancelledOrders",
    "cancelled"
  );

  const statCards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "📦",
      description: "All orders received",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Total Fruits",
      value: totalProducts,
      icon: "🍎",
      description: "Products in catalogue",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      title: "Confirmed",
      value: confirmedOrders,
      icon: "✅",
      description: "Orders confirmed",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Out for Delivery",
      value: outForDelivery,
      icon: "🚚",
      description: "Currently on the way",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      text: "text-purple-700",
    },
  ];

  const orderStatus = [
    {
      name: "Order Confirmed",
      value: confirmedOrders,
      icon: "✅",
      color: "bg-blue-500",
    },
    {
      name: "Order Accepted",
      value: acceptedOrders,
      icon: "👍",
      color: "bg-indigo-500",
    },
    {
      name: "Preparing",
      value: preparingOrders,
      icon: "🥭",
      color: "bg-yellow-500",
    },
    {
      name: "Out for Delivery",
      value: outForDelivery,
      icon: "🚚",
      color: "bg-purple-500",
    },
    {
      name: "Delivered",
      value: deliveredOrders,
      icon: "🎉",
      color: "bg-green-500",
    },
    {
      name: "Cancelled",
      value: cancelledOrders,
      icon: "❌",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8f7] text-[#173f46]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e78b3a]">
              Happy Fruits
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-500">
                Welcome back
              </p>

              <p className="text-sm font-bold text-[#164d58]">
                {adminInfo?.name || "Admin"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-[#164d58] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#103d46]"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* WELCOME */}
        <section className="mb-7 overflow-hidden rounded-3xl bg-[#164d58] p-6 text-white shadow-lg sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-white/70">
                Happy Fruits Admin Panel 🍊
              </p>

              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Manage your fruit business
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                Manage products, check incoming orders and keep your
                Happy Fruits shop up to date.
              </p>
            </div>

            <div className="text-6xl sm:text-7xl">
              🍎
            </div>

          </div>

        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm font-semibold">
              ⚠️ {error}
            </p>

            <button
              onClick={fetchDashboard}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white"
            >
              Try Again
            </button>

          </div>
        )}

        {/* STAT CARDS */}
        <section className="mb-7">

          <div className="mb-4 flex items-end justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Overview
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#164d58]">
                Business Snapshot
              </h2>
            </div>

            <button
              onClick={fetchDashboard}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
            >
              ↻ Refresh
            </button>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {statCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border border-gray-100 ${card.bg} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${card.iconBg}`}
                  >
                    {card.icon}
                  </div>

                  <span className={`text-3xl font-extrabold ${card.text}`}>
                    {loading ? "—" : card.value}
                  </span>

                </div>

                <h3 className="mt-5 font-bold text-gray-800">
                  {card.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {card.description}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="mb-7">

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#164d58]">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Link
              to="/admin/add-fruit"
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#164d58]/20 hover:shadow-md"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                  🍊
                </div>

                <div>
                  <h3 className="font-bold text-[#164d58]">
                    Add New Fruit
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Add a product to your catalogue
                  </p>
                </div>

              </div>

              <p className="mt-4 text-right text-sm font-bold text-[#e78b3a] group-hover:translate-x-1 transition">
                Add Fruit →
              </p>
            </Link>

            <Link
              to="/admin/manage-fruits"
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#164d58]/20 hover:shadow-md"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                  🍎
                </div>

                <div>
                  <h3 className="font-bold text-[#164d58]">
                    Manage Fruits
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Edit prices, availability and products
                  </p>
                </div>

              </div>

              <p className="mt-4 text-right text-sm font-bold text-[#e78b3a] group-hover:translate-x-1 transition">
                Manage →
              </p>
            </Link>

            <Link
              to="/admin/manage-orders"
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#164d58]/20 hover:shadow-md"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  📦
                </div>

                <div>
                  <h3 className="font-bold text-[#164d58]">
                    Manage Orders
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    View and update customer orders
                  </p>
                </div>

              </div>

              <p className="mt-4 text-right text-sm font-bold text-[#e78b3a] group-hover:translate-x-1 transition">
                View Orders →
              </p>
            </Link>

          </div>

        </section>

        {/* ORDER STATUS */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">

          {/* STATUS BREAKDOWN */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Orders
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#164d58]">
                Order Status
              </h2>
            </div>

            <div className="space-y-4">

              {orderStatus.map((item) => {

                const percentage =
                  totalOrders > 0
                    ? Math.min(
                        100,
                        Math.round((item.value / totalOrders) * 100)
                      )
                    : 0;

                return (
                  <div key={item.name}>

                    <div className="mb-2 flex items-center justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-2">
                        <span>{item.icon}</span>

                        <span className="truncate text-sm font-semibold text-gray-700">
                          {item.name}
                        </span>
                      </div>

                      <span className="shrink-0 text-sm font-bold text-[#164d58]">
                        {loading ? "—" : item.value}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{
                          width: `${loading ? 0 : percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* SUMMARY */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Summary
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#164d58]">
                Today's Focus
              </h2>
            </div>

            <div className="space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-[#f5f8f7] p-4">
                <span className="text-sm font-medium text-gray-600">
                  🥭 Preparing
                </span>

                <span className="font-extrabold text-[#164d58]">
                  {loading ? "—" : preparingOrders}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#f5f8f7] p-4">
                <span className="text-sm font-medium text-gray-600">
                  🚚 On the way
                </span>

                <span className="font-extrabold text-[#164d58]">
                  {loading ? "—" : outForDelivery}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#f5f8f7] p-4">
                <span className="text-sm font-medium text-gray-600">
                  🎉 Delivered
                </span>

                <span className="font-extrabold text-green-600">
                  {loading ? "—" : deliveredOrders}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
                <span className="text-sm font-medium text-red-600">
                  ❌ Cancelled
                </span>

                <span className="font-extrabold text-red-600">
                  {loading ? "—" : cancelledOrders}
                </span>
              </div>

            </div>

            <Link
              to="/admin/manage-orders"
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#164d58] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#103d46]"
            >
              Open Order Management →
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;