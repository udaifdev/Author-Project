import React from 'react';
import './about.css'

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div className="about-container">
      

      <div className="decorative-element"></div>

      <div className="main-content">
        <div className="image-section">
          <div className="image-wrapper">
            <img
              src="/about arjun.JPG"
              alt="Arjun Maurya - Kannada Poet and Writer"
              className="profile-image"
            />
            <div className="image-accent"></div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-tag">About Me</div>
          
          <h1 className="main-title">
            Arjun Maurya
          </h1>
          
          <h2 className="subtitle">
            Renowned Kannada Poet, Writer & Educator from Kodagu District, Karnataka
          </h2>

          <div className="bio-content">
            <p className="bio-paragraph">
              A <span className="highlight">Professor of Kannada</span> at St. Anne's Degree College, Virajpet (affiliated with Mangalore University), he holds postgraduate degrees in Kannada (M.A.) and Education (M.Ed.), along with UGC NET certification. He is a published author with <span className="highlight">nine books</span> to his credit—four poetry collections, three novels, and two short story collections—demonstrating his versatility across genres.
            </p>
            
            <p className="bio-paragraph">
              His interests span literature, education, cinema, culture, and social work. A recognized <span className="highlight">Dalit voice</span>, he has presented research at national and international Kannada conferences. With over <span className="highlight">165 stories, 120 articles, and 258 poems</span> (many published), he has also written and directed short films.
            </p>
            
            <p className="bio-paragraph">
              He is the founder of the <span className="highlight">JEGA Foundation</span>, through which he has led 13 service camps, including four for tribal communities under the National Service Scheme in Kodagu, showcasing his commitment to social service and community development.
            </p>

            <div className="awards-section">
              <h3 className="awards-title">Recent Achievements</h3>
              <div className="award-item">2022: National "Author of the Year" award from StoryMirror</div>
              <div className="award-item">2025: "Sahithya Award" (All India 4th Rank) from StoryMirror</div>
              <div className="award-item">2025: "Anweshana Sadhaka Rathna" National Award from Anweshana Academy</div>
            </div>
          </div>

          <a href="/books" className="cta-button">
            Explore My Latest Work
            <span className="arrow-icon">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;