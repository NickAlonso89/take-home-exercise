import { validateField } from "../utils/validation";
import { formDataToState } from "../utils/formData";
import type { FormDataState } from "../types";

interface UseFormSubmissionOptions {
  /**
   * Field names to validate on submit
   */
  fieldsToValidate: string[];
  /**
   * Custom validation function that runs before field validation
   * Returns error object if validation fails, null if passes
   */
  customValidation?: (formData: FormData) => Record<string, string> | null;
  /**
   * Transform form data before updating (e.g., merge additional data)
   */
  transformFormData?: (formData: Partial<FormDataState>) => Partial<FormDataState>;
  /**
   * Callback executed on successful submission
   */
  onSuccess: (formData: Partial<FormDataState>) => void;
  /**
   * Function to set errors
   */
  setErrors: (errors: Record<string, string>) => void;
}

/**
 * Custom hook for handling form submission with validation
 *
 * @param options - Configuration options for form submission
 * @returns A handleSubmit function for form submission
 */
export function useFormSubmission({
  fieldsToValidate,
  customValidation,
  transformFormData,
  onSuccess,
  setErrors,
}: UseFormSubmissionOptions) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    if (customValidation) {
      const customErrors = customValidation(formData);
      if (customErrors) {
        setErrors(customErrors);
        return;
      }
    }

    const formErrors: Record<string, string> = {};
    for (const fieldName of fieldsToValidate) {
      const fieldValue = formData.get(fieldName) as string;
      const validation = validateField(fieldName, fieldValue || "");
      if (!validation.isValid) {
        formErrors[fieldName] = validation.error || "";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    let data = formDataToState(formData);

    if (transformFormData) {
      data = transformFormData(data);
    }

    onSuccess(data);
  };

  return { handleSubmit };
}
