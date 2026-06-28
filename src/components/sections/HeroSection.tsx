import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import WhatsAppButton from '../WhatsAppButton';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const slides = [
  { image: 'https://public.readdy.ai/ai/img_res/3fbfad1dcca588362aac15650aa4477c.jpg', title: 'Powering Homes with Solar Energy', subtitle: 'Sustainable solutions for a brighter future' },
  { image: 'https://public.readdy.ai/ai/img_res/607bc6df5babe22be1cb8fbb57638d79.jpg', title: 'Commercial Solar Solutions', subtitle: 'Reducing carbon footprint for businesses' },
  { image: 'https://public.readdy.ai/ai/img_res/5801341e0d7cd82f95b26819ae2233c6.jpg', title: 'Professional Installation Services', subtitle: 'Expert teams delivering quality workmanship' },
];

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="hero-section">
      <WhatsAppButton />
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="hero-overlay" />
            <div className="hero-bg" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="hero-content-wrapper">
              <div className="hero-content">
                <p className="hero-label">Power Vision Solar — Kerala's Trusted Energy Partner</p>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-cta">
                  <button onClick={() => scrollToSection('contact')} className="btn btn--primary btn--lg">
                    Get Free Quote
                  </button>
                  <button onClick={() => scrollToSection('services')} className="btn btn--outline-white btn--lg">
                    Our Services
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-scroll-indicator">
        <button onClick={() => scrollToSection('stats')} className="scroll-down-btn">
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
