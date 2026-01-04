import Header from "./components/Header";
import Eyebrow from "./components/Eyebrow";
import CheckIcon from "./assets/check.svg?react";
import Logo from "./assets/logo.svg?react";
import Disclaimer from "./components/Disclaimer";
import NavItem from "./components/NavItem";
import Nav from "./components/Nav";
import Tabs from "./components/Tabs";
import AddressTab from "./components/Tab/variants/AddressTab";
import EmailTab from "./components/Tab/variants/EmailTab";
import InfoTab from "./components/Tab/variants/InfoTab";
import CompleteTab from "./components/Tab/variants/CompleteTab";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { FormDataState } from "./types";
import { FormProvider } from "./providers/FormProvider";
import HeroContent from "./components/HeroContent";
import ScrollableCards from "./components/ScrollableCards";
import { getTabPanelClasses } from "./utils/classNames";

/**
 * Main application component
 *
 * Manages the multi-step form flow with the following steps:
 * - Step 0: Email collection
 * - Step 1-2: Info and Address tabs
 * - Step 3: Completion screen
 *
 * Features:
 * - Form data persistence to localStorage with debouncing
 * - Step restoration on page load
 * - Context-based state management for form data
 * - Smooth transitions between form steps
 */
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(() => {
    try {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      return {};
    }
  });

  const [formStep, setFormStep] = useState(() => {
    return formData?.step || 0;
  });

  const tabData = useMemo(
    () => [
      { id: "info", label: "1. Info", content: <InfoTab /> },
      { id: "address", label: "2. Address", content: <AddressTab /> },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(() => {
    if (formStep > 0 && formStep <= tabData.length) {
      return tabData[formStep - 1].id;
    }
    return tabData[0]?.id || "info";
  });

  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestFormDataRef = useRef(formData);
  const latestFormStepRef = useRef(formStep);
  const DEBOUNCE_DELAY_MS = 300;

  useEffect(() => {
    latestFormDataRef.current = formData;
    latestFormStepRef.current = formStep;
  }, [formData, formStep]);

  const writeToLocalStorage = useCallback((data: FormDataState, step: number) => {
    try {
      localStorage.setItem("formData", JSON.stringify({ ...data, step }));
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      writeToLocalStorage(latestFormDataRef.current, latestFormStepRef.current);
    }, DEBOUNCE_DELAY_MS);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [formData, formStep, writeToLocalStorage]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
      writeToLocalStorage(latestFormDataRef.current, latestFormStepRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFormData = useCallback((newData: Partial<FormDataState>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  const formContextValue = useMemo(
    () => ({
      updateFormData,
      setFormStep,
      formStep,
      activeTab,
      setActiveTab,
      formData,
    }),
    [updateFormData, setFormStep, formStep, activeTab, setActiveTab, formData]
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex flex-col md:flex-row items-center justify-center gap-12 py-6 md:py-12 px-6 overflow-hidden">
          <div className={`${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}>
            <HeroContent />
          </div>
          <div
            className={`w-full max-w-md bg-brand-dark-lighter p-6 md:p-12 rounded-[2rem] shadow-2xl border border-white/5 min-h-[600px] flex flex-col ${
              isLoaded ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <FormProvider value={formContextValue}>
              <div className="relative w-full">
                {/* Hiding inactive tabs instead of conditionally rendering them for improved performance, the google maps component is a bit heavier so that is conditionally rendered within its tab */}
                <div className={getTabPanelClasses(formStep === 0)}>
                  <EmailTab />
                </div>
                <div className={getTabPanelClasses(formStep === 1 || formStep === 2)}>
                  {(formStep === 1 || formStep === 2) && (
                    <Tabs items={tabData} formStep={formStep} />
                  )}
                </div>
                <div className={getTabPanelClasses(formStep === 3)}>
                  <CompleteTab />
                </div>
              </div>
            </FormProvider>
          </div>
        </section>
        <section className="py-6 md:py-12 px-6 bg-brand-dark-section text-center">
          <Eyebrow className="justify-center">Why Choose Us</Eyebrow>
          <h2 className="text-[2.5rem] font-bold text-white leading-[1.2] m-0 mb-12 p-0">
            Your Benefits Guide
          </h2>
          <ScrollableCards
            cards={[
              { Icon: CheckIcon, text: "Discover your benefits guide, created uniquely for you." },
              { Icon: CheckIcon, text: "See real benefits you can claim today." },
              {
                Icon: CheckIcon,
                text: "Learn about benefit programs you didn't even know existed.",
              },
            ]}
          />
        </section>
        <Disclaimer>THIS SITE IS NOT AFFLIATED WITH ANY GOVERNMENT AGENCY.</Disclaimer>
        <section className="flex flex-col items-center py-6 md:py-12 px-6">
          <Logo />
          <Nav className="my-6 justify-center md:justify-start">
            <NavItem href="/programs" name="Programs" className="md:hidden" />
            <NavItem href="/eligibility" name="Eligibility" className="md:hidden" />
            <NavItem href="/about-us" name="About Us" className="md:hidden" />
            <NavItem href="/terms-and-conditions" name="Terms and Conditions" />
            <NavItem href="/unsubscribe" name="Unsubscribe" />
            <NavItem href="/privacy-policy" name="Privacy Policy" />
            <NavItem href="/program-requirements" name="Program Requirements" />
            <NavItem href="/contact" name="Contact" />
          </Nav>
          <p className="text-brand-gray">© 2026 Government Benefits Guide. All rights reserved.</p>
        </section>
      </main>
    </>
  );
}

export default App;
