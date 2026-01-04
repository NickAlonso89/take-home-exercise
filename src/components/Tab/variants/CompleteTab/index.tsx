import Tab from "../../index";

/**
 * CompleteTab component - Step 3 of the form flow
 *
 * Displays confirmation message after successful form submission.
 * This is the final step in the form flow.
 */
function CompleteTab() {
  return (
    <Tab
      heading="Congratulations, You're All Set!"
      description="Your application has been submitted"
    >
      <p className="text-brand-gray">
        We've securely confirmed your information. Your personalized unclaimed benefits guide is
        being prepared right now and will be sent to you shortly.
      </p>
    </Tab>
  );
}

export default CompleteTab;
