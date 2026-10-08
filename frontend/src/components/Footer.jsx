import ScrollReveal from "./common/ScrollReveal";


function Footer() {
  return (
    <footer className="bg-[#0d3b43] px-5 py-12 text-center text-white">

      <img
        src="/logo.svg.png"
        alt="Happy Fruit"
        className="mx-auto h-16 w-auto object-contain"
      />

      <p className="mt-4 text-sm text-white/60">
        Fresh • Vibrant • Delivered
      </p>

      <div className="mt-6 text-xs text-white/40">
        © 2026 Happy Fruit. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;