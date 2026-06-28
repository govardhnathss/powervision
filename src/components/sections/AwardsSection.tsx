import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import MetroAward from '../../assets/images/metro-award-2024.jpg';

const partners = ['SIDBI', 'K-BIP', 'Metro Journal', 'MSME India'];

const AwardsSection: React.FC = () => {
  return (
    <section id="awards" className="section section--white">
      <div className="container">
        <div className="section-header fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <p className="section-label">Recognition</p>
          <h2 className="section-title">Awards & Achievements</h2>
          <div className="section-divider" />
        </div>
        <div className="awards-layout fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <div className="awards-image-wrapper">
            <img src={MetroAward} alt="Metro MSME Awards 2024 - Power Vision Best Innovation in Solar Solutions" className="awards-image" />
          </div>
          <div className="awards-content">
            <div className="award-badge">
              <FontAwesomeIcon icon={faCertificate} className="text-amber-600" />
              Metro MSME Awards 2024 — 7th Edition
            </div>
            <h3 className="awards-title">
              Best Innovation in <span className="text-blue-600">Solar Solutions</span>
            </h3>
            <p className="awards-desc">
              Power Vision was honored with the prestigious <strong>Metro MSME Award 2024</strong> for Best Innovation in Solar Solutions — recognizing our pioneering approach to sustainable energy technology and our transformative impact on communities across Kerala.
            </p>
            <p className="awards-desc awards-desc--sm">
              Presented in association with SIDBI, K-BIP (Kerala Bureau of Industrial Promotion), and Metro Journal — reflecting our commitment to cutting-edge solar solutions that set new industry benchmarks.
            </p>
            <div>
              <p className="partners-label">Associated Partners</p>
              <div className="partners-list">
                {partners.map((partner, idx) => (
                  <span key={idx} className="partner-tag">{partner}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
