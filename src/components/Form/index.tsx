import ArrowIcon from "../../assets/arrow.svg?react";
import styles from "./Form.module.css";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  submitText?: string;
}

/**
 * Form component with styled submit button
 *
 * Wraps form content with a styled submit button that includes
 * an arrow icon. Handles form submission via the onSubmit prop.
 *
 * @param props - FormProps containing onSubmit, children, and submitText
 */
function Form({ onSubmit, children, submitText = "Continue" }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit" className={`group ${styles.submitButton}`}>
        <span className="relative z-10">{submitText}</span>
        <div className={styles.iconContainer}>
          <ArrowIcon className={styles.icon} />
        </div>
      </button>
    </form>
  );
}

export default Form;
