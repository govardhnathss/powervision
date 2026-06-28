import { useState, useEffect, useRef } from 'react';

export const useScrollBehavior = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const lastScrollY = useRef(0);

  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setHideNav(currentY > 100 && currentY > lastScrollY.current);
      lastScrollY.current = currentY;

      const scrollPosition = currentY + 100;
      if (servicesRef.current && scrollPosition >= servicesRef.current.offsetTop &&
        projectsRef.current && scrollPosition < projectsRef.current.offsetTop) {
        setActiveSection('services');
      } else if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop &&
        feedbackRef.current && scrollPosition < feedbackRef.current.offsetTop) {
        setActiveSection('projects');
      } else if (feedbackRef.current && scrollPosition >= feedbackRef.current.offsetTop &&
        contactRef.current && scrollPosition < contactRef.current.offsetTop) {
        setActiveSection('feedback');
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string, closeMenu?: () => void) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
    closeMenu?.();
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return { activeSection, isScrolled, hideNav, servicesRef, projectsRef, feedbackRef, contactRef, scrollToSection, scrollToTop };
};
