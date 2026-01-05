import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { parseAddressComponents } from "../../utils/addressParser";
import "./AddressAutocomplete.module.css";
import {
  getFormFieldContainerClasses,
  getFloatingLabelClasses,
  getFormInputClasses,
} from "../../utils/classNames";

/**
 * Provides address autocomplete with floating label and error handling.
 * Integrates with Google Places API to provide address suggestions and
 * automatically parses selected addresses into formData.
 *
 * Features:
 * - Google Places autocomplete integration
 * - Address parsing into structured components
 * - Floating label animation
 * - Error state handling
 * - Restricted to US addresses only
 * - Debounced API requests (300ms)
 */
interface ParsedAddress {
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressAutocompleteProps {
  onAddressSelect: (data: ParsedAddress) => void;
  error?: string;
  defaultValue?: string;
}

function AddressAutocomplete({
  onAddressSelect,
  error,
  defaultValue = "",
}: AddressAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
    },
    debounce: 300,
  });

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== value) {
      setValue(defaultValue, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });

      const components = results[0].address_components;
      const parsedAddress = parseAddressComponents(components);

      onAddressSelect(parsedAddress);
    } catch (error) {
      console.error("Error parsing address: ", error);
    }
  };

  const [isFocused, setIsFocused] = useState(false);
  const shouldFloatLabel = isFocused || !!value;
  const errorId = "address-autocomplete-error";

  return (
    <div className="mb-8 relative w-full">
      <div className={getFormFieldContainerClasses(!!error)}>
        <label
          htmlFor="address-autocomplete-useplaces"
          className={getFloatingLabelClasses(shouldFloatLabel)}
        >
          Address
        </label>
        <div className="flex items-center relative flex-1">
          <input
            id="address-autocomplete-useplaces"
            name="address-autocomplete-useplaces"
            type="text"
            value={value}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={!ready}
            placeholder={shouldFloatLabel ? "" : "Start typing your address..."}
            className={getFormInputClasses(shouldFloatLabel)}
            required
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
          />
        </div>
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-500 absolute top-full mt-1 left-0" role="alert">
          {error}
        </p>
      )}

      {status === "OK" && (
        <ul
          className="pac-container absolute w-full list-none m-0 top-full"
          role="listbox"
          aria-label="Address suggestions"
        >
          {data.map(({ place_id, description }) => (
            <li key={place_id} role="option">
              <button
                type="button"
                onClick={() => handleSelect(description)}
                className="pac-item w-full text-left"
                aria-label={`Select address: ${description}`}
              >
                {description}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddressAutocomplete;
