import { Link } from "react-router-dom";
import ScrollReveal from "./common/ScrollReveal";

function CTA() {
  return (
    <ScrollReveal>
      <section
        id="shop"
        className="bg-[#164d58] px-5 py-24 text-center text-white sm:px-8"
      >
        <h2 className="text-4xl font-extrabold">
          Ready to Eat Fresh? 🍊
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Start your healthy and happy fruit journey today.
        </p>

        <Link
          to="/shop"
          className="
            mt-8
            inline-flex
            rounded-full
            bg-[#ff7114]
            px-9
            py-4
            font-bold
            text-white
            shadow-lg
            transition
            hover:-translate-y-1
            hover:bg-[#e96109]
          "
        >
          Get Started →
        </Link>
      </section>
    </ScrollReveal>
  );
}

export default CTA;