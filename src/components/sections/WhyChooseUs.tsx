import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faCogs, faMoneyBillWave, faTools, faGlobe, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const features = [
  { icon: faCertificate, title: 'Certified Expertise', description: 'Our certified engineers ensure every project is completed with precision, safety, and long-term performance.' },
  { icon: faCogs, title: 'Customized Solutions', description: 'Systems perfectly sized for your needs and budget — on-grid, off-grid, or hybrid configurations.' },
  { icon: faMoneyBillWave, title: 'Maximize Savings', description: 'We help you claim government incentives and design systems that reduce power bills to near zero.' },
  { icon: faTools, title: 'Premium Products', description: 'We use only top-grade panels, inverters, and batteries from globally recognized brands.' },
  { icon: faGlobe, title: 'Sustainable Future', description: 'Partnering with us means committing to a greener, cleaner future for your community.' },
  { icon: faHandsHelping, title: 'Customer-First Support', description: 'Ongoing maintenance, real-time monitoring, and a dedicated service team always ready to help.' },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="section section--blue-light">
      <div className="container">
        <div className="section-header fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <p className="section-label">Our Strengths</p>
          <h2 className="section-title">Why Choose Power Vision?</h2>
          <div className="section-divider" />
          <p className="section-description">We don't just install solar panels — we deliver complete, reliable, and future-ready energy solutions.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card fade-in-section opacity-0 translate-y-10"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
