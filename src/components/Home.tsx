// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

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

// Import Swiper styles
import powerSolar from '../assets/images/power-vision-logo.png'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
          } h-16 overflow-visible `}
      >
        <div className="container mx-auto px-6  md:px-0  flex justify-between items-center h-full">
          <div className="flex items-center h-full mt-20 ">
            <img
              src={powerSolar}
              alt="Power Solar Logo"
              className="h-80 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-poppins">
            {['home', 'services', 'projects', 'feedback', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-lg font-extrabold cursor-pointer whitespace-nowrap !rounded-button ${activeSection === item ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-300`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 font-medium text-sm whitespace-nowrap !rounded-button cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 cursor-pointer whitespace-nowrap !rounded-button"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'}`}>
          <div className="container mx-auto px-6 flex flex-col space-y-4 font-poppins">
            {['home', 'services', 'projects', 'feedback', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium py-2 cursor-pointer whitespace-nowrap !rounded-button ${activeSection === item ? 'text-blue-600' : 'text-gray-700'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium text-sm whitespace-nowrap !rounded-button cursor-pointer font-poppins">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 md:pt-0 min-h-screen flex items-center relative overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          loop
          className="w-full h-screen font-poppins"
        >
          {[
            {
              image: "https://public.readdy.ai/ai/img_res/3fbfad1dcca588362aac15650aa4477c.jpg",
              title: "Powering Homes with Solar Energy",
              subtitle: "Sustainable solutions for a brighter future"
            },
            {
              image: "https://public.readdy.ai/ai/img_res/607bc6df5babe22be1cb8fbb57638d79.jpg",
              title: "Commercial Solar Solutions",
              subtitle: "Reducing carbon footprint for businesses"
            },
            {
              image: "https://public.readdy.ai/ai/img_res/5801341e0d7cd82f95b26819ae2233c6.jpg",
              title: "Professional Installation",
              subtitle: "Expert teams delivering quality service"
            }
          ].map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              <div className="container mx-auto px-6 h-full flex items-center relative z-20">
                <div className="max-w-xl text-white fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <div className="flex space-x-4 font-poppins">
                    <button className="bg-blue-600  hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap !rounded-button cursor-pointer">
                      Get Started
                    </button>
                    <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap !rounded-button cursor-pointer">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-200 shadow-lg rounded-full flex items-center justify-center cursor-pointer" onClick={() => scrollToSection('services')}>
            <FontAwesomeIcon icon={faChevronDown} className="text-blue-600" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 font-poppins">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide comprehensive solar solutions tailored to your specific needs, ensuring maximum efficiency and sustainability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: faSolarPanel,
                title: "Residential Solar",
                description: "Custom solar solutions for homes of all sizes, reducing electricity bills while increasing property value."
              },
              {
                icon: faBuilding,
                title: "Commercial Solar",
                description: "Large-scale solar installations for businesses, warehouses, and corporate buildings to reduce operational costs."
              },
              {
                icon: faTools,
                title: "Installation & Maintenance",
                description: "Professional installation services and ongoing maintenance to ensure optimal system performance."
              },
              {
                icon: faBatteryFull,
                title: "Battery Storage",
                description: "Energy storage solutions to maximize self-consumption and provide backup power during outages."
              },
              {
                icon: faChartLine,
                title: "Energy Monitoring",
                description: "Advanced monitoring systems to track performance and optimize energy production."
              },
              {
                icon: faFileContract,
                title: "Consultation & Design",
                description: "Expert consultation and custom system design based on your energy needs and property specifications."
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-section opacity-0 translate-y-10 transition-all duration-1000"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  <FontAwesomeIcon icon={service.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="text-blue-600 font-medium flex items-center cursor-pointer whitespace-nowrap !rounded-button">
                  Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-6 font-poppins">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">☀ Why Choose Us for Your Solar Needs?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">At PowerVision, we don’t just install solar panels — we deliver complete, reliable, and future-ready solar solutions tailored to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: faCertificate, title: 'Expertise You Can Count On', description: 'With years of experience in the solar industry, our team of certified engineers and technicians ensures every project is completed with precision, safety, and long-term performance in mind.' },
              { icon: faCogs, title: 'Customized Solar Solutions', description: "We design systems perfectly sized and optimized for your energy needs and budget—on-grid, off-grid, or hybrid." },
              { icon: faMoneyBillWave, title: 'Maximize Savings', description: 'From helping you claim government incentives to designing systems that reduce your power bills to nearly zero, we make solar an investment that pays off faster.' },
              { icon: faTools, title: 'Top-Quality Products & Installation', description: 'We use only premium-grade solar panels, inverters, and batteries from trusted brands — ensuring durability, efficiency, and long-term peace of mind.' },
              { icon: faGlobe, title: 'Sustainable Commitment', description: 'By choosing us, you are partnering with a company committed to a greener, cleaner future for all.' },
              { icon: faHandsHelping, title: 'Customer-First Approach', description: "Ongoing maintenance, real-time monitoring, and a dedicated customer service team to answer any questions along the way." }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-section opacity-0 translate-y-10"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-600">
                  <FontAwesomeIcon icon={feature.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20">
        <div className="container mx-auto px-6 font-poppins">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our portfolio of successful solar installations across various locations and project types.</p>
          </div>

          <div className="flex flex-wrap justify-center mb-10 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            {['All Projects', 'Residential', 'Commercial', 'Industrial'].map((filter, index) => (
              <button
                key={index}
                className={`px-6 py-2 m-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap !rounded-button ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "https://public.readdy.ai/ai/img_res/ca73c1fd70c5fe30a497beb90456eb33.jpg",
                title: "Oakridge Residence",
                location: "Portland, OR",
                capacity: "8.5 kW",
                date: "January 2025"
              },
              {
                image: "https://public.readdy.ai/ai/img_res/274fc848f63b0daa27558ce6709ed8ef.jpg",
                title: "Westfield Office Complex",
                location: "Seattle, WA",
                capacity: "125 kW",
                date: "November 2024"
              },
              {
                image: "https://public.readdy.ai/ai/img_res/03ea47fb049f5e64eba69097009dbde8.jpg",
                title: "Sunnyvale Solar Farm",
                location: "Phoenix, AZ",
                capacity: "2.4 MW",
                date: "March 2025"
              },
              {
                image: "https://public.readdy.ai/ai/img_res/3e1b3a48b62bdf97eb67e99d4263331d.jpg",
                title: "Riverside Apartments",
                location: "Austin, TX",
                capacity: "45 kW",
                date: "February 2025"
              },
              {
                image: "https://public.readdy.ai/ai/img_res/839f17c6041251caf04846e0739b9799.jpg",
                title: "Greenwood Elementary School",
                location: "Denver, CO",
                capacity: "35 kW",
                date: "December 2024"
              },
              {
                image: "https://public.readdy.ai/ai/img_res/3a27b9cb93685cf650e84897b729cbc5.jpg",
                title: "Hillcrest Farm",
                location: "Madison, WI",
                capacity: "22 kW",
                date: "April 2025"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg fade-in-section opacity-0 translate-y-10 transition-all duration-1000"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                  <div className="text-gray-200 mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />{project.location}</div>
                  <div className="text-gray-200 mb-1"><FontAwesomeIcon icon={faBolt} className="mr-2" />{project.capacity}</div>
                  <div className="text-gray-200 mb-4"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />{project.date}</div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full self-start hover:bg-blue-700 transition-colors duration-300 text-sm font-medium cursor-pointer whitespace-nowrap !rounded-button">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-medium cursor-pointer whitespace-nowrap !rounded-button">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" ref={feedbackRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 font-poppins">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear what our clients have to say about their experience working with us.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="h-full"
              >
                {[
                  {
                    quote: "SolarPro transformed our home with a seamless solar installation. We're saving significantly on our energy bills while reducing our carbon footprint. The team was professional, knowledgeable, and made the entire process stress-free.",
                    name: "Jennifer Anderson",
                    title: "Homeowner",
                    image: "https://public.readdy.ai/ai/img_res/ccd731270f698a1778af30aaf120eb15.jpg"
                  },
                  {
                    quote: "As a business owner, I was concerned about the initial investment, but SolarPro provided clear ROI projections that made the decision easy. The installation was completed ahead of schedule, and the system has outperformed our expectations.",
                    name: "Michael Rodriguez",
                    title: "Business Owner",
                    image: "https://public.readdy.ai/ai/img_res/13f0b07cd25239c7dd778c7483261794.jpg"
                  },
                  {
                    quote: "We chose SolarPro for our school district's sustainability initiative, and they delivered exceptional results. Their team worked around our schedule to minimize disruption, and they've been responsive with ongoing support and maintenance.",
                    name: "Sarah Thompson",
                    title: "School Administrator",
                    image: "https://public.readdy.ai/ai/img_res/f878b4053f9fc80128cbe9d7af1f13b4.jpg"
                  }
                ].map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
                      <div className="mb-6">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-blue-600 text-4xl opacity-30" />
                      </div>
                      <p className="text-gray-700 italic mb-8 flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    thumbnail: "https://public.readdy.ai/ai/img_res/ef4f80b85ca7e79192fc129c56ce2ff6.jpg",
                    title: "How Solar Panels Reduced Our Energy Bills by 70%",
                    client: "The Johnson Family"
                  },
                  {
                    thumbnail: "https://public.readdy.ai/ai/img_res/97b60fea6021e03c01d4f1792849915a.jpg",
                    title: "Solar for Business: Our 1-Year Review",
                    client: "Westside Retail Center"
                  },
                  {
                    thumbnail: "https://public.readdy.ai/ai/img_res/ff187936695919740a9fcfbde9ba15a9.jpg",
                    title: "Our Solar Installation Journey",
                    client: "The Martinez Family"
                  },
                  {
                    thumbnail: "https://public.readdy.ai/ai/img_res/8efa515830926a6d058623e61b1a6419.jpg",
                    title: "Powering Our Farm with Solar Energy",
                    client: "Greenfield Organic Farm"
                  }
                ].map((video, index) => (
                  <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                          <FontAwesomeIcon icon={faPlay} className="text-white text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm line-clamp-1">{video.title}</h4>
                      <p className="text-gray-600 text-xs">{video.client}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://www.youtube.com/channel/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 cursor-pointer whitespace-nowrap !rounded-button"
                >
                  View More Videos on YouTube <FontAwesomeIcon icon={faYoutube} className="ml-2 text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20">
        <div className="container mx-auto px-6 font-poppins">
          <div className="text-center mb-16 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Ready to start your solar journey? Get in touch with our team for a free consultation and quote.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8 fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap !rounded-button"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100  rounded-full flex items-center justify-center mr-4 text-blue-600 flex-shrink-0">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div>
                      <h4 className="font-bold mr-56">Address</h4>
                      <p className="text-gray-600">Malson Tower, Manacaud, Trivandrum -09</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 flex-shrink-0">
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </div>
                    <div>
                      <h4 className="font-bold mr-80">Phone</h4>
                      <p className="text-gray-600 mr-48">9048366721, 8075859429</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 flex-shrink-0">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <h4 className="font-bold mr-52">Email</h4>
                      <p className="text-gray-600 mr-20">info@powervisionsolar.in</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 flex-shrink-0">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div>
                      <h4 className="font-bold mr-52">Business Hours</h4>
                      <p className="text-gray-600 mr-16">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 mr-28">Saturday: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {[faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube].map((icon, index) => (
                      <a
                        key={index}
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-64">
                <div className="w-full h-full bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0910623952574!2d-122.41941548468204!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1649524245889!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faSolarPanel} className="mr-2" />
                <span>PowerVision</span>
              </div>
              <p className="text-gray-400 mb-6 ">Providing sustainable solar solutions for residential and commercial properties since 2010.</p>
              <div className="flex space-x-4">
                {[faFacebook, faTwitter, faInstagram, faLinkedin].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Projects', 'Testimonials', 'Contact'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className='font-poppins'>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                {['Residential Solar', 'Commercial Solar', 'Solar Maintenance', 'Battery Storage', 'Energy Monitoring', 'Solar Consultation'].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className='font-poppins'>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <form className="flex mb-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full border-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer whitespace-nowrap !rounded-button"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
              <p className="text-gray-400 text-sm">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>

          <hr className="border-gray-800 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 SolarPro. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer">Terms of Service</a>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCcVisa} className='text-2xl text-gray-400' />
                <FontAwesomeIcon icon={faCcMastercard} className='text-2xl text-gray-400' />
                <FontAwesomeIcon icon={faCcPaypal} className='text-2xl text-gray-400' />
              </div>
            </div>
          </div>
        </div>
      </footer >

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'} z-40 !rounded-button`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button >
    </div >
  );
};

export default App;

