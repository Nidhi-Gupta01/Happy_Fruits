import SectionHeading from "./common/SectionHeading";
import FAQ from "./common/FAQ";
import ScrollReveal from "./common/ScrollReveal";


function FAQSection() {
  return (
        <ScrollReveal>

    <section
      id="faq"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">

        <SectionHeading
          title="Frequently Asked Questions"
          description="Everything you need to know about Happy Fruit."
        />

        <div className="mt-12 space-y-4">

          <FAQ
            question="How fresh are the fruits?"
            answer="We carefully select and pack fresh fruits for every order."
          />

          <FAQ
            question="Do you provide home delivery?"
            answer="Yes. We deliver our fruit boxes directly to your doorstep."
          />

          <FAQ
            question="Can I choose my fruits?"
            answer="Yes. You can choose your favourite fruits for your box."
          />

        </div>

      </div>
    </section>
        </ScrollReveal>

  );
}

export default FAQSection;