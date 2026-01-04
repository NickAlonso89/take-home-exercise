import { useCallback, useState } from "react";
import { useFormContext } from "../../../../hooks/useFormContext";
import { useFormSubmission } from "../../../../hooks/useFormSubmission";
import Tab from "../../index";
import Form from "../../../Form";
import FormField from "../../../FormField";
import Checkbox from "../../../Checkbox";
import Link from "../../../Link";
import AddressAutocomplete from "../../../AddressAutocomplete";
import { useJsApiLoader } from "@react-google-maps/api";

/**
 * AddressTab component - Step 2 of the form flow
 *
 * Collects address (via Google Places autocomplete) and phone number.
 * Validates phone number format and requires address selection.
 * On successful submission, progresses to the Complete step (step 3).
 *
 * Note: Requires Google Maps API key in environment variables.
 */
function AddressTab() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const { updateFormData, setFormStep, setActiveTab, formData, activeTab } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addressData, setAddressData] = useState<{
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
  } | null>(() => {
    if (formData?.address && formData?.city && formData?.state && formData?.zip) {
      return {
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      };
    }
    return null;
  });

  const handleAddressSelect = useCallback(
    (address: { address: string; address2?: string; city: string; state: string; zip: string }) => {
      setAddressData(address);
      setErrors({});
    },
    [setErrors]
  );

  const { handleSubmit } = useFormSubmission({
    fieldsToValidate: ["phoneNumber"],
    customValidation: () => {
      if (!addressData) {
        return { address: "Please select an address from the suggestions" };
      }
      return null;
    },
    transformFormData: (data) => {
      if (!addressData) {
        return data;
      }
      return {
        ...data,
        address: addressData.address,
        address2: addressData.address2,
        city: addressData.city,
        state: addressData.state,
        zip: addressData.zip,
      };
    },
    onSuccess: (data) => {
      updateFormData(data);
      setFormStep((prevStep) => Math.max(prevStep, 3));
      setActiveTab("complete");
    },
    setErrors,
  });

  const isAddressTabActive = activeTab === "address";
  const defaultAddress = formData?.address
    ? `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, USA`
    : "";

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Tab heading="Keep Going!" description="Confirm your address and phone number to qualify">
      <Form onSubmit={handleSubmit}>
        {isAddressTabActive ? (
          <>
            <AddressAutocomplete
              onAddressSelect={handleAddressSelect}
              error={errors.address}
              defaultValue={defaultAddress}
            />
          </>
        ) : null}
        <FormField
          label="Phone Number"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          error={errors.phoneNumber}
          defaultValue={formData?.phoneNumber}
        />
        <Checkbox
          required={false}
          label={
            <span>
              I agree to sign up for marketing messages from Benefits Access Center and their{" "}
              <Link href="marketing-partners" text="partners" />
            </span>
          }
          id="phoneMarketingConsent"
          name="phoneMarketingConsent"
          defaultChecked={!!formData?.phoneMarketingConsent}
        />
        <Checkbox
          label={
            <span>
              I agree to the <Link href="/terms" text="terms and conditions" />{" "}
            </span>
          }
          id="phoneTermsAndConditions"
          name="phoneTermsAndConditions"
          defaultChecked={!!formData?.phoneTermsAndConditions}
        />
      </Form>
    </Tab>
  );
}

export default AddressTab;
