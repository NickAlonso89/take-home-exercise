/**
 * Form data state interface
 *
 * Represents all possible form fields that can be collected throughout
 * the multi-step form process. Fields are optional as they may not be
 * filled in all steps.
 *
 * @property email - User's email address
 * @property marketingConsent - Marketing consent checkbox value ("on" if checked)
 * @property termsAndConditions - Terms acceptance checkbox value ("on" if checked)
 * @property fullName - User's full name
 * @property dateOfBirth - Date of birth in MM/DD/YYYY format
 * @property gender - Selected gender option
 * @property address - Street address (from autocomplete or manual entry)
 * @property address2 - Apartment, suite, etc. (optional)
 * @property zip - ZIP code
 * @property city - City name
 * @property state - State abbreviation (e.g., "CA")
 * @property phoneNumber - Phone number (10 digits)
 * @property step - Current form step (0-3)
 */
export interface FormDataState {
  email?: string;
  marketingConsent?: string;
  termsAndConditions?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  address2?: string;
  zip?: string;
  city?: string;
  state?: string;
  phoneNumber?: string;
  step?: number;
  [key: string]: string | number | undefined; // Allow for flexibility while keeping it typed as string
}
