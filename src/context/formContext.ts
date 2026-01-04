import { createContext } from "react";
import type { FormDataState } from "../types";

/**
 * Form context type definition
 *
 * Provides form state and actions to components via React Context.
 * This context is provided by FormProvider and consumed via useFormContext hook.
 *
 * @property updateFormData - Merges partial form data into existing state
 * @property setFormStep - Updates the current form step (0-3)
 * @property formStep - Current step in the form flow
 * @property activeTab - Currently active tab ID (for step 1-2)
 * @property setActiveTab - Updates the active tab
 * @property formData - Complete form data state
 */
export interface FormContextType {
  updateFormData: (data: Partial<FormDataState>) => void;
  setFormStep: (step: number | ((prev: number) => number)) => void;
  formStep: number;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  formData: FormDataState;
}

/**
 * React Context for form state management
 *
 * Created with null as default to allow type checking when context
 * is used outside of FormProvider (will throw error via useFormContext).
 */
export const FormContext = createContext<FormContextType | null>(null);
