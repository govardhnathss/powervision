import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useScrollBehavior } from '../hooks/useScrollBehavior';
import { submitFormAsync, ContactFormData } from '../Api/SubmitFormAsync';

import Navbar from '../components/sections/Navbar';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import AwardsSection from '../components/sections/AwardsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';
import WhatsAppButton from '../components/WhatsAppButton';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
};

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const {
    activeSection,
    hideNav,
    isScrolled,
    servicesRef,
    projectsRef,
    feedbackRef,
    contactRef,
    scrollToSection,
    scrollToTop,
  } = useScrollBehavior();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFormAsync(formData);
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData(initialFormData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins">
      <Navbar activeSection={activeSection} hideNav={hideNav} scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />
      <StatsSection />
      <ServicesSection sectionRef={servicesRef} />
      <WhyChooseUs />
      <AwardsSection />
      <ProjectsSection sectionRef={projectsRef} />
      <TestimonialsSection sectionRef={feedbackRef} />
      <ContactSection
        sectionRef={contactRef}
        formData={formData}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <FooterSection />

      <WhatsAppButton />

      {/* Back to top */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default HomePage;
