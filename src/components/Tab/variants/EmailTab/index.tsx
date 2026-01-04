import { useState } from "react";
import { useFormContext } from "../../../../hooks/useFormContext";
import { useFormSubmission } from "../../../../hooks/useFormSubmission";
import Tab from "../../index";
import Form from "../../../Form";
import FormField from "../../../FormField";
import Checkbox from "../../../Checkbox";
import Link from "../../../Link";

/**
 * EmailTab component - Step 0 of the form flow
 *
 * Collects user email and consent preferences. On successful submission,
 * progresses to the Info step (step 1).
 */
function EmailTab() {
  const { updateFormData, setFormStep, setActiveTab, formData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { handleSubmit } = useFormSubmission({
    fieldsToValidate: ["email"],
    onSuccess: (data) => {
      updateFormData(data);
      setFormStep((prevStep) => Math.max(prevStep, 1));
      setActiveTab("info");
    },
    setErrors,
  });

  return (
    <Tab heading="Start Today!" description="Provide your email to get started">
      <Form onSubmit={handleSubmit} submitText="Get Started">
        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          error={errors.email}
          defaultValue={formData?.email}
        />
        <Checkbox
          label={
            <span>
              I agree to receive marketing and promotional emails from GetnGooods and our
              partners.{" "}
            </span>
          }
          id="marketingConsent"
          name="marketingConsent"
          required={false}
          defaultChecked={!!formData?.marketingConsent}
        />
        <Checkbox
          label={
            <span>
              I have read and agree to the <Link href="/terms" text="terms and conditions" /> and{" "}
              <Link href="/privacy" text="privacy policy" />{" "}
            </span>
          }
          id="termsAndConditions"
          name="termsAndConditions"
          defaultChecked={!!formData?.termsAndConditions}
        />
      </Form>
    </Tab>
  );
}

export default EmailTab;
