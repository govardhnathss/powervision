import React from 'react';

const stats = [
  { number: '500+', label: 'Solar Installations' },
  { number: '10+', label: 'Years of Experience' },
  { number: '1,000+', label: 'Happy Clients' },
  { number: '5 MW+', label: 'Total Capacity Installed' },
];

const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
