interface NavItemProps {
  href: string;
  name: string;
  className?: string;
}

/**
 * Navigation item component
 *
 * Individual navigation link item used within Nav component.
 * Provides consistent styling and hover effects.
 *
 * @param props - NavItemProps containing href, name, and optional className
 */
function NavItem({ href, name, className = "" }: NavItemProps) {
  return (
    <li>
      <a
        className={`no-underline text-white hover:text-brand-gold text-sm md:text-base ${className}`}
        href={href}
      >
        {name}
      </a>
    </li>
  );
}

export default NavItem;
