import Logo from "../../assets/logo.svg?react";
import Nav from "../Nav";
import NavItem from "../NavItem";

/**
 * Header component
 *
 * Application header with logo and navigation menu.
 * Responsive layout that adapts to mobile and desktop views.
 */
function Header() {
  return (
    <header className="flex lg:grid lg:grid-cols-3 items-center max-w-[1280px] mx-auto">
      <a
        href="/"
        className="text-white flex my-4 sm:my-6 mr-6 hover:text-brand-gold lg:justify-self-start lg:mr-0"
      >
        <Logo />
      </a>
      <Nav className="hidden md:flex my-0 sm:my-6 justify-start lg:justify-center lg:col-start-2 lg:col-end-3">
        <NavItem href="/programs" name="Programs" />
        <NavItem href="/eligibility" name="Eligibility" />
        <NavItem href="/about-us" name="About Us" />
        <NavItem href="/contact" name="Contact" />
      </Nav>
    </header>
  );
}

export default Header;
