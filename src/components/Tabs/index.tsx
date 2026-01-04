import { useFormContext } from "../../hooks/useFormContext";
import { getTabPanelClasses, getTabButtonClasses } from "../../utils/classNames";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  formStep: number;
}

/**
 * Tabs component for multi-step form navigation
 *
 * Provides accessible tab navigation with keyboard support (Arrow keys).
 * Tabs are disabled based on form step progression. Only tabs up to the
 * current step are accessible.
 *
 * Features:
 * - ARIA-compliant tab navigation
 * - Keyboard navigation (ArrowLeft/ArrowRight)
 * - Visual indicators for active/disabled/focused states
 * - Smooth transitions between tab panels
 *
 * @param props - TabsProps containing items and formStep
 */
const Tabs = ({ items, formStep }: TabsProps) => {
  const { activeTab, setActiveTab } = useFormContext();

  return (
    <div className="w-full flex flex-col">
      <div role="tablist" className="flex justify-center gap-4 mb-8 px-1">
        {items.map((item, index) => {
          const isActive = activeTab === item.id;
          const isDisabled = formStep < index + 1;

          const tabPanelId = `tabpanel-${item.id}`;
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              role="tab"
              disabled={isDisabled}
              aria-selected={isActive}
              aria-controls={tabPanelId}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const direction = e.key === "ArrowRight" ? 1 : -1;
                  const newIndex = index + direction;

                  if (newIndex >= 0 && newIndex < items.length) {
                    const targetIsDisabled = formStep < newIndex + 1;
                    if (!targetIsDisabled) {
                      setActiveTab(items[newIndex].id);
                      const buttons = e.currentTarget.parentElement?.querySelectorAll("button");
                      if (buttons && buttons[newIndex]) {
                        (buttons[newIndex] as HTMLButtonElement).focus();
                      }
                    }
                  }
                }
              }}
              tabIndex={isActive ? 0 : -1}
              className={getTabButtonClasses(isDisabled)}
            >
              <div
                className={`h-1.5 w-16 rounded-full transition-[width,background-color] duration-300 ease-out ${
                  isActive ? "bg-brand-gold" : "bg-brand-border"
                }`}
              />

              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-brand-gold" : "text-brand-gray"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="py-2 relative">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              id={`tabpanel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              className={getTabPanelClasses(isActive)}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
