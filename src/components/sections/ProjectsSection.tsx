import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBolt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import House1 from '../../assets/images/House1.jpg';
import House2 from '../../assets/images/House2.jpg';
import House3 from '../../assets/images/House3.jpg';

interface ProjectsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const filters = ['All Projects', 'Residential', 'Commercial', 'Industrial'];

const projects = [
  { image: House1, title: 'Oakridge Residence', location: 'Trivandrum, Mangalapuram', capacity: '5 kW', date: 'June 2025' },
  { image: House2, title: 'Westfield Office Complex', location: 'Trivandrum, Kerala', capacity: '125 kW', date: 'November 2024' },
  { image: House3, title: 'Sunnyvale Solar Farm', location: 'Kerala', capacity: '2.4 MW', date: 'March 2025' },
  { image: 'https://public.readdy.ai/ai/img_res/3e1b3a48b62bdf97eb67e99d4263331d.jpg', title: 'Riverside Apartments', location: 'Austin, TX', capacity: '45 kW', date: 'February 2025' },
  { image: 'https://public.readdy.ai/ai/img_res/839f17c6041251caf04846e0739b9799.jpg', title: 'Greenwood School', location: 'Denver, CO', capacity: '35 kW', date: 'December 2024' },
  { image: 'https://public.readdy.ai/ai/img_res/3a27b9cb93685cf650e84897b729cbc5.jpg', title: 'Hillcrest Farm', location: 'Madison, WI', capacity: '22 kW', date: 'April 2025' },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
  return (
    <section id="projects" ref={sectionRef} className="section section--gray">
      <div className="container">
        <div className="section-header fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          <p className="section-label">Our Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
          <p className="section-description">Explore our portfolio of successful solar installations across various sectors and locations.</p>
        </div>
        <div className="project-filters fade-in-section opacity-0 translate-y-10 transition-all duration-1000">
          {filters.map((filter, index) => (
            <button key={index} className={`filter-btn ${index === 0 ? 'filter-btn--active' : ''}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card fade-in-section opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img src={project.image} alt={project.title} className="project-card__img" />
              <div className="project-card__overlay">
                <h3 className="project-card__title">{project.title}</h3>
                <div className="project-card__meta"><FontAwesomeIcon icon={faMapMarkerAlt} />{project.location}</div>
                <div className="project-card__meta"><FontAwesomeIcon icon={faBolt} />{project.capacity}</div>
                <div className="project-card__meta"><FontAwesomeIcon icon={faCalendarAlt} />{project.date}</div>
                <button className="btn btn--primary btn--sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <button className="btn btn--outline-blue">View All Projects</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
