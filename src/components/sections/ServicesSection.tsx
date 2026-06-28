import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolarPanel, faBuilding, faTools, faBatteryFull, faChartLine, faFileContract, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const services = [
  { icon: faSolarPanel, title: 'Residential Solar', description: 'Custom solar solutions for homes of all sizes, reducing electricity bills while increasing property value.' },
  { icon: faBuilding, title: 'Commercial Solar', description: 'Large-scale solar installations for businesses, warehouses, and corporate buildings to reduce operational costs.' },
  { icon: faTools, title: 'Installation & Maintenance', description: 'Professional installation services and ongoing maintenance to ensure optimal system performance.' },
  { icon: faBatteryFull, title: 'Battery Storage', description: 'Energy storage solutions to maximize self-consumption and provide backup power during outages.' },
  { icon: faChartLine, title: 'Energy Monitoring', description: 'Advanced monitoring systems to track performance and optimize energy production in real time.' },
  { icon: faFileContract, title: 'Consultation & Design', description: 'Expert consultation and custom system design based on your energy needs and property specifications.' },
];

interface ServicesSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ sectionRef }) => {
  return (
    <section id="services" ref={sectionRef} className="section section--white">
      <div className="container">
        <div className="section-header fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <div className="section-divider" />
          <p className="section-description">Comprehensive solar solutions tailored to your needs, ensuring maximum efficiency and long-term sustainability.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card fade-in-section opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="service-card__icon">
                <FontAwesomeIcon icon={service.icon} className="text-xl" />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <button className="service-card__link">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
