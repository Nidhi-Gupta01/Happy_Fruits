import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
function ManageFruits() {
  const navigate = useNavigate();

  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchFruits();
  }, [navigate, token]);

  const fetchFruits = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch fruits");
      }

      setFruits(data.products || []);
    } catch (err) {
      setError(err.message || "Unable to load fruits");
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        fruits
          .map((fruit) => fruit.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [fruits]);

  const filteredFruits = useMemo(() => {
    return fruits.filter((fruit) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        fruit.name?.toLowerCase().includes(searchText) ||
        fruit.category?.toLowerCase().includes(searchText) ||
        fruit.unit?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || fruit.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [fruits, search, category]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const handleToggleAvailability = async (fruit) => {
    const id = fruit._id;

    try {
      setActionLoading(`toggle-${id}`);
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAvailable: !fruit.isAvailable,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");
        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update availability");
      }

      setFruits((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                isAvailable: !fruit.isAvailable,
              }
            : item
        )
      );

      setMessage(
        `${fruit.name} is now ${
          !fruit.isAvailable ? "Available" : "Unavailable"
        }.`
      );
    } catch (err) {
      setError(err.message || "Failed to update fruit");
    } finally {
      setActionLoading("");
    }
  };

  const handleDelete = async (fruit) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${fruit.name}"?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(`delete-${fruit._id}`);
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/products/${fruit._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminInfo");
        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete fruit");
      }

      setFruits((current) =>
        current.filter((item) => item._id !== fruit._id)
      );

      setMessage(`${fruit.name} deleted successfully.`);
    } catch (err) {
      setError(err.message || "Failed to delete fruit");
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8f7] text-[#173f46]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e78b3a]">
              Happy Fruits
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Manage Fruits
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-[#164d58] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#103d46]"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* TOP SECTION */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">
              Product Management
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Your Fruits 🍎
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add, edit, manage availability and remove fruits from your shop.
            </p>
          </div>

          <Link
            to="/admin/add-fruit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#164d58] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#103d46]"
          >
            <span className="text-lg">+</span>
            Add New Fruit
          </Link>

        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* FILTER BOX */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="grid gap-3 md:grid-cols-[1fr_220px]">

            {/* SEARCH */}
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search fruit by name, category or unit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#164d58] focus:bg-white"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">

            <span>
              Showing{" "}
              <strong className="text-[#164d58]">
                {filteredFruits.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[#164d58]">
                {fruits.length}
              </strong>{" "}
              fruits
            </span>

            {(search || category !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="font-semibold text-[#e78b3a] hover:underline"
              >
                Clear Filters
              </button>
            )}

          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-48 bg-gray-200" />

                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                  <div className="h-10 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredFruits.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">

            <div className="mb-4 text-5xl">🍊</div>

            <h3 className="text-xl font-bold text-[#164d58]">
              No fruits found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {fruits.length === 0
                ? "You haven't added any fruits yet."
                : "Try changing your search or category filter."}
            </p>

            {fruits.length === 0 && (
              <Link
                to="/admin/add-fruit"
                className="mt-5 inline-flex rounded-xl bg-[#164d58] px-5 py-3 text-sm font-bold text-white"
              >
                + Add Your First Fruit
              </Link>
            )}

          </div>
        )}

        {/* FRUIT GRID */}
        {!loading && filteredFruits.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredFruits.map((fruit) => (
              <article
                key={fruit._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden bg-[#f5faf8]">

                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Fruit";
                    }}
                  />

                  {/* AVAILABILITY */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        fruit.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {fruit.isAvailable
                        ? "● Available"
                        : "● Unavailable"}
                    </span>
                  </div>

                  {/* CATEGORY */}
                  {fruit.category && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                      {fruit.category}
                    </span>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <h3 className="truncate text-lg font-bold text-[#164d58]">
                    {fruit.name}
                  </h3>

                  {fruit.description && (
                    <p className="mt-1 line-clamp-2 min-h-[40px] text-sm text-gray-500">
                      {fruit.description}
                    </p>
                  )}

                  {!fruit.description && (
                    <div className="min-h-[40px]" />
                  )}

                  {/* PRICE */}
                  <div className="mt-3 flex items-end justify-between">

                    <div>
                      <p className="text-xl font-extrabold text-[#e78b3a]">
                        ₹{fruit.price}
                      </p>

                      <p className="text-xs font-medium text-gray-500">
                        per {fruit.unit}
                      </p>
                    </div>

                    <span className="rounded-lg bg-[#f3f7f5] px-2.5 py-1 text-xs font-semibold text-[#164d58]">
                      {fruit.unit}
                    </span>

                  </div>

                  {/* AVAILABILITY TOGGLE */}
                  <button
                    onClick={() => handleToggleAvailability(fruit)}
                    disabled={actionLoading === `toggle-${fruit._id}`}
                    className={`mt-4 flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                      fruit.isAvailable
                        ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    } ${
                      actionLoading === `toggle-${fruit._id}`
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    <span>
                      {actionLoading === `toggle-${fruit._id}`
                        ? "Updating..."
                        : fruit.isAvailable
                        ? "Available for Sale"
                        : "Currently Unavailable"}
                    </span>

                    <span
                      className={`relative h-6 w-11 rounded-full transition ${
                        fruit.isAvailable
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                          fruit.isAvailable
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </span>
                  </button>

                  {/* ACTIONS */}
                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <Link
                      to={`/admin/edit-fruit/${fruit._id}`}
                      className="rounded-xl border border-[#164d58]/20 bg-[#164d58]/5 px-3 py-2.5 text-center text-sm font-bold text-[#164d58] transition hover:bg-[#164d58] hover:text-white"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(fruit)}
                      disabled={actionLoading === `delete-${fruit._id}`}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionLoading === `delete-${fruit._id}`
                        ? "Deleting..."
                        : "🗑️ Delete"}
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default ManageFruits;