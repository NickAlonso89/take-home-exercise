import { useContext } from "react";
import { FormContext } from "../context/formContext";

/**
 * Hook to access form context
 *
 * Provides access to form state and actions. Must be used within
 * a FormProvider component, otherwise throws an error.
 *
 * @returns FormContextType with form state and actions
 * @throws Error if used outside of FormProvider
 *
 * @example
 * ```tsx
 * const { formData, updateFormData, formStep } = useFormContext();
 * ```
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
