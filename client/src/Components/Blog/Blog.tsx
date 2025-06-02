import React, { useState, useEffect } from 'react';
import './blog.css';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const blogSlides = [
    {
      id: 1,
      image: 'https://i0.wp.com/problogger.com/wp-content/uploads/2008/05/successful-blogging.jpg?resize=540%2C550&ssl=1',
      title: 'Authors Workshop at National Book Festival',
      date: 'March 15, 2025',
      readTime: '5 min read',
      author: 'Admin'
    },
    {
      id: 2,
      image: 'https://i0.wp.com/themes.svn.wordpress.org/author-personal-blog/3.2.19/screenshot.png?w=post-thumbnail&strip=all',
      title: 'New Book Release: "The Hidden Chapter"',
      date: 'April 2, 2025',
      readTime: '4 min read',
      author: 'Jane Smith'
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncQ7IUAScXJWT7SJsIgIwRb2RCRTH1Qhqgg&s',
      title: 'Literary Award Nomination Announcement',
      date: 'February 28, 2025',
      readTime: '3 min read',
      author: 'John Doe'
    }
  ];
  
  const blogPosts = [
    {
      id: 1,
      image: 'https://i.ytimg.com/vi/Qf6fSqGjyAw/maxresdefault.jpg',
      title: 'Behind the Scenes: The Writing Process',
      excerpt: 'Discover the creative process behind my latest novel. From research to final draft, I share my journey...',
      date: 'March 1, 2025',
      category: 'Writing'
    },
    {
      id: 2,
      image: 'https://ps.w.org/starbox/assets/banner-772x250.png?rev=3090984',
      title: 'Reader Q&A: Your Top 10 Questions Answered',
      excerpt: 'I recently asked my readers to submit their burning questions about my books, characters, and writing routine...',
      date: 'February 20, 2025',
      category: 'Q&A'
    },
    {
      id: 3,
      image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/187221060/original/e5cf5fb5d06285d20ab18dacd62c14565d0f9067/lets-solve-your-bugs.jpg',
      title: 'Book Club Discussion Guide: Chapter Insights',
      excerpt: 'For book clubs reading my latest novel, here are some thought-provoking questions and themes to explore...',
      date: 'February 15, 2025',
      category: 'Book Club'
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFggVX8k24GSbwtIxPHR2VeYqp6RMZs-KpQ&s',
      title: 'Upcoming Book Tour: Cities and Dates',
      excerpt: `I'm excited to announce my upcoming book tour! Check the schedule to see if I'll be visiting your city...`,
      date: 'February 10, 2025',
      category: 'Events'
    },
    {
      id: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncQ7IUAScXJWT7SJsIgIwRb2RCRTH1Qhqgg&s',
      title: 'Creating Compelling Characters: A Writer\'s Guide',
      excerpt: 'Learn my approach to creating memorable characters that readers will connect with emotionally...',
      date: 'January 25, 2025',
      category: 'Writing'
    },
    {
      id: 6,
      image: 'https://i0.wp.com/problogger.com/wp-content/uploads/2008/05/successful-blogging.jpg?resize=540%2C550&ssl=1',
      title: 'Five Books That Influenced My Writing Style',
      excerpt: 'Discover the literary works that shaped my approach to storytelling and character development...',
      date: 'January 15, 2025',
      category: 'Book Reviews'
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % blogSlides.length );
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [blogSlides.length]);
  
  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div id="blog" className="blog-container">
      <div className="blog-header">
        <h1>My Event's</h1>
        <p>Latest news, updates, and insights from the author's desk</p>
      </div>
      
      {/* Featured Slider - Smaller Size */}
      <div className="blog-slider">
        {/* <div 
          className="slides-container" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {blogSlides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="slide-image">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <div className="slide-meta">
                  <span><Calendar size={14} /> {slide.date}</span>
                  <span><Clock size={14} /> {slide.readTime}</span>
                  <span><User size={14} /> {slide.author}</span>
                </div>
                <button className="read-more-btn">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div> */}
        
        <div className="slider-dots">
          {blogSlides.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Blog Posts Grid - Categories section removed */}
      <div className="blog-posts-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post-card">
            <div className="post-image">
              <img src={post.image} alt={post.title} />
              {/* <span className="post-category">{post.category}</span> */}
            </div>
            <div className="post-content">
              <span className="post-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              {/* <a href="#" className="post-link">
                Continue Reading <ArrowRight size={14} />
              </a> */}
            </div>
          </div>
        ))}
      </div>
      
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with the latest blog posts, book releases, and events.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;