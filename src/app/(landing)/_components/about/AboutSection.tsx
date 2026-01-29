import AboutHeader from './AboutHeader';
import AboutInfoSection from './AboutInfoSection';
import BuiltForSection from './BuiltForSection';
import VisionAndMission from './VisionAndMission';

const AboutSection = () => {
  return (
    <section id="about" className="px-4 py-12 sm:py-16 2xl:pt-20">
      <div className="mx-auto max-w-7xl">
        <AboutHeader />
        <VisionAndMission />
        <AboutInfoSection />
        <BuiltForSection />
      </div>
    </section>
  );
};

export default AboutSection;
