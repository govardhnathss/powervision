import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ContactFormData } from '../../Api/SubmitFormAsync';

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  formData: ContactFormData;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const contactInfo = [
  { icon: faMapMarkerAlt, label: 'Address', value: 'Malson Tower, Manacaud, Trivandrum - 09' },
  { icon: faPhoneAlt, label: 'Phone', value: '9048366721 / 8075859429' },
  { icon: faEnvelope, label: 'Email', value: 'info@powervisionsolar.in' },
  { icon: faClock, label: 'Hours', value: 'Mon–Fri: 8AM–6PM | Sat: 9AM–2PM' },
];

const socialIcons = [faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube];

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef, formData, loading, handleChange, handleSubmit }) => {
  return (
    <section id="contact" ref={sectionRef} className="section section--gray">
      <div className="container">
        <div className="section-header fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <div className="section-divider" />
          <p className="section-description">Ready to start your solar journey? Our team is here for a free consultation and custom quote.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-form-wrapper fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h3 className="contact-form__heading">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required className="form-input" placeholder="+91 00000 00000" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="form-input form-textarea" placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={loading} className="btn btn--primary btn--lg">
                {loading ? 'Sending...' : <><FontAwesomeIcon icon={faPaperPlane} /> Send Message</>}
              </button>
            </form>
          </div>

          <div className="contact-info-wrapper fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <div className="contact-info-card">
              <h3 className="contact-info__heading">Contact Information</h3>
              <div className="contact-info__list">
                {contactInfo.map((item, i) => (
                  <div key={i} className="contact-info__item">
                    <div className="contact-info__icon">
                      <FontAwesomeIcon icon={item.icon} className="text-blue-300 text-sm" />
                    </div>
                    <div>
                      <p className="contact-info__label">{item.label}</p>
                      <p className="contact-info__value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-social">
                <p className="contact-social__label">Follow Us</p>
                <div className="contact-social__icons">
                  {socialIcons.map((icon, i) => (
                    <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FontAwesomeIcon icon={icon} className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.157761244336!2d76.94469!3d8.4743865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb9fdb70d6f%3A0x48f463134dd0dcee!2zOMKwMjgnMjcuOCJOIDc2wrA1NicyMC4yIkU!5e0!3m2!1sen!2sin!4v1715692921041!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Power Vision Solar Location"
              />
              <button
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=8.4743865,76.9472649', '_blank')}
                className="map-overlay-btn"
                title="Get Directions"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
