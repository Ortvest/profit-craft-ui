import Header from '@/components/sections/Header';
import PromoBanner from '@/components/sections/PromoBanner';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Goals from '@/components/sections/Goals';
import HowItWorks from '@/components/sections/HowItWorks';
import Reviews from '@/components/sections/Reviews';
import MemberPricing from '@/components/sections/MemberPricing';
import Pricing from '@/components/sections/Pricing';
import Security from '@/components/sections/Security';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';
import MessengerWidget from '@/components/sections/MessengerWidget';

export default function HomePage() {
  return (
    <>
      <header className="header-wrapper">
        <Header />
      </header>
      <aside
        className="promo-banner"
        aria-label="Promotional Offer"
        itemScope
        itemType="https://schema.org/Offer"
      >
        <PromoBanner />
      </aside>
      <main>
        <section className="main-section-wrapper">
          <Hero />
        </section>
        <section className="companies-logo-wrapper" aria-label="Trusted by major US banks and institutions">
          <Marquee />
        </section>
        <MessengerWidget />
        <section className="goals-section-wrapper" aria-label="Financial goal options">
          <Goals />
        </section>
        <section className="profit-craft-section-wrapper">
          <HowItWorks />
        </section>
        <section className="comments-section-wrapper">
          <Reviews />
        </section>
        <section id="member-pricing" className="ambitions-section-wrapper" aria-labelledby="member-pricing-title">
          <MemberPricing />
        </section>
        <section id="plans" className="ambitions-section-wrapper" aria-labelledby="plans-title">
          <Pricing />
        </section>
        <section className="security-section-wrapper" aria-labelledby="security-title">
          <Security />
        </section>
        <section id="contact" className="contact-section-wrapper">
          <Contact />
        </section>
        <section id="faq" className="FAQ-section">
          <Faq />
        </section>
        <footer className="footer-wrapper">
          <Footer />
        </footer>
      </main>
    </>
  );
}
