import React from 'react';
import './best.css';

interface BestProps {
  title: string;
  coverSrc: string;
  created_at: string;
}

const Best: React.FC<BestProps> = ({ title, coverSrc, created_at }) => {
  // Format the release date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="book-hero">
      <div className="book-container">
        <div className="book-content">
          <div className="book-text">
            <h2 className="badge">New Release</h2>
            <h1 className="title">"{title}"</h1>
            <h3 className="subtitle">A Guide to Personal Branding</h3>
            <p className="description">
              Everyone has a brand — knowingly or not. Why leave it to chance when you can shape it deliberately?
              <br /><br />
              <strong>{title}</strong> teaches you to take charge of your identity and visibility in a hyper-connected world.
              From social media to the workplace, master the art of presenting your best self.
            </p>

            <div className="action-row">
              <div className="release">
                <small>Released on </small>
                <span>{formatDate(created_at)}</span>
              </div>
              <button className="cta-button">
                Get Your Copy
              </button>
            </div>
          </div>

          <div className="book-image-wrapper">
            <img
              src={coverSrc}
              alt={`${title} Book Cover`}
              className="book-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Best;