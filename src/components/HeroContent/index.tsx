import Eyebrow from "../Eyebrow";
import StarsIcon from "../../assets/stars.svg?react";
import ShieldIcon from "../../assets/shield.svg?react";
import PrintIcon from "../../assets/print.svg?react";

/**
 * HeroContent component
 *
 * Main hero section content displayed on the landing page.
 * Includes heading, description, reviews, and feature highlights
 * with decorative background glow effect.
 */
function HeroContent() {
  return (
    <>
      <div
        data-hero-glow
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[100px] -z-10 pointer-events-none will-change-transform"
      ></div>

      <div className="max-w-lg">
        <Eyebrow>Unlock Your Benefits</Eyebrow>
        <h1 className="text-6xl md:text-7xl font-serif text-white leading-tight mt-4 mb-6">
          Find Your <span className="text-brand-gold italic">Funds</span>
        </h1>
        <p className="text-lg text-brand-gray leading-relaxed mb-6">
          Discover government assistance programs tailored to your unique situation. Get
          personalized guidance today.
        </p>
        <p className="text-brand-gray flex gap-2 items-center text-sm mb-6">
          <StarsIcon />
          100+ Positive Reviews
        </p>
        <div className="flex gap-6 items-center text-sm mb-6">
          <p className="text-white flex flex-col gap-2 items-center text-xs">
            <ShieldIcon />
            Secure and Private
          </p>
          <p className="text-white flex flex-col gap-2 items-center text-xs">
            <PrintIcon />
            Free Access
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroContent;
