import AboutSection from './_components/about/AboutSection';
import FAQSection from './_components/faq/FAQSection';
import FeaturesSection from './_components/features/FeaturesSection';
import HeroSection from './_components/hero/HeroSection';
import HowItWorksSection from './_components/how-it-works/HowItWorksSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <HowItWorksSection />
      <FAQSection />
    </>
  );
}
