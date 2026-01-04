interface NavProps {
  children: React.ReactNode[];
  className?: string;
}

/**
 * Navigation component
 *
 * Renders a navigation list with responsive grid/flex layout.
 * Automatically applies justify-start if no justify class is provided.
 *
 * @param props - NavProps containing children and optional className
 */
function Nav({ children, className = "" }: NavProps) {
  const hasJustify = className.includes("justify-");
  const justifyClass = hasJustify ? "" : "justify-start";

  return (
    <nav className={`flex items-center ${justifyClass} ${className}`.trim()}>
      <ul className="list-none m-0 p-0 grid grid-cols-2 md:flex md:flex-row gap-4">{children}</ul>
    </nav>
  );
}

export default Nav;
