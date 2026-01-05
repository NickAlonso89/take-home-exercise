import { useState, useEffect, useRef } from "react";
import {
  getFormFieldContainerClasses,
  getFloatingLabelClasses,
  getFormInputClasses,
} from "../../utils/classNames";

/**
 * FormField component with floating label and error handling
 *
 * Features:
 * - Floating label animation
 * - Error state with shake animation
 * - Optional icon support
 * - ARIA attributes for accessibility
 * - Controlled/uncontrolled input support via defaultValue
 */
interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  id: string;
  name: string;
  Icon?: React.ElementType;
  error?: string;
  defaultValue?: string;
}

function FormField({
  label,
  required = true,
  type = "text",
  id,
  name,
  Icon,
  error,
  defaultValue,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => !!defaultValue);
  const [showError, setShowError] = useState(() => !!error);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousErrorRef = useRef(error);

  // Sync hasValue with input value on mount and when defaultValue changes
  useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (error !== previousErrorRef.current) {
      previousErrorRef.current = error;

      if (error) {
        setTimeout(() => setShowError(true), 0);
        if (inputRef.current) {
          inputRef.current.classList.add("animate-error-shake");
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.classList.remove("animate-error-shake");
            }
          }, 400);
        }
      } else {
        const timer = setTimeout(() => setShowError(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [error]);

  const handleFocus = () => {
    setIsFocused(true);
    // Check if input has value on focus to ensure label floats correctly
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  };

  const shouldFloatLabel = isFocused || hasValue;

  return (
    <div className="mb-8 relative">
      <div className={getFormFieldContainerClasses(!!error)}>
        <label htmlFor={id} className={getFloatingLabelClasses(shouldFloatLabel)}>
          {label}
        </label>
        <div className="flex items-center relative flex-1">
          <input
            ref={inputRef}
            type={type}
            id={id}
            name={name}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
            className={getFormInputClasses(shouldFloatLabel)}
            placeholder={shouldFloatLabel ? "" : undefined}
          />
          {Icon && (
            <Icon className="text-white w-5 h-5 ml-2 opacity-50 transition-all duration-300 ease-out focus-within:scale-110 focus-within:opacity-80" />
          )}
        </div>
      </div>
      {showError && error && (
        <p
          id={errorId}
          className="animate-error-slide text-xs text-red-500 absolute top-full mt-1 left-0"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
