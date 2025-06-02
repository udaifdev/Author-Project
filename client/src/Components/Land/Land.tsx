import React from 'react';
import './land.css';

const Land  = () => {
  return (
    <div className="author-website">
      <div className="background-accent"></div>
      
      <div className="content-container">
        <div className="text-content">
          <p className="hello-text">Hello, i'm</p>

          <h1 className="author-name">Arjun Maurya</h1>
          
          <p className="description">
            Welcome to my website. Here you'll find information 
            about all my books and links to all my social media.
          </p>
          
          <div className="button-container">
            <button className="btn about-btn">About Me</button>
            <button className="btn books-btn">Buy Books</button>
          </div>
        </div>
        
        <div className="image-container">
          <img 
            src="/writing image.JPG"
            alt="Author reading and taking notes with stacks of books" 
            className="author-image"
            style={{ filter: "grayscale(90%) contrast(90%)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Land;