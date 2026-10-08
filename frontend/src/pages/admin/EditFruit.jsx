import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
function EditFruit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    unit: "kg",
    category: "Popular",
    description: "",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchFruit();
  }, [id, navigate, token]);

  const fetchFruit = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/products/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load fruit.");
      }

      const fruit = data.product;

      if (!fruit) {
        throw new Error("Fruit not found.");
      }

      setFormData({
        name: fruit.name || "",
        image: fruit.image || "",
        price: fruit.price ?? "",
        unit: fruit.unit || "kg",
        category: fruit.category || "Popular",
        description: fruit.description || "",
        isAvailable: fruit.isAvailable ?? true,
      });
    } catch (err) {
      setError(err.message || "Unable to load fruit.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/admin/login");
      return;
    }

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Fruit name is required.");
      return;
    }

    if (!formData.image.trim()) {
      setError("Fruit image path is required.");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!formData.unit.trim()) {
      setError("Unit is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          image: formData.image.trim(),
          price: Number(formData.price),
          unit: formData.unit.trim(),
          category: formData.category.trim(),
          description: formData.description.trim(),
          isAvailable: formData.isAvailable,
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
        throw new Error(data.message || "Failed to update fruit.");
      }

      setSuccess("Fruit updated successfully! ✅");

      setTimeout(() => {
        navigate("/admin/manage-fruits");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f8f7] px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-6 h-8 w-56 rounded bg-gray-200" />

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="space-y-5">
              <div className="h-12 rounded-xl bg-gray-200" />
              <div className="h-12 rounded-xl bg-gray-200" />
              <div className="h-12 rounded-xl bg-gray-200" />
              <div className="h-32 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8f7] text-[#173f46]">

      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e78b3a]">
              Happy Fruits
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Edit Fruit
            </h1>
          </div>

          <Link
            to="/admin/manage-fruits"
            className="shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            ← Manage Fruits
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">
            Product Management
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            Edit {formData.name || "Fruit"} ✏️
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Update the fruit information below and save your changes.
          </p>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            ✓ {success}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >

          {/* BASIC INFORMATION */}
          <div className="border-b border-gray-100 p-5 sm:p-7">

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#164d58]">
                Basic Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update the basic details of your fruit.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Fruit Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Apple"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
                >
                  <option value="Popular">Popular</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Citrus">Citrus</option>
                  <option value="Berries">Berries</option>
                  <option value="Tropical">Tropical</option>
                  <option value="Exotic">Exotic</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

          </div>

          {/* PRICING */}
          <div className="border-b border-gray-100 p-5 sm:p-7">

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#164d58]">
                Pricing
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update the selling price and measurement unit.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* PRICE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="130"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
                  />
                </div>
              </div>

              {/* UNIT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Unit <span className="text-red-500">*</span>
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
                >
                  <option value="kg">kg</option>
                  <option value="500g">500g</option>
                  <option value="250g">250g</option>
                  <option value="piece">piece</option>
                  <option value="dozen">dozen</option>
                  <option value="box">box</option>
                  <option value="pack">pack</option>
                </select>
              </div>

            </div>

          </div>

          {/* IMAGE */}
          <div className="border-b border-gray-100 p-5 sm:p-7">

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#164d58]">
                Product Image
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Change the image path or image URL if required.
              </p>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image Path / URL <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/fruits/apple.png"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
            />

            {/* PREVIEW */}
            {formData.image.trim() && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-[#f5faf8]">

                <div className="flex min-h-52 items-center justify-center p-6">
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="max-h-48 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

              </div>
            )}

          </div>

          {/* DESCRIPTION */}
          <div className="border-b border-gray-100 p-5 sm:p-7">

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#164d58]">
                Description
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update the description shown to customers.
              </p>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              maxLength="500"
              placeholder="Fresh and juicy fruits..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#164d58] focus:bg-white focus:ring-2 focus:ring-[#164d58]/10"
            />

            <p className="mt-2 text-right text-xs text-gray-400">
              {formData.description.length}/500
            </p>

          </div>

          {/* AVAILABILITY */}
          <div className="p-5 sm:p-7">

            <div
              className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                formData.isAvailable
                  ? "border-green-100 bg-green-50"
                  : "border-red-100 bg-red-50"
              }`}
            >

              <div>
                <h3
                  className={`font-bold ${
                    formData.isAvailable
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  Product Availability
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    formData.isAvailable
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {formData.isAvailable
                    ? "Customers can currently purchase this fruit."
                    : "This fruit is currently hidden from purchase."}
                </p>
              </div>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="sr-only"
                />

                <span
                  className={`relative h-7 w-12 rounded-full transition ${
                    formData.isAvailable
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      formData.isAvailable
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </span>

                <span
                  className={`min-w-[90px] text-sm font-bold ${
                    formData.isAvailable
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {formData.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>

              </label>

            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                to="/admin/manage-fruits"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#164d58] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#103d46] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving Changes..." : "Save Changes ✓"}
              </button>

            </div>

          </div>

        </form>

      </main>
    </div>
  );
}

export default EditFruit;