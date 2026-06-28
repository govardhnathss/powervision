import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faCcVisa, faCcMastercard, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import powerSolarLogo from '../../assets/images/power-vision-logo.png';

const quickLinks = ['Home', 'About Us', 'Services', 'Projects', 'Testimonials', 'Contact'];
const services = ['Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Off-Grid Systems', 'Solar Maintenance', 'Battery Storage'];
const socialIcons = [faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube];
const paymentIcons = [faCcVisa, faCcMastercard, faCcPaypal];

const FooterSection: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <img
                src={powerSolarLogo}
                alt="Power Vision Solar"
                className="footer__logo"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="footer__tagline">
                Harnessing the power of the sun to create a sustainable future for homes and businesses across Kerala.
              </p>
              <div className="footer__social">
                {socialIcons.map((icon, i) => (
                  <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer__col-heading">Quick Links</h4>
              <ul className="footer__link-list">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer__col-heading">Our Services</h4>
              <ul className="footer__link-list">
                {services.map((s, i) => (
                  <li key={i}><a href="#services" className="footer__link">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter + Contact */}
            <div>
              <h4 className="footer__col-heading">Stay Updated</h4>
              <p className="footer__newsletter-text">Subscribe to receive updates on solar industry news and special offers.</p>
              <div className="footer__newsletter">
                <input type="email" placeholder="Enter your email" className="footer__newsletter-input" />
                <button className="footer__newsletter-btn">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </div>
              <ul className="footer__contact-list">
                <li><FontAwesomeIcon icon={faLocationDot} className="text-blue-400" /><span>Malson Tower, Manacaud, Trivandrum - 09</span></li>
                <li><FontAwesomeIcon icon={faPhone} className="text-blue-400" /><a href="tel:+919048366721" className="footer__link">9048366721</a></li>
                <li><FontAwesomeIcon icon={faEnvelope} className="text-blue-400" /><a href="mailto:info@powervisionsolar.in" className="footer__link">info@powervisionsolar.in</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2025 Power Vision Solar. All rights reserved.</p>
          <div className="footer__payment">
            {paymentIcons.map((icon, i) => (
              <FontAwesomeIcon key={i} icon={icon} className="footer__payment-icon" />
            ))}
          </div>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
