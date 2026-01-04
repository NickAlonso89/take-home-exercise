/**
 * Utility functions for generating className strings with conditional logic
 */

/**
 * Generates className for tab panel visibility states
 * Used for showing/hiding tab content with smooth transitions
 */
export function getTabPanelClasses(isActive: boolean): string {
  const base = "w-full transition-opacity duration-300 ease-in-out";
  return isActive
    ? `${base} opacity-100 pointer-events-auto relative z-10`
    : `${base} opacity-0 pointer-events-none absolute inset-0 z-0`;
}

/**
 * Generates className for form field container with error state handling
 * Used in FormField and AddressAutocomplete components
 */
export function getFormFieldContainerClasses(hasError: boolean): string {
  const base =
    "h-[60px] box-border flex items-center relative bg-brand-surface border rounded-lg p-3 transition-all duration-300 mb-0";
  return hasError
    ? `${base} border-red-500 animate-error-shake`
    : `${base} border-brand-border focus-within:border-brand-gold focus-within:animate-border-glow focus-within:shadow-[0_0_0_2px_rgba(195,139,79,0.2)]`;
}

/**
 * Generates className for floating label with conditional positioning
 * Used in FormField and AddressAutocomplete components
 */
export function getFloatingLabelClasses(shouldFloat: boolean): string {
  const base =
    "text-sm pointer-events-none absolute left-3 transition-all duration-300 z-10 m-0 leading-normal";
  return shouldFloat
    ? `${base} top-0.5 scale-[0.85] origin-left-top text-brand-gold`
    : `${base} top-1/2 -translate-y-1/2 text-brand-gray`;
}

/**
 * Generates className for form input with conditional padding
 * Used in FormField and AddressAutocomplete components
 */
export function getFormInputClasses(shouldFloatLabel: boolean): string {
  const base =
    "bg-transparent text-white w-full outline-none font-normal pt-0 pb-0 h-6 leading-6 flex-1";
  const padding = shouldFloatLabel ? "pt-2" : "";
  const placeholder =
    !shouldFloatLabel
      ? "[&::placeholder]:opacity-0 [&::placeholder]:text-transparent"
      : "";
  return `${base} ${padding} ${placeholder}`.trim();
}

/**
 * Generates className for tab button with disabled state
 * Used in Tabs component
 */
export function getTabButtonClasses(isDisabled: boolean): string {
  const base =
    "flex flex-col items-center gap-2 bg-transparent border-none p-0 group outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold rounded-sm transition-transform duration-200 ease-out";
  return isDisabled
    ? `${base} cursor-not-allowed opacity-50`
    : `${base} cursor-pointer hover:scale-105`;
}

