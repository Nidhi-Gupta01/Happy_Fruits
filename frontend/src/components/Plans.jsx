import SectionHeading from "./common/SectionHeading";
import PlanCard from "./common/PlanCard";
import ScrollReveal from "./common/ScrollReveal";


function Plans() {
  return (
        <ScrollReveal>

    <section
      id="plans"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">

        <SectionHeading
          title="Choose Your Plan"
          description="Fresh fruit boxes made for every lifestyle."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          <PlanCard
            title="Starter"
            price="₹299"
            description="Perfect for trying Happy Fruit."
          />

          <PlanCard
            title="Family"
            price="₹599"
            description="Fresh fruits for the whole family."
            popular
          />

          <PlanCard
            title="Premium"
            price="₹999"
            description="Premium seasonal fruit collection."
          />

        </div>

      </div>
    </section>
        </ScrollReveal>

  );
}

export default Plans;