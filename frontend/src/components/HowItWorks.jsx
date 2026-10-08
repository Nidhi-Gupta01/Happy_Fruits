import SectionHeading from "./common/SectionHeading";
import StepCard from "./common/StepCard";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}

        <SectionHeading
          title="How It Works"
          description="Getting fresh and delicious fruits from Happy Fruits is simple. Choose what you love, create your perfect box and enjoy freshness delivered right to your doorstep."
        />

        {/* ================= STEPS ================= */}

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {/* STEP 1 */}

          <StepCard
            number="01"
            title="Explore Fresh Fruits"
            description="Browse through our collection of fresh, colourful and delicious fruits. Pick the ones you love and discover something new."
          />

          {/* STEP 2 */}

          <StepCard
            number="02"
            title="Build Your Box"
            description="Create your own fruit box by choosing your favourite fruits. Mix and match them according to your taste and needs."
          />

          {/* STEP 3 */}

          <StepCard
            number="03"
            title="Place Your Order"
            description="Review your selection, confirm your order and choose a convenient delivery option. It's quick and easy."
          />

          {/* STEP 4 */}

          <StepCard
            number="04"
            title="Freshness at Your Door"
            description="We carefully prepare your order and get it ready for delivery so you can enjoy fresh fruits without leaving your home."
          />

        </div>

        {/* ================= EXTRA INFO ================= */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {/* QUALITY */}

          <div className="rounded-3xl bg-[#fff8ec] p-7 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#164d58] text-2xl">
              🍎
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#164d58]">
              Carefully Selected
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              We focus on selecting fruits with freshness, quality
              and great taste in mind.
            </p>

          </div>

          {/* PACKING */}

          <div className="rounded-3xl bg-[#fff8ec] p-7 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7114] text-2xl">
              📦
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#164d58]">
              Packed With Care
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Every order is prepared with care so your fruits are
              ready to reach you in the best possible condition.
            </p>

          </div>

          {/* EXPERIENCE */}

          <div className="rounded-3xl bg-[#fff8ec] p-7 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#164d58] text-2xl">
              😊
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#164d58]">
              Made to Make You Happy
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              From choosing your fruits to receiving your order,
              we want every part of the experience to feel simple
              and enjoyable.
            </p>

          </div>

        </div>

        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-16 rounded-3xl bg-[#164d58] px-7 py-10 text-center text-white sm:px-12">

          <h3 className="text-2xl font-extrabold sm:text-3xl">
            Freshness Is Just a Few Clicks Away 🍊
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/75">
            No complicated process. Just choose your fruits,
            create your box and let Happy Fruits bring a little
            freshness and happiness to your day.
          </p>

          <a
            href="#fruits"
            className="
              mt-7
              inline-block
              rounded-full
              bg-[#ff7114]
              px-8
              py-3.5
              font-bold
              text-white
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-[#e96109]
            "
          >
            Explore Fruits
          </a>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;