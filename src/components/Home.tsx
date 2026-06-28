import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSolarPanel,
  faBuilding,
  faTools,
  faBatteryFull,
  faChartLine,
  faFileContract,
  faChevronDown,
  faArrowRight,
  faQuoteLeft,
  faPlay,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faClock,
  faArrowUp,
  faTimes,
  faBars,
  faPaperPlane,
  faBolt,
  faCalendarAlt,
  faCertificate,
  faCogs,
  faMoneyBillWave,
  faGlobe,
  faHandsHelping
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faCcVisa,
  faCcMastercard,
  faCcPaypal
} from '@fortawesome/free-brands-svg-icons';
import { submitFormAsync, ContactFormData } from '../Api/SubmitFormAsync';
import { ToastContainer, toast } from 'react-toastify';
import powerSolar from '../assets/images/power-vision-logo.png'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import WhatsAppButton from './WhatsAppButton';
import House1 from '../assets/images/House1.jpg';
import House2 from '../assets/images/House2.jpg';
import House3 from '../assets/images/House3.jpg';
import MetroAward from '../assets/images/metro-award-2024.jpg';


const App: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;

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

    // Fade-in animations for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  // const scrollToContact = () => {
  //   if (contactRef.current) {
  //     contactRef.current.scrollIntoView({ behavior: 'smooth' });
  //     setIsMenuOpen(false);
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      await submitFormAsync(formData);
      toast.success('Message sent successfully!'); setFormData({ name: '', email: '', phoneNumber: '', message: '' });
    } catch (err: any) {
      toast.error(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins">
      <ToastContainer />

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 transition-transform duration-300 will-change-transform ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-24">
          <div className="flex items-center">
            <img
              src={powerSolar}
              alt="Power Vision Solar"
              style={{ width: '280px', height: '250px', objectFit: 'contain', objectPosition: 'left center', marginLeft: '-45px' }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {['home', 'services', 'awards', 'projects', 'feedback', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === item
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item === 'feedback' ? 'Testimonials' : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer text-gray-700"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-100 absolute w-full transition-all duration-300 ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col">
            {['home', 'services', 'awards', 'projects', 'feedback', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-semibold py-3 text-left border-b border-gray-50 cursor-pointer ${activeSection === item ? 'text-blue-600' : 'text-gray-700'}`}
              >
                {item === 'feedback' ? 'Testimonials' : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <WhatsAppButton />
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation
          loop
          className="w-full h-screen"
        >
          {[
            { image: "https://public.readdy.ai/ai/img_res/3fbfad1dcca588362aac15650aa4477c.jpg", title: "Powering Homes with Solar Energy", subtitle: "Sustainable solutions for a brighter future" },
            { image: "https://public.readdy.ai/ai/img_res/607bc6df5babe22be1cb8fbb57638d79.jpg", title: "Commercial Solar Solutions", subtitle: "Reducing carbon footprint for businesses" },
            { image: "https://public.readdy.ai/ai/img_res/5801341e0d7cd82f95b26819ae2233c6.jpg", title: "Professional Installation Services", subtitle: "Expert teams delivering quality workmanship" }
          ].map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative z-20">
                <div className="max-w-2xl text-white">
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-5">Power Vision Solar — Kerala's Trusted Energy Partner</p>
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">{slide.title}</h1>
                  <p className="text-xl text-blue-100 mb-10 leading-relaxed">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-semibold transition-colors duration-200 cursor-pointer">
                      Get Free Quote
                    </button>
                    <button onClick={() => scrollToSection('services')} className="border-2 border-white/80 text-white hover:bg-white hover:text-blue-900 px-8 py-4 font-semibold transition-all duration-200 cursor-pointer">
                      Our Services
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button onClick={() => scrollToSection('stats')} className="animate-bounce bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-full text-white cursor-pointer">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section id="stats" className="bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Solar Installations' },
              { number: '10+', label: 'Years of Experience' },
              { number: '1,000+', label: 'Happy Clients' },
              { number: '5 MW+', label: 'Total Capacity Installed' },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">{stat.number}</div>
                <div className="text-blue-200 text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" ref={servicesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Comprehensive solar solutions tailored to your needs, ensuring maximum efficiency and long-term sustainability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: faSolarPanel, title: "Residential Solar", description: "Custom solar solutions for homes of all sizes, reducing electricity bills while increasing property value." },
              { icon: faBuilding, title: "Commercial Solar", description: "Large-scale solar installations for businesses, warehouses, and corporate buildings to reduce operational costs." },
              { icon: faTools, title: "Installation & Maintenance", description: "Professional installation services and ongoing maintenance to ensure optimal system performance." },
              { icon: faBatteryFull, title: "Battery Storage", description: "Energy storage solutions to maximize self-consumption and provide backup power during outages." },
              { icon: faChartLine, title: "Energy Monitoring", description: "Advanced monitoring systems to track performance and optimize energy production in real time." },
              { icon: faFileContract, title: "Consultation & Design", description: "Expert consultation and custom system design based on your energy needs and property specifications." }
            ].map((service, index) => (
              <div key={index} className="border border-gray-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group fade-in-section opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={service.icon} className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm">{service.description}</p>
                <button className="text-blue-600 font-semibold flex items-center text-sm gap-2 hover:gap-3 transition-all duration-200 cursor-pointer">
                  Learn More <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section id="why-us" className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Our Strengths</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Power Vision?</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">We don't just install solar panels — we deliver complete, reliable, and future-ready energy solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: faCertificate, title: 'Certified Expertise', description: 'Our certified engineers ensure every project is completed with precision, safety, and long-term performance.' },
              { icon: faCogs, title: 'Customized Solutions', description: 'Systems perfectly sized for your needs and budget — on-grid, off-grid, or hybrid configurations.' },
              { icon: faMoneyBillWave, title: 'Maximize Savings', description: 'We help you claim government incentives and design systems that reduce power bills to near zero.' },
              { icon: faTools, title: 'Premium Products', description: 'We use only top-grade panels, inverters, and batteries from globally recognized brands.' },
              { icon: faGlobe, title: 'Sustainable Future', description: 'Partnering with us means committing to a greener, cleaner future for your community.' },
              { icon: faHandsHelping, title: 'Customer-First Support', description: 'Ongoing maintenance, real-time monitoring, and a dedicated service team always ready to help.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 fade-in-section opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section id="awards" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Recognition</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Achievements</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-blue-50 -z-10" />
              <img src={MetroAward} alt="Metro MSME Awards 2024 - Power Vision Best Innovation in Solar Solutions" className="shadow-2xl w-full object-cover" />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 text-sm font-semibold gap-2">
                <FontAwesomeIcon icon={faCertificate} className="text-amber-600" />
                Metro MSME Awards 2024 — 7th Edition
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Best Innovation in <span className="text-blue-600">Solar Solutions</span></h3>
              <p className="text-gray-600 leading-relaxed">Power Vision was honored with the prestigious <strong>Metro MSME Award 2024</strong> for Best Innovation in Solar Solutions — recognizing our pioneering approach to sustainable energy technology and our transformative impact on communities across Kerala.</p>
              <p className="text-gray-500 leading-relaxed text-sm">Presented in association with SIDBI, K-BIP (Kerala Bureau of Industrial Promotion), and Metro Journal — reflecting our commitment to cutting-edge solar solutions that set new industry benchmarks.</p>
              <div className="pt-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Associated Partners</p>
                <div className="flex flex-wrap gap-3">
                  {['SIDBI', 'K-BIP', 'Metro Journal', 'MSME India'].map((partner, idx) => (
                    <span key={idx} className="border border-gray-200 text-gray-600 px-4 py-2 text-sm font-medium">{partner}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" ref={projectsRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Explore our portfolio of successful solar installations across various sectors and locations.</p>
          </div>
          <div className="flex flex-wrap justify-center mb-10 gap-2 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            {['All Projects', 'Residential', 'Commercial', 'Industrial'].map((filter, index) => (
              <button key={index} className={`px-6 py-2 text-sm font-semibold border transition-all duration-200 cursor-pointer ${index === 0 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600'}`}>
                {filter}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: House1, title: "Oakridge Residence", location: "Trivandrum, Mangalapuram", capacity: "5 kW", date: "June 2025" },
              { image: House2, title: "Westfield Office Complex", location: "Trivandrum, Kerala", capacity: "125 kW", date: "November 2024" },
              { image: House3, title: "Sunnyvale Solar Farm", location: "Kerala", capacity: "2.4 MW", date: "March 2025" },
              { image: "https://public.readdy.ai/ai/img_res/3e1b3a48b62bdf97eb67e99d4263331d.jpg", title: "Riverside Apartments", location: "Austin, TX", capacity: "45 kW", date: "February 2025" },
              { image: "https://public.readdy.ai/ai/img_res/839f17c6041251caf04846e0739b9799.jpg", title: "Greenwood School", location: "Denver, CO", capacity: "35 kW", date: "December 2024" },
              { image: "https://public.readdy.ai/ai/img_res/3a27b9cb93685cf650e84897b729cbc5.jpg", title: "Hillcrest Farm", location: "Madison, WI", capacity: "22 kW", date: "April 2025" }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden shadow-md fade-in-section opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${index * 100}ms` }}>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-lg font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center text-blue-200 text-sm mb-1 gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} />{project.location}</div>
                  <div className="flex items-center text-blue-200 text-sm mb-1 gap-2"><FontAwesomeIcon icon={faBolt} />{project.capacity}</div>
                  <div className="flex items-center text-blue-200 text-sm mb-4 gap-2"><FontAwesomeIcon icon={faCalendarAlt} />{project.date}</div>
                  <button className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold self-start hover:bg-blue-500 transition-colors cursor-pointer">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 font-semibold transition-all duration-200 cursor-pointer">View All Projects</button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="feedback" ref={feedbackRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} loop className="h-full">
                {[
                  { quote: "Power Vision transformed our home with a seamless solar installation. We're saving significantly on energy bills. The team was professional and made the entire process stress-free.", name: "Jennifer Anderson", title: "Homeowner", image: "https://public.readdy.ai/ai/img_res/ccd731270f698a1778af30aaf120eb15.jpg" },
                  { quote: "As a business owner, Power Vision provided clear ROI projections that made the decision easy. The installation was completed ahead of schedule and has outperformed our expectations.", name: "Michael Rodriguez", title: "Business Owner", image: "https://public.readdy.ai/ai/img_res/13f0b07cd25239c7dd778c7483261794.jpg" },
                  { quote: "We chose Power Vision for our sustainability initiative and they delivered exceptional results. Minimal disruption and great ongoing support throughout.", name: "Sarah Thompson", title: "School Administrator", image: "https://public.readdy.ai/ai/img_res/f878b4053f9fc80128cbe9d7af1f13b4.jpg" }
                ].map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-blue-50 border border-blue-100 p-10 h-full flex flex-col">
                      <FontAwesomeIcon icon={faQuoteLeft} className="text-blue-600 text-3xl opacity-30 mb-6" />
                      <p className="text-gray-700 leading-relaxed mb-8 flex-grow text-lg italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-6 border-t border-blue-100">
                        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-blue-600 text-sm font-medium">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { thumbnail: "https://public.readdy.ai/ai/img_res/ef4f80b85ca7e79192fc129c56ce2ff6.jpg", title: "How Solar Reduced Our Bills by 70%", client: "The Johnson Family" },
                  { thumbnail: "https://public.readdy.ai/ai/img_res/97b60fea6021e03c01d4f1792849915a.jpg", title: "Solar for Business: 1-Year Review", client: "Westside Retail Center" },
                  { thumbnail: "https://public.readdy.ai/ai/img_res/ff187936695919740a9fcfbde9ba15a9.jpg", title: "Our Solar Installation Journey", client: "The Martinez Family" },
                  { thumbnail: "https://public.readdy.ai/ai/img_res/8efa515830926a6d058623e61b1a6419.jpg", title: "Powering Our Farm with Solar", client: "Greenfield Organic Farm" }
                ].map((video, index) => (
                  <div key={index} className="group relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faPlay} className="text-blue-600 text-sm ml-1" />
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">{video.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{video.client}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="https://www.youtube.com/channel/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">
                  View More on YouTube <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" ref={contactRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Ready to start your solar journey? Our team is here for a free consultation and custom quote.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-white border border-gray-100 shadow-sm p-10 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm" placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 font-semibold transition-colors duration-200 flex items-center gap-3 cursor-pointer">
                  {loading ? 'Sending...' : <><FontAwesomeIcon icon={faPaperPlane} /> Send Message</>}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-6 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <div className="bg-blue-900 text-white p-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: faMapMarkerAlt, label: 'Address', value: 'Malson Tower, Manacaud, Trivandrum - 09' },
                    { icon: faPhoneAlt, label: 'Phone', value: '9048366721 / 8075859429' },
                    { icon: faEnvelope, label: 'Email', value: 'info@powervisionsolar.in' },
                    { icon: faClock, label: 'Hours', value: 'Mon–Fri: 8AM–6PM | Sat: 9AM–2PM' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-800 flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={item.icon} className="text-blue-300 text-sm" />
                      </div>
                      <div>
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-white text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-blue-800">
                  <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {[faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube].map((icon, i) => (
                      <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-blue-800 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                        <FontAwesomeIcon icon={icon} className="text-sm" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="overflow-hidden shadow-sm h-56 relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.157761244336!2d76.94469!3d8.4743865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb9fdb70d6f%3A0x48f463134dd0dcee!2zOMKwMjgnMjcuOCJOIDc2wrA1NicyMC4yIkU!5e0!3m2!1sen!2sin!4v1715692921041!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Power Vision Solar Location" />
                <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=8.4743865,76.9472649', '_blank')} className="absolute inset-0 w-full h-full z-10 bg-transparent cursor-pointer" title="Get Directions" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-blue-900 text-white pt-16 pb-8" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-800">
            <div>
              <img src={powerSolar} alt="Power Vision Solar" className="h-12 w-auto object-contain mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
              <p className="text-blue-200 text-sm leading-relaxed mb-6">Providing sustainable solar energy solutions for residential and commercial properties since 2010.</p>
              <div className="flex gap-3">
                {[faFacebook, faTwitter, faInstagram, faLinkedin].map((icon, i) => (
                  <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-blue-800 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    <FontAwesomeIcon icon={icon} className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Services', 'Awards', 'Projects', 'Testimonials', 'Contact'].map((link, i) => (
                  <li key={i}><a href="#" className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-5">Services</h3>
              <ul className="space-y-3">
                {['Residential Solar', 'Commercial Solar', 'Solar Maintenance', 'Battery Storage', 'Energy Monitoring', 'Solar Consultation'].map((service, i) => (
                  <li key={i}><a href="#" className="text-blue-200 hover:text-white text-sm transition-colors cursor-pointer">{service}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-5">Newsletter</h3>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed">Get the latest solar news and exclusive offers in your inbox.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-blue-800 text-white text-sm px-4 py-3 flex-1 outline-none border border-blue-700 focus:border-blue-500 placeholder-blue-400" />
                <button type="button" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                </button>
              </div>
              <p className="text-blue-400 text-xs mt-3">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">© 2025 Power Vision Solar. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</a>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCcVisa} className="text-2xl text-blue-300" />
                <FontAwesomeIcon icon={faCcMastercard} className="text-2xl text-blue-300" />
                <FontAwesomeIcon icon={faCcPaypal} className="text-2xl text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 z-40 cursor-pointer ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default App;
