import { useState } from "react";

interface CheckboxProps {
  label: string | React.ReactNode;
  id: string;
  name: string;
  required?: boolean;
  defaultChecked?: boolean;
}

/**
 * Checkbox component with custom styling
 *
 * Controlled checkbox component with custom styling. Supports
 * rich label content (including links) and required/optional states.
 *
 * @param props - CheckboxProps containing label, id, name, required, and defaultChecked
 */
function Checkbox({ label, id, name, required = true, defaultChecked }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex items-start mb-8">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={handleChange}
        className="custom-checkbox mt-1 mr-2 min-w-[1rem]"
        required={required}
      />
      <label htmlFor={id} className="text-sm text-brand-gray cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
