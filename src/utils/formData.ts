import type { FormDataState } from "../types";

/**
 * Valid keys in FormDataState that can come from form inputs
 *
 * Excludes 'step' which is managed separately by the form state.
 * This type ensures type safety when converting FormData to FormDataState.
 */
type FormDataStateKey =
  | "email"
  | "marketingConsent"
  | "termsAndConditions"
  | "fullName"
  | "dateOfBirth"
  | "gender"
  | "address"
  | "address2"
  | "zip"
  | "city"
  | "state"
  | "phoneNumber"
  | "phoneMarketingConsent"
  | "phoneTermsAndConditions";

/**
 * Type guard to check if a string is a valid FormDataState key
 *
 * @param key - String to check
 * @returns True if key is a valid FormDataStateKey
 */
function isFormDataStateKey(key: string): key is FormDataStateKey {
  const validKeys: readonly FormDataStateKey[] = [
    "email",
    "marketingConsent",
    "termsAndConditions",
    "fullName",
    "dateOfBirth",
    "gender",
    "address",
    "address2",
    "zip",
    "city",
    "state",
    "phoneNumber",
    "phoneMarketingConsent",
    "phoneTermsAndConditions",
  ] as const;
  return validKeys.includes(key as FormDataStateKey);
}

/**
 * Safely converts FormData to Partial<FormDataState>
 *
 * Handles:
 * - Checkboxes (returns "on" or undefined, converts to string or undefined)
 * - Type safety (only includes valid FormDataState keys)
 * - String values (FormData always returns strings)
 *
 * @param formData - The FormData object from a form submission
 * @returns A properly typed Partial<FormDataState> object
 */
export function formDataToState(formData: FormData): Partial<FormDataState> {
  const result: Partial<FormDataState> = {};

  for (const [key, value] of formData.entries()) {
    if (!isFormDataStateKey(key)) {
      continue;
    }

    const stringValue = value instanceof File ? value.name : String(value);

    if (stringValue === "on") {
      result[key] = stringValue;
    } else if (stringValue.trim() !== "") {
      result[key] = stringValue;
    }
  }

  return result;
}
