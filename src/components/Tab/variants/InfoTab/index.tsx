import { useState } from "react";
import { useFormContext } from "../../../../hooks/useFormContext";
import { useFormSubmission } from "../../../../hooks/useFormSubmission";
import Tab from "../../index";
import Form from "../../../Form";
import FormField from "../../../FormField";
import Select from "../../../Select";
import CalendarIcon from "../../../../assets/calendar.svg?react";

/**
 * InfoTab component - Step 1 of the form flow
 *
 * Collects personal information (name, date of birth, gender).
 * Validates date of birth format. On successful submission,
 * progresses to the Address step (step 2).
 */
function InfoTab() {
  const { updateFormData, setFormStep, setActiveTab, formData } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { handleSubmit } = useFormSubmission({
    fieldsToValidate: ["dateOfBirth"],
    onSuccess: (data) => {
      updateFormData(data);
      setFormStep((prevStep) => Math.max(prevStep, 2));
      setActiveTab("address");
    },
    setErrors,
  });

  return (
    <Tab heading="Welcome!" description="Now we just need the basics">
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          defaultValue={formData?.fullName}
        />
        <FormField
          label="Date of Birth"
          type="text"
          id="dateOfBirth"
          name="dateOfBirth"
          Icon={CalendarIcon}
          error={errors.dateOfBirth}
          defaultValue={formData?.dateOfBirth}
        />
        <Select
          label="Gender"
          id="gender"
          name="gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-Binary" },
            { value: "other", label: "Other" },
            { value: "prefer not to say", label: "Prefer Not to Say" },
          ]}
          defaultValue={formData?.gender}
        />
      </Form>
    </Tab>
  );
}

export default InfoTab;
