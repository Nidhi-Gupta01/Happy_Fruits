import SectionHeading from "./common/SectionHeading";
import FruitCard from "./common/FruitCard";

function Fruits() {
  return (
    <section
      id="fruits"
      className="bg-[#fff8ec] px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <SectionHeading
          title="Our Fresh Fruits 🍊"
          description="Handpicked fruits full of freshness, taste and nutrition."
        />

        {/* Fruits Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <FruitCard
            image="/fruits/orange.png"
            name="Fresh Orange"
          />

          <FruitCard
            image="/fruits/strawberry.png"
            name="Strawberry"
          />

          <FruitCard
            image="/fruits/blueberry.png"
            name="Blueberry"
          />

          <FruitCard
            image="/fruits/mango.png"
            name="Fresh Mango"
          />

          <FruitCard
            image="/fruits/apple.png"
            name="Fresh Apple"
          />

          <FruitCard
            image="/fruits/banana.png"
            name="Fresh Banana"
          />

          <FruitCard
            image="/fruits/pineapple.png"
            name="Pineapple"
          />

          <FruitCard
            image="/fruits/grapes.png"
            name="Fresh Grapes"
          />

        </div>

        {/* Shop Button */}
        <div className="mt-14 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff7114] px-9 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#e96109]"
          >
            View All Fruits
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default Fruits;