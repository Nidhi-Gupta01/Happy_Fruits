import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;
function Shop() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToCart,
    cart,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to fetch products"
          );
        }

        if (data.success) {
          // Only available products
          const availableProducts =
            data.products.filter(
              (product) => product.isAvailable
            );

          setProducts(availableProducts);
        }
      } catch (error) {
        console.error(
          "Shop Products Error:",
          error
        );

        setError(
          "Unable to load fruits. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // Search
    if (search.trim()) {
      const searchText =
        search.trim().toLowerCase();

      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchText)
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [products, category, search, sortBy]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sortBy !== "default";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
        <p className="text-xl font-semibold text-[#164d58]">
          Loading fresh fruits... 🍊
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-5">
        <div className="text-center">

          <p className="text-xl font-semibold text-red-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-4 rounded-full bg-[#164d58] px-6 py-3 font-bold text-white"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-50 border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">

        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="/logo.svg.png"
              alt="Happy Fruits"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">

            <Link
              to="/"
              className="hidden font-medium text-[#164d58] transition hover:text-[#ff7114] sm:block"
            >
              ← Back Home
            </Link>

            <Link
              to="/track-order"
              className="hidden font-medium text-[#164d58] transition hover:text-[#ff7114] md:block"
            >
              Track Order
            </Link>

            <Link
              to="/cart"
              className="rounded-full bg-[#164d58] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#ff7114] sm:px-5"
            >
              🛒 Cart ({cartCount})
            </Link>

          </div>

        </div>

      </header>

      {/* =================================================
          SHOP HERO
      ================================================= */}

      <section className="px-5 pb-10 pt-16 sm:px-8">

        <div className="mx-auto max-w-7xl text-center">

          <span className="font-semibold tracking-[0.25em] text-[#ff7114]">
            HAPPY FRUITS SHOP
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#164d58] sm:text-5xl">
            Fresh Fruits,

            <span className="block text-[#ff7114]">
              Just a Click Away 🍊
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Choose your favourite fruits, select
            the quantity you need and add them to
            your cart.
          </p>

        </div>

      </section>

      {/* =================================================
          SEARCH + SORT
      ================================================= */}

      <section className="px-5 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">

            <div className="grid gap-3 sm:gap-4 md:grid-cols-[1fr_220px]">
              {/* Search */}
              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search your favourite fruit..."
                  className="w-full rounded-2xl border border-gray-200 bg-[#fffaf0] py-3.5 pl-12 pr-4 outline-none transition focus:border-[#ff7114]"
                />

              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="rounded-2xl border border-gray-200 bg-[#fffaf0] px-4 py-3.5 font-semibold text-[#164d58] outline-none focus:border-[#ff7114]"
              >
                <option value="default">
                  Sort: Default
                </option>

                <option value="name-asc">
                  Name: A–Z
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

            </div>

            {/* Results + Clear */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-[#164d58]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "fruit"
                  : "fruits"}
              </p>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[#ff7114] transition hover:bg-orange-100"
                >
                  ✕ Clear Filters
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CATEGORY FILTER
      ================================================= */}

      <section className="px-5 pt-8 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
            {categories.map((item) => (

              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`shrink-0 rounded-full px-6 py-2.5 font-semibold transition ${category === item
                  ? "bg-[#ff7114] text-white shadow-md"
                  : "bg-white text-[#164d58] hover:bg-[#fff0dc]"
                  }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section className="px-5 py-14 sm:px-8">

        <div className="mx-auto max-w-7xl">

          {filteredProducts.length === 0 ? (

            /* Empty State */
            <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-6xl">
                🍊
              </div>

              <h2 className="mt-5 text-2xl font-black text-[#164d58]">
                No fruits found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                We couldn't find any fruit matching
                your search or selected filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-[#ff7114] px-6 py-3 font-bold text-white transition hover:bg-[#e96109]"
              >
                Show All Fruits
              </button>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product) => {
                const productId = product._id || product.id;

                const cartItem = cart.find(
                  (item) => item.id === productId
                );

                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div
                    key={productId}
                    className="group overflow-hidden rounded-[28px] border border-[#eee5d6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* ================= PRODUCT IMAGE ================= */}
                    <div className="relative m-3 flex h-60 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-[#fff8ec] to-[#fff1d8]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-48 object-contain transition duration-500 group-hover:scale-110"
                      />

                      {/* Category */}
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#164d58] shadow-sm">
                        {product.category}
                      </span>

                      {/* In Cart */}
                      {quantity > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-[#298447] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                          ✓ {quantity} in cart
                        </span>
                      )}
                    </div>

                    {/* ================= PRODUCT CONTENT ================= */}
                    <div className="px-5 pb-5 pt-2">

                      {/* Product Name */}
                      <h2 className="text-xl font-extrabold text-[#164d58]">
                        {product.name}
                      </h2>

                      {/* Description */}
                      {product.description && (
                        <p className="mt-2 min-h-[42px] line-clamp-2 text-sm leading-6 text-gray-500">
                          {product.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <span className="text-2xl font-black text-[#ff7114]">
                            ₹{product.price}
                          </span>

                          <span className="ml-1 text-sm text-gray-500">
                            / {product.unit}
                          </span>
                        </div>

                        {/* Fresh Badge */}
                        <span className="text-xs font-semibold text-[#298447]">
                          ● Fresh
                        </span>
                      </div>

                      {/* ================= CART ACTION ================= */}
                      <div className="mt-5">
                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(product)}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#164d58] px-5 py-3.5 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#ff7114] hover:shadow-lg"
                          >
                            <span className="text-lg">🛒</span>
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center justify-between rounded-2xl bg-[#fff4e5] p-2">

                            {/* Decrease */}
                            <button
                              onClick={() =>
                                decreaseQuantity(productId)
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#164d58] shadow-sm transition hover:bg-[#164d58] hover:text-white"
                            >
                              −
                            </button>

                            {/* Quantity */}
                            <div className="text-center">
                              <p className="text-xs font-semibold text-gray-500">
                                Quantity
                              </p>

                              <p className="text-lg font-black text-[#164d58]">
                                {quantity}
                              </p>
                            </div>

                            {/* Increase */}
                            <button
                              onClick={() =>
                                increaseQuantity(productId)
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#164d58] text-xl font-bold text-white shadow-sm transition hover:bg-[#ff7114]"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          )}

        </div>

      </section>

      {/* =================================================
          CART SUMMARY
      ================================================= */}

      {cartCount > 0 && (

        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2 rounded-2xl bg-[#164d58] p-3 text-white shadow-2xl sm:bottom-5 sm:p-4">
          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-sm text-white/70">
                Items in your cart
              </p>

              <p className="text-xl font-bold">
                {cartCount} item
                {cartCount > 1
                  ? "s"
                  : ""}
              </p>

            </div>

            <Link
              to="/cart"
              className="shrink-0 rounded-full bg-[#ff7114] px-6 py-3 font-bold transition hover:bg-[#e96109]"
            >
              View Cart →
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Shop;