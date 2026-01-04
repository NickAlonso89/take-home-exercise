interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
}

/**
 * Select dropdown component
 *
 * Styled select dropdown with custom arrow icon. Supports
 * optional label and default value.
 *
 * @param props - SelectProps containing label, id, name, options, and defaultValue
 */
function Select({ label, id, name, options, defaultValue }: SelectProps) {
  return (
    <div className="flex flex-col bg-brand-surface border border-brand-border rounded-lg p-3 mb-8 focus-within:border-brand-gold transition-colors relative">
      {label && (
        <label htmlFor={id} className="text-xs text-brand-gray mb-1 block">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className="bg-transparent text-white w-full outline-none appearance-none font-normal"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

export default Select;
