/**
 * Result of a field validation
 *
 * @property isValid - Whether the field value is valid
 * @property error - Error message if validation fails (optional)
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Collection of field validators
 *
 * Each validator function:
 * - Returns { isValid: true } if field is empty (optional fields)
 * - Returns { isValid: true } if value passes validation
 * - Returns { isValid: false, error: string } if validation fails
 */
export const validators = {
  email: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: true };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }
    return { isValid: true };
  },

  dateOfBirth: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: true };
    }
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(dateRegex);

    if (!match) {
      return { isValid: false, error: "Please enter date in mm/dd/yyyy format" };
    }

    const [, month, day, year] = match;
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12) {
      return { isValid: false, error: "Please enter a valid month (01-12)" };
    }

    if (dayNum < 1 || dayNum > 31) {
      return { isValid: false, error: "Please enter a valid day (01-31)" };
    }

    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
      return { isValid: false, error: `Please enter a valid year (1900-${currentYear})` };
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (
      date.getMonth() !== monthNum - 1 ||
      date.getDate() !== dayNum ||
      date.getFullYear() !== yearNum
    ) {
      return { isValid: false, error: "Please enter a valid date" };
    }

    if (date > new Date()) {
      return { isValid: false, error: "Date of birth cannot be in the future" };
    }

    return { isValid: true };
  },

  phoneNumber: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: true };
    }
    const cleaned = value.replace(/[\s\-()]/g, "");
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(cleaned)) {
      return { isValid: false, error: "Please enter a valid 10-digit phone number" };
    }
    return { isValid: true };
  },

  zipCode: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: true };
    }
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(value)) {
      return { isValid: false, error: "Please enter a valid zip code (12345 or 12345-6789)" };
    }
    return { isValid: true };
  },
};

/**
 * Validates a form field by name and value
 *
 * Routes to the appropriate validator based on field name.
 * Returns valid result for empty values (fields are optional).
 * Returns valid result for unknown field names.
 *
 * @param name - Field name to validate (e.g., "email", "dateOfBirth")
 * @param value - Field value to validate
 * @returns ValidationResult indicating if field is valid and any error message
 *
 * @example
 * ```ts
 * const result = validateField("email", "user@example.com");
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 * ```
 */
export const validateField = (name: string, value: string): ValidationResult => {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }

  switch (name) {
    case "email":
      return validators.email(value);
    case "dateOfBirth":
      return validators.dateOfBirth(value);
    case "phoneNumber":
      return validators.phoneNumber(value);
    case "zip":
      return validators.zipCode(value);
    default:
      return { isValid: true };
  }
};
