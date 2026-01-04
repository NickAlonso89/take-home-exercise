interface GoogleAddressResult {
  address: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Parses Google Maps Geocoder address components into a structured address object
 * @param components - Array of address components from Google Maps Geocoder
 * @returns Structured address object with address, city, state, and zip
 */
export const parseAddressComponents = (
  components: google.maps.GeocoderAddressComponent[]
): GoogleAddressResult => {
  const addressParts = {
    street_number: "",
    route: "",
    locality: "",
    administrative_area_level_1: "",
    postal_code: "",
  };

  components.forEach((component) => {
    const types = component.types;
    if (types.includes("street_number")) {
      addressParts.street_number = component.long_name;
    }
    if (types.includes("route")) {
      addressParts.route = component.long_name;
    }
    if (types.includes("locality")) {
      addressParts.locality = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      addressParts.administrative_area_level_1 = component.short_name;
    }
    if (types.includes("postal_code")) {
      addressParts.postal_code = component.long_name;
    }
  });

  return {
    address: `${addressParts.street_number} ${addressParts.route}`.trim(),
    city: addressParts.locality,
    state: addressParts.administrative_area_level_1,
    zip: addressParts.postal_code,
  };
};
