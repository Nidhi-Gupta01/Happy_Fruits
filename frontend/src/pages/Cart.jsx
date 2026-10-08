import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const deliveryCharge = cart.length > 0 ? 30 : 0;
  const grandTotal = cartTotal + deliveryCharge;

  // ================= EMPTY CART =================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffaf0]">
        {/* Header */}
        <header className="border-b border-[#e8dfcf] bg-[#fffaf0]/95">
          <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg.png"
                alt="Happy Fruits"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <Link
              to="/shop"
              className="rounded-full bg-[#164d58] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff7114]"
            >
              ← Continue Shopping
            </Link>
          </div>
        </header>

        {/* Empty Cart */}
        <main className="flex min-h-[calc(100vh-78px)] items-center justify-center px-5">
          <div className="w-full max-w-lg rounded-[32px] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#fff4e5] text-5xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-black text-[#164d58]">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Looks like you haven't added any fresh fruits yet.
              Let's fill your cart with something delicious! 🍊
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-full bg-[#ff7114] px-7 py-3.5 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e96109]"
            >
              Explore Fresh Fruits →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ================= CART =================
  return (
    <div className="min-h-screen bg-[#fffaf0]">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center">
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
              ← Continue Shopping
            </Link>

            <Link
              to="/track-order"
              className="hidden rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#164d58] shadow-sm transition hover:text-[#ff7114] md:block"
            >
              Track Order
            </Link>

            <div className="rounded-full bg-[#164d58] px-4 py-2.5 text-sm font-bold text-white">
              🛒 {cartCount}
            </div>
          </div>
        </div>
      </header>

      {/* ================= PAGE HEADER ================= */}
      <section className="px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <span className="font-semibold tracking-[0.22em] text-[#ff7114]">
            HAPPY FRUITS
          </span>

          <h1 className="mt-3 text-4xl font-black text-[#164d58] sm:text-5xl">
            Your Shopping Cart 🛒
          </h1>

          <p className="mt-3 text-gray-500">
            {cartCount} {cartCount === 1 ? "item" : "items"} ready for checkout.
          </p>
        </div>
      </section>

      {/* ================= CART CONTENT ================= */}
      <main className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
          
          {/* ================= CART ITEMS ================= */}
          <section className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-[#eee5d6] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex gap-4 sm:gap-5">
                  
                  {/* Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#fff8ec] sm:h-32 sm:w-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 object-contain transition duration-300 hover:scale-105 sm:h-28 sm:w-28"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-[#ff7114]">
                          {item.category || "Fresh Fruits"}
                        </span>

                        <h2 className="mt-1 text-lg font-extrabold text-[#164d58] sm:text-xl">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          ₹{item.price} / {item.unit}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      
                      {/* Quantity */}
                      <div className="flex w-fit items-center gap-3 rounded-full bg-[#fff4e5] p-1.5">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-[#164d58] shadow-sm transition hover:bg-[#164d58] hover:text-white"
                        >
                          −
                        </button>

                        <span className="min-w-[28px] text-center font-black text-[#164d58]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#164d58] text-lg font-bold text-white shadow-sm transition hover:bg-[#ff7114]"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="text-lg font-black text-[#ff7114]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* ================= ORDER SUMMARY ================= */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[30px] border border-[#eee5d6] bg-white p-6 shadow-sm sm:p-7">
              
              <h2 className="text-2xl font-black text-[#164d58]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartCount})</span>
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

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="mt-1 text-3xl font-black text-[#164d58]">
                        ₹{grandTotal}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-[#298447]">
                      COD Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <Link
                to="/checkout"
                className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#ff7114] px-6 py-4 font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e96109] hover:shadow-lg"
              >
                Proceed to Checkout →
              </Link>

              {/* Continue */}
              <Link
                to="/shop"
                className="mt-3 flex w-full items-center justify-center rounded-2xl border border-[#164d58] px-6 py-3.5 font-bold text-[#164d58] transition hover:bg-[#164d58] hover:text-white"
              >
                Continue Shopping
              </Link>

              {/* Trust */}
              <div className="mt-6 rounded-2xl bg-[#fffaf0] p-4">
                <div className="flex gap-3">
                  <span className="text-xl">🍊</span>

                  <div>
                    <p className="text-sm font-bold text-[#164d58]">
                      Freshness Promise
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Fresh fruits selected and packed with care for your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Cart;