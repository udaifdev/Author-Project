import React, { useState, useEffect } from 'react';
import './blog.css';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../Admin/supabaseClient';

interface Event {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
}

const Blog = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

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
      
      {/* Events Section */}
      <div className="events-section">
        {loading ? (
          <div className="loading-message">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="no-events-message">
            <p>No events available at the moment.</p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="blog-posts-grid">
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
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="pagination-button"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={currentPage === page ? "pagination-button active" : "pagination-button"}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
                
                <span className="pagination-info">
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