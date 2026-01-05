/**
 * Structured address result from Google Maps Geocoder parsing
 */
export interface GoogleAddressResult {
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Parses Google Maps Geocoder address components into a structured address object.
 *
 * Handles various address formats and edge cases:
 * - Falls back to sublocality/neighborhood if locality is missing
 * - Extracts subpremise (apartment, suite, etc.) as address2
 * - Handles missing street_number or route gracefully
 * - Validates that essential components are present
 *
 * @param components - Array of address components from Google Maps Geocoder
 * @returns Structured address object with address, address2 (optional), city, state, and zip
 * @throws {Error} If components array is empty or missing essential address data
 */
export const parseAddressComponents = (
  components: google.maps.GeocoderAddressComponent[]
): GoogleAddressResult => {
  if (!components || components.length === 0) {
    throw new Error("Address components array is empty or undefined");
  }

  // Use a Map for O(1) lookups instead of multiple iterations
  const addressParts = new Map<string, string>();

  // Single pass through components to extract all needed parts
  for (const component of components) {
    const types = component.types;

    // Street address components
    if (types.includes("street_number") && !addressParts.has("street_number")) {
      addressParts.set("street_number", component.long_name);
    }
    if (types.includes("route") && !addressParts.has("route")) {
      addressParts.set("route", component.long_name);
    }

    // City components (try locality first, then fallback to sublocality/neighborhood)
    if (types.includes("locality") && !addressParts.has("locality")) {
      addressParts.set("locality", component.long_name);
    } else if (
      !addressParts.has("locality") &&
      (types.includes("sublocality") || types.includes("sublocality_level_1"))
    ) {
      addressParts.set("locality", component.long_name);
    } else if (!addressParts.has("locality") && types.includes("neighborhood")) {
      addressParts.set("locality", component.long_name);
    }

    // State (use short_name for abbreviation)
    if (types.includes("administrative_area_level_1") && !addressParts.has("state")) {
      addressParts.set("state", component.short_name);
    }

    // ZIP code
    if (types.includes("postal_code") && !addressParts.has("postal_code")) {
      addressParts.set("postal_code", component.long_name);
    }

    // Address line 2 (apartment, suite, etc.)
    if (types.includes("subpremise") && !addressParts.has("subpremise")) {
      addressParts.set("subpremise", component.long_name);
    }
  }

  // Build street address
  const streetNumber = addressParts.get("street_number") || "";
  const route = addressParts.get("route") || "";
  const address = `${streetNumber} ${route}`.trim();

  // Get city with fallback
  const city = addressParts.get("locality") || "";

  // Get state and zip
  const state = addressParts.get("state") || "";
  const zip = addressParts.get("postal_code") || "";

  // Get optional address line 2
  const address2 = addressParts.get("subpremise");

  // Validate essential components are present
  if (!address && !city && !state) {
    throw new Error(
      "Unable to parse address: missing essential components (address, city, or state)"
    );
  }

  return {
    address: address || route, // Fallback to route if no street number
    ...(address2 && { address2 }),
    city,
    state,
    zip,
  };
};
