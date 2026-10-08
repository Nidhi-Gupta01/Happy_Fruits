import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Fruits from "../components/Fruits";
import FruitBanner from "../components/FruitBanner";
import Plans from "../components/Plans";
import About from "../components/About";
import FAQSection from "../components/FAQSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollReveal from "../components/common/ScrollReveal";

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf0]">

      {/* Header */}
      <Header />

      <main>

        {/* Hero */}
        <ScrollReveal>
          <Hero />
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>

        {/* Homepage showcase only */}
        <ScrollReveal>
          <Fruits />
        </ScrollReveal>

        {/* Fruit Banner */}
        <ScrollReveal>
          <FruitBanner />
        </ScrollReveal>

        {/* Plans */}
        <ScrollReveal>
          <Plans />
        </ScrollReveal>

        {/* About */}
        <ScrollReveal>
          <About />
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <CTA />
        </ScrollReveal>

      </main>

      <Footer />

    </div>
  );
}

export default Home;