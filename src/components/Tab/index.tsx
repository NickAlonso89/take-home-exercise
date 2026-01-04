interface TabProps {
  heading?: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Tab container component
 *
 * Provides a consistent layout for tab content with optional heading
 * and description. Used as a wrapper for form content in each tab step.
 *
 * @param props - TabProps containing heading, description, and children
 */
function Tab({ heading, description, children }: TabProps) {
  return (
    <div className="max-w-md w-full">
      {heading && <h2 className="text-4xl font-serif text-white mb-2">{heading}</h2>}
      {description && <p className="text-brand-gray mb-8">{description}</p>}
      {children}
    </div>
  );
}

export default Tab;
