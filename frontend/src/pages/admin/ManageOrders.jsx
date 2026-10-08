import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
const STATUSES = [
  "Order Confirmed",
  "Order Accepted",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Manage Orders Error:", error);
      setError(
        error.message || "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= FILTER =================

  const filteredOrders = useMemo(() => {
    const text = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      if (!text) {
        return matchesStatus;
      }

      const matchesSearch =
        order._id?.toLowerCase().includes(text) ||
        order.customer?.name
          ?.toLowerCase()
          .includes(text) ||
        order.customer?.mobile
          ?.toLowerCase()
          .includes(text) ||
        order.customer?.email
          ?.toLowerCase()
          .includes(text);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  // ================= STATUS UPDATE =================

  const updateStatus = async (orderId, newStatus) => {
    const currentOrder = orders.find(
      (order) => order._id === orderId
    );

    if (!currentOrder) return;

    if (currentOrder.status === newStatus) {
      return;
    }

    try {
      setUpdatingId(orderId);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status"
        );
      }

      const updatedOrder =
        data.order || data.updatedOrder;

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? updatedOrder || {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      setSelectedOrder((current) => {
        if (!current || current._id !== orderId) {
          return current;
        }

        return updatedOrder || {
          ...current,
          status: newStatus,
        };
      });
    } catch (error) {
      console.error("Update Status Error:", error);

      setError(
        error.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= HELPERS =================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700";

      case "Cancelled":
        return "bg-red-50 text-red-600";

      case "Out for Delivery":
        return "bg-blue-50 text-blue-700";

      case "Preparing":
        return "bg-yellow-50 text-yellow-700";

      case "Order Accepted":
        return "bg-purple-50 text-purple-700";

      default:
        return "bg-orange-50 text-[#ff7114]";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
        <p className="text-lg font-bold text-[#164d58]">
          Loading orders... 📦
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0]">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#ff7114]">
              HAPPY FRUITS
            </p>

            <h1 className="text-xl font-black text-[#164d58]">
              Manage Orders
            </h1>
          </div>

          <Link
            to="/admin/dashboard"
            className="rounded-full bg-[#164d58] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7114]"
          >
            ← Dashboard
          </Link>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* TITLE */}

        <div>
          <h2 className="text-3xl font-black text-[#164d58]">
            Orders
          </h2>

          <p className="mt-1 text-gray-500">
            View and manage customer orders.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* ================= FILTER BAR ================= */}

        <div className="mt-7 rounded-3xl bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-[1fr_230px]">

            {/* SEARCH */}

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                🔎
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search Order ID, customer, mobile..."
                className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] py-3.5 pl-11 pr-4 outline-none focus:border-[#ff7114]"
              />
            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 font-semibold text-[#164d58] outline-none focus:border-[#ff7114]"
            >
              <option value="All">
                All Statuses
              </option>

              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-[#164d58]">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#164d58]">
              {orders.length}
            </span>{" "}
            orders
          </div>

        </div>

        {/* ================= ORDERS ================= */}

        <div className="mt-7 space-y-4">

          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-5xl">
                📦
              </div>

              <h3 className="mt-4 text-xl font-black text-[#164d58]">
                No orders found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or status filter.
              </p>

            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl border border-[#eee5d6] bg-white p-5 shadow-sm transition hover:shadow-md"
              >

                {/* TOP */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-black text-[#164d58]">
                      {order._id}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">

                    {/* STATUS */}

                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className={`rounded-full border-0 px-4 py-2 text-sm font-bold outline-none ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {STATUSES.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      className="rounded-full bg-[#164d58] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7114]"
                    >
                      View Details
                    </button>

                  </div>

                </div>

                {/* INFO */}

                <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div>
                    <p className="text-xs text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-bold text-[#164d58]">
                      {order.customer?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Mobile
                    </p>

                    <p className="mt-1 font-bold text-[#164d58]">
                      {order.customer?.mobile}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Items
                    </p>

                    <p className="mt-1 font-bold text-[#164d58]">
                      {order.items?.reduce(
                        (total, item) =>
                          total + item.quantity,
                        0
                      ) || 0}{" "}
                      items
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-black text-[#ff7114]">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </main>

      {/* ================= DETAILS MODAL ================= */}

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-[#fffaf0] shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#e8dfcf] bg-[#fffaf0] p-6">

              <div>
                <p className="text-xs font-bold tracking-wider text-[#ff7114]">
                  ORDER DETAILS
                </p>

                <h2 className="mt-1 break-all text-xl font-black text-[#164d58]">
                  {selectedOrder._id}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-500 shadow-sm hover:text-red-500"
              >
                ×
              </button>

            </div>

            <div className="space-y-5 p-6">

              {/* CUSTOMER */}

              <section className="rounded-2xl bg-white p-5">

                <h3 className="font-black text-[#164d58]">
                  Customer Details
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-gray-400">
                      Name
                    </p>
                    <p className="mt-1 font-semibold">
                      {selectedOrder.customer?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Mobile
                    </p>
                    <p className="mt-1 font-semibold">
                      {selectedOrder.customer?.mobile}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>
                    <p className="mt-1 break-all font-semibold">
                      {selectedOrder.customer?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      City
                    </p>
                    <p className="mt-1 font-semibold">
                      {selectedOrder.customer?.city}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400">
                      Address
                    </p>
                    <p className="mt-1 leading-6">
                      {selectedOrder.customer?.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Pincode
                    </p>
                    <p className="mt-1 font-semibold">
                      {selectedOrder.customer?.pincode}
                    </p>
                  </div>

                  {selectedOrder.customer?.note && (
                    <div>
                      <p className="text-xs text-gray-400">
                        Delivery Note
                      </p>
                      <p className="mt-1 font-semibold">
                        {selectedOrder.customer.note}
                      </p>
                    </div>
                  )}

                </div>

              </section>

              {/* ITEMS */}

              <section className="rounded-2xl bg-white p-5">

                <h3 className="font-black text-[#164d58]">
                  Ordered Items
                </h3>

                <div className="mt-4 space-y-3">

                  {selectedOrder.items?.map(
                    (item, index) => (
                      <div
                        key={`${item.productId}-${index}`}
                        className="flex items-center gap-4 rounded-2xl bg-[#fffaf0] p-3"
                      >

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-[#164d58]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.quantity} × ₹{item.price} /{" "}
                            {item.unit}
                          </p>
                        </div>

                        <p className="font-black text-[#ff7114]">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>

              {/* PAYMENT */}

              <section className="rounded-2xl bg-white p-5">

                <h3 className="font-black text-[#164d58]">
                  Payment & Total
                </h3>

                <div className="mt-4 space-y-3">

                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span>
                      ₹{selectedOrder.deliveryCharge}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-dashed border-gray-200 pt-4">
                    <span className="font-black text-[#164d58]">
                      Total
                    </span>

                    <span className="text-2xl font-black text-[#ff7114]">
                      ₹{selectedOrder.totalAmount}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                      {selectedOrder.paymentMethod ||
                        "Cash on Delivery"}
                    </span>
                  </div>

                </div>

              </section>

              {/* STATUS */}

              <section className="rounded-2xl bg-white p-5">

                <h3 className="font-black text-[#164d58]">
                  Update Status
                </h3>

                <select
                  value={selectedOrder.status}
                  disabled={
                    updatingId === selectedOrder._id
                  }
                  onChange={(e) =>
                    updateStatus(
                      selectedOrder._id,
                      e.target.value
                    )
                  }
                  className={`mt-4 w-full rounded-2xl border-0 px-4 py-3.5 font-bold outline-none ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <p className="mt-3 text-xs text-gray-400">
                  Changing the order status will trigger the
                  customer status notification from the backend.
                </p>

              </section>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default ManageOrders;