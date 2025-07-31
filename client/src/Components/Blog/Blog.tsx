import React, { useState, useEffect } from 'react';
import './blog.css';
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../Admin/supabaseClient';

interface Event {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
}

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  
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

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('events')
          .select('id, created_at, title, description, image_url')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  
  return (
    <div id="blog" className="blog-container">
      <div className="blog-header">
        <h1>My Event's</h1>
        <p>Latest news, updates, and insights from the author's desk</p>
      </div>
      
      {/* Featured Slider */}
      <div className="blog-slider">
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
      
      {/* Events Section */}
      <div className="events-section">
        {/* <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px', color: '#333' }}>
          Upcoming Events
        </h2> */}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ 
              fontSize: '16px', 
              color: '#e74c3c', 
              background: '#fdf2f2', 
              padding: '15px', 
              borderRadius: '5px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#888' }}>
            <p>No events available at the moment.</p>
          </div>
        ) : (
          <>
            {/* Events Grid - 3 per row using existing blog-posts-grid styles */}
            <div className="blog-posts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', maxWidth: '1200px', margin: '0 auto' }}>
              {currentEvents.map((event) => (
                <div key={event.id} className="blog-post-card">
                  <div className="post-image">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-event-image.jpg';
                      }}
                    />
                  </div>
                  <div className="post-content">
                    <span className="post-date">
                      <Calendar size={14} style={{ marginRight: '5px' }} /> 
                      {formatDate(event.created_at)}
                    </span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {/* <a href="#" className="post-link">
                      Learn More <ArrowRight size={14} />
                    </a> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '40px',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '1px solid #ddd',
                    background: 'white',
                    borderRadius: '5px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.borderColor = '#3498db';
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '1px solid #ddd',
                        background: currentPage === page ? '#3498db' : 'white',
                        color: currentPage === page ? 'white' : '#333',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        borderColor: currentPage === page ? '#3498db' : '#ddd'
                      }}
                      onMouseOver={(e) => {
                        if (currentPage !== page) {
                          e.currentTarget.style.borderColor = '#3498db';
                          e.currentTarget.style.background = '#f8f9fa';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (currentPage !== page) {
                          e.currentTarget.style.borderColor = '#ddd';
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '1px solid #ddd',
                    background: 'white',
                    borderRadius: '5px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.borderColor = '#3498db';
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
                
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  marginLeft: '15px'
                }}>
                  Page {currentPage} of {totalPages} ({events.length} total events)
                </span>
              </div>
            )}
          </>
        )}
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