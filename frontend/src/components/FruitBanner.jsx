import ScrollReveal from "./common/ScrollReveal";


function FruitBanner() {
  return (
        <ScrollReveal>

    <section className="relative overflow-hidden bg-[#164d58] px-5 py-20 sm:px-8">

      <img
        src="/fruits/orange-slice.png"
        alt=""
        className="absolute -left-8 bottom-0 w-44 opacity-80"
      />

      <img
        src="/fruits/strawberry-slice.png"
        alt=""
        className="absolute left-24 top-5 w-28 opacity-70"
      />

      <img
        src="/fruits/mango-slice.png"
        alt=""
        className="absolute right-24 bottom-4 w-36 opacity-80"
      />

      <img
        src="/fruits/pineapple-slice.png"
        alt=""
        className="absolute -right-8 top-0 w-40 opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center text-white">

        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Nature's Goodness in Every Bite 🍓
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Fresh, colourful and carefully selected fruits
          for a happier and healthier lifestyle.
        </p>

      </div>

    </section>
        </ScrollReveal>

  );
}

export default FruitBanner;