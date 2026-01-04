import { FormContext, type FormContextType } from "../context/formContext";

/**
 * FormProvider component that provides form context to children
 *
 * Note: The value prop should be memoized in the parent component (App.tsx)
 * to prevent unnecessary re-renders. React Context will only re-render consumers
 * when the value reference changes.
 */
export const FormProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FormContextType;
}) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
