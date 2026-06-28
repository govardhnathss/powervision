import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import powerSolar from '../../assets/images/power-vision-logo.png';

interface NavbarProps {
  activeSection: string;
  hideNav: boolean;
  scrollToSection: (id: string, closeMenu?: () => void) => void;
}

const NAV_ITEMS = ['home', 'services', 'awards', 'projects', 'feedback', 'contact'];

const Navbar: React.FC<NavbarProps> = ({ activeSection, hideNav, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${hideNav ? 'navbar--hidden' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__logo">
          <img src={powerSolar} alt="Power Vision Solar" className="logo-img" />
        </div>

        <div className="navbar__desktop-menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item, closeMenu)}
              className={`nav-link ${activeSection === item ? 'nav-link--active' : ''}`}
            >
              {item === 'feedback' ? 'Testimonials' : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
          <button onClick={() => scrollToSection('contact', closeMenu)} className="btn btn--primary">
            Free Quote
          </button>
        </div>

        <div className="navbar__mobile-toggle">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer text-gray-700">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item, closeMenu)}
            className={`mobile-nav-link ${activeSection === item ? 'nav-link--active' : ''}`}
          >
            {item === 'feedback' ? 'Testimonials' : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
