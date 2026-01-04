interface LinkProps {
  href: string;
  text: string;
}

/**
 * Styled link component
 *
 * Provides consistent link styling with hover effects.
 * Used for terms, privacy policy, and other inline links.
 *
 * @param props - LinkProps containing href and text
 */
function Link({ href, text }: LinkProps) {
  return (
    <a href={href} className="text-brand-gold hover:text-white transition-colors">
      {text}
    </a>
  );
}

export default Link;
