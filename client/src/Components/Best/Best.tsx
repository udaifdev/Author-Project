import React from 'react';
import './best.css';

const Best = () => {
  return (
    <section className="book-hero">
      <div className="book-container">
        <div className="book-content">
          <div className="book-text">
            <h2 className="badge">New Release</h2>
            <h1 className="title">"Walk Proud"</h1>
            <h3 className="subtitle">A Guide to Personal Branding</h3>
            <p className="description">
              Everyone has a brand — knowingly or not. Why leave it to chance when you can shape it deliberately?
              <br /><br />
              <strong>Walk Proud</strong> teaches you to take charge of your identity and visibility in a hyper-connected world.
              From social media to the workplace, master the art of presenting your best self.
            </p>

            <div className="action-row">
              <div className="release">
                <small>Released on </small>
                <span> May 20, 2024</span>
              </div>
              <button className="cta-button">
                Get Your Copy
              </button>
            </div>
          </div>

          <div className="book-image-wrapper">
            <img
              src="/book 5.jpeg"
              alt="Walk Proud Book Cover"
              className="book-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Best;
