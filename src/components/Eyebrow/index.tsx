interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Eyebrow component
 *
 * Small text component with a decorative horizontal line before it.
 * Typically used for section labels or small headings.
 *
 * @param props - EyebrowProps containing children and optional className
 */
function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={`text-sm font-normal text-brand-gray flex items-center mb-6 before:content-[''] before:inline-block before:mr-4 before:w-12 before:border-t before:border-brand-gray before:pb-[5px] ${className}`}
    >
      {children}
    </p>
  );
}

export default Eyebrow;
