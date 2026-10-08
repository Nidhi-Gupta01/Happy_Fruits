import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e8dfcf] bg-[#fffaf0]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.svg.png"
            alt="Happy Fruits"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="font-medium text-[#164d58] transition hover:text-[#ff7114]"
          >
            Home
          </Link>

           
          <a
            href="/#fruits"
            className="font-medium text-[#164d58] transition hover:text-[#ff7114]"
          >
            Our Fruits
          </a>

          <a
            href="/#real-freshness"
            className="font-medium text-[#164d58] transition hover:text-[#ff7114]"
          >
            Real Freshness
          </a>

          
          <a
            href="/#about"
            className="font-medium text-[#164d58] transition hover:text-[#ff7114]"
          >
            About
          </a>


          <Link
            to="/track-order"
            className="transition hover:text-[#ff7114]"
          >
            Track Order
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="rounded-full bg-[#164d58] px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#ff7114]"
          >
            🛒 Cart ({cartCount})
          </Link>

          {/* Shop Now */}
          <Link
            to="/shop"
            className="rounded-full bg-[#298447] px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#216b38]"
          >
            Shop Now
          </Link>

        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Mobile Cart */}
          <Link
            to="/cart"
            className="rounded-full bg-[#164d58] px-4 py-2 text-sm font-bold text-white"
          >
            🛒 {cartCount}
          </Link>

          {/* Mobile Shop */}
          <Link
            to="/shop"
            className="rounded-full bg-[#298447] px-4 py-2 text-sm font-semibold text-white"
          >
            Shop
          </Link>

        </div>

      </nav>
    </header>
  );
}

export default Header;