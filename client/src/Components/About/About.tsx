import React from 'react';
import './about.css';

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
            Kannada Poet, Writer & Educator from Ammathi, Kodagu District, Karnataka
          </h2>

          <div className="bio-content">
            <p className="bio-paragraph">
              Arjun Maurya is a well-known Kannada poet and writer, hailing from <span className="highlight">Ammathi village</span> in the Kodagu district of Karnataka. A passionate literary figure, he holds two postgraduate degrees: <span className="highlight">M.A. in Kannada</span> and <span className="highlight">M.Ed.</span>, along with qualification in <span className="highlight">UGC-NET</span>. He currently serves as a <span className="highlight">Professor of Kannada</span> at St. Anne’s Degree College, Virajpet, affiliated with Mangalore University.
            </p>

            {/* <p className="bio-paragraph">
              Poetry is his foremost passion, but his literary contributions span across various genres, including novels and short stories. He has published <span className="highlight">nine books</span> to date—comprising four collections of poetry, three novels, and two collections of short stories. Recognized as a prominent <span className="highlight">Dalit voice</span> in contemporary Kannada literature, he has carved a unique niche for himself with his empirical imagery expressed in a mellow tone.
            </p> */}

            <p className="bio-paragraph">
              Beyond writing, Arjun Maurya is deeply involved in education, culture, cinema, and social service. Under the banner of the <span className="highlight">JEGA Foundation</span>, he actively engages in community-oriented initiatives and has organized <span className="highlight">13 service camps</span>, including four special camps for tribal communities, as part of the National Service Scheme in Kodagu.
            </p>

            <p className="bio-paragraph">
              His prolific literary output includes over <span className="highlight">165 short stories, 120 articles, and 258 poems</span>, all of which have been published in various journals and platforms. He has also written and directed short films, further expanding his creative reach.
            </p>

            <p className="bio-paragraph">
              He has represented Kannada literature at numerous national and international conferences, where he has presented scholarly papers.
            </p>

            <div className="awards-section">
              <h3 className="awards-title">Awards and Honors:</h3>
              <div className="award-item">Author of the Year – 2022, awarded by StoryMirror Digital Literature Publication (National Award)</div>
              <div className="award-item">Indian Iconic Author – 2025, awarded by Pride India Awards, presented on 14th June 2025 in Hyderabad</div>
              <div className="award-item">Bharathiya Sahithya Rathna – 2025, awarded by Anweshane Sanskruthika Academy, Bengaluru on 20th June 2025</div>
              <div className="award-item">Sahithya Award – 2025, conferred by StoryMirror on 21st June 2025</div>
            </div>

            <p className="bio-paragraph">
              Arjun Maurya continues to be a significant and inspiring literary and cultural voice in Karnataka and beyond.
            </p>
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
