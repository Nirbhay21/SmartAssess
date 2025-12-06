import FeaturesSection from '@/components/landing/features/FeaturesSection';
import HeroSection from '@/components/landing/hero/HeroSection';
import HowItWorksSection from '@/components/landing/howItWorks/HowItWorksSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}
