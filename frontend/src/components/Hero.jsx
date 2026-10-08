import ScrollReveal from "./common/ScrollReveal";
function Hero() {
  return (
        <ScrollReveal>

    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-[78px]"
    >

      {/* Background */}
      <div className="absolute inset-0 bg-[#fffaf0]" />

      {/* LEFT FRUIT */}
      <img
        src="/hero-left.png"
        alt=""
        className="
          pointer-events-none
          absolute
          left-[-100px]
          top-[160px]
          z-0
          hidden
          w-[700px]
          opacity-90
          lg:block
        "
      />

      {/* RIGHT FRUIT */}
      <img
        src="/hero-right.png"
        alt=""
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[160px]
          z-0
          hidden
          w-[700px]
          opacity-90
          lg:block
        "
      />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 text-center sm:px-8">

        {/* LOGO */}
        <div
          className="
            flex
            h-60
            w-60
            items-center
            justify-center
            rounded-full
            bg-white
            p-2
            shadow-[0_18px_55px_rgba(0,0,0,0.18)]
            ring-4
            ring-white
            sm:h-72
            sm:w-72
          "
        >
          <img
            src="/hero-logo.png"
            alt="Happy Fruit Logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* HEADING */}
        <h1
          className="
            mt-10
            max-w-4xl
            text-4xl
            font-extrabold
            leading-tight
            tracking-tight
            text-[#164d58]
            sm:text-5xl
            md:text-6xl
          "
        >
          Freshness Delivered

          <span className="block text-[#ff7114]">
            to Your Doorstep
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-5
            max-w-2xl
            text-base
            leading-7
            text-gray-600
            sm:text-lg
          "
        >
          Enjoy nature's best with our curated fruit boxes.
          Simple, delicious, and healthy.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">

          <a
            href="#fruits"
            className="
              rounded-full
              bg-[#ff7114]
              px-8
              py-4
              font-bold
              text-white
              shadow-lg
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-[#e96109]
            "
          >
            Browse Our Boxes
          </a>

          <a
            href="/shop"
            className="
              font-bold
              text-[#164d58]
              underline
              decoration-[#ff7114]
              decoration-2
              underline-offset-4
              transition
              hover:text-[#ff7114]
            "
          >
            Shop Now
          </a>

        </div>

      </div>
    </section>
        </ScrollReveal>

  );
}

export default Hero;