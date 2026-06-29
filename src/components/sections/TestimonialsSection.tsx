import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

interface TestimonialsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const testimonials = [
  { quote: "Power Vision transformed our home with a seamless solar installation. We're saving significantly on energy bills. The team was professional and made the entire process stress-free.", name: 'Jennifer Anderson', title: 'Homeowner', image: 'https://public.readdy.ai/ai/img_res/ccd731270f698a1778af30aaf120eb15.jpg' },
  { quote: "As a business owner, Power Vision provided clear ROI projections that made the decision easy. The installation was completed ahead of schedule and has outperformed our expectations.", name: 'Michael Rodriguez', title: 'Business Owner', image: 'https://public.readdy.ai/ai/img_res/13f0b07cd25239c7dd778c7483261794.jpg' },
  { quote: "We chose Power Vision for our sustainability initiative and they delivered exceptional results. Minimal disruption and great ongoing support throughout.", name: 'Sarah Thompson', title: 'School Administrator', image: 'https://public.readdy.ai/ai/img_res/f878b4053f9fc80128cbe9d7af1f13b4.jpg' },
];

const videos = [
  { thumbnail: 'https://public.readdy.ai/ai/img_res/ef4f80b85ca7e79192fc129c56ce2ff6.jpg', title: 'How Solar Reduced Our Bills by 70%', client: 'The Johnson Family' },
  { thumbnail: 'https://public.readdy.ai/ai/img_res/97b60fea6021e03c01d4f1792849915a.jpg', title: 'Solar for Business: 1-Year Review', client: 'Westside Retail Center' },
  { thumbnail: 'https://public.readdy.ai/ai/img_res/ff187936695919740a9fcfbde9ba15a9.jpg', title: 'Our Solar Installation Journey', client: 'The Martinez Family' },
  { thumbnail: 'https://public.readdy.ai/ai/img_res/8efa515830926a6d058623e61b1a6419.jpg', title: 'Powering Our Farm with Solar', client: 'Greenfield Organic Farm' },
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ sectionRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[activeIndex];

  return (
    <section id="feedback" ref={sectionRef} className="section section--white">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="section-divider" />
        </div>
        <div className="testimonials-layout">
          {/* Custom slider */}
          <div className="testimonial-slider">
            <div className="testimonial-card">
              <FontAwesomeIcon icon={faQuoteLeft} className="testimonial-card__quote-icon" />
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <img src={t.image} alt={t.name} className="testimonial-card__avatar" />
                <div>
                  <h4 className="testimonial-card__name">{t.name}</h4>
                  <p className="testimonial-card__role">{t.title}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-controls">
              <button onClick={prev} className="testimonial-nav-btn" aria-label="Previous">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)} className={`testimonial-dot${i === activeIndex ? ' testimonial-dot--active' : ''}`} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="testimonial-nav-btn" aria-label="Next">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          {/* Video grid */}
          <div>
            <div className="videos-grid">
              {videos.map((video, index) => (
                <div key={index} className="video-card">
                  <img src={video.thumbnail} alt={video.title} className="video-card__thumbnail" />
                  <div className="video-card__play-overlay">
                    <div className="video-card__play-btn">
                      <FontAwesomeIcon icon={faPlay} className="text-blue-600 text-sm ml-1" />
                    </div>
                  </div>
                  <div className="video-card__info">
                    <h4 className="video-card__title">{video.title}</h4>
                    <p className="video-card__client">{video.client}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="videos-more">
              <a href="https://www.youtube.com/channel/example" target="_blank" rel="noopener noreferrer" className="youtube-link">
                View More on YouTube <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
