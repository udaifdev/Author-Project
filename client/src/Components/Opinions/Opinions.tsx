import React, { useState, useEffect, useRef } from 'react';
import './Opinions.css';

interface Review {
  content: string;
  author?: string;
  title?: string;
  imageUrl?: string;
}

const Opinions = () => {
  const reviews: Review[] = [
    {
      content: "The writer's captivating series of stories draws readers into an imaginative world. Each narrative offers a unique experience, building suspense and anticipation for what's to come. As readers, we eagerly look forward to more of your publications, as they inspire a love for reading, especially among young readers like us.",
      author: "Malini",
      title: "Asst Professor",
      imageUrl: "/malini.jpeg"
    },
    {
      content: "Poet Arjun Maurya, in most of his works, sheds light on the lives of the oppressed. His poem \"Kavara\" offers a powerful and symbolic portrayal—depicting caste as something worn like skin from birth to death, serving as a striking metaphor representing continuous struggle and identity.",
      author: "Mudnakudu Chinnaswami",
      title: "International famous author",
      imageUrl: "/chinnaswami.jpeg"
    },
    {
      content: "In Arjun Maurya's poetic style, the distinct feature is that instead of immersing in the beauty of language, it is the power of voice that stands out prominently.",
      author: "Santhosh Gopal",
      title: "Film Director",
      imageUrl: "/santhosh.jpeg"
    },
    {
      content: "In Kannada literature, Dalit protest literature, which has been powerful since the 1970s, continues to retain its voice even in this era. Poets like Arjun Maurya stand as examples of this. In many of his poems, we can see a strong voice concerning the oppressed.",
      author: "Dr. Shivakumar",
      title: "Writer, Social thinker",
      imageUrl: "/shiva.jpeg"
    },
    {
      content: "Arjun maurya is a poet and writer whose works courageously explores the deep and painful realities of oppressed class. Through sharp symbolism and evocative writing, his works offers not only a critique of systematic oppression but also a celebration of resilience and identity. His themes are often rooted in lived experience, giving voice to marginalized communities and challenging societal norms with unflinching honesty",
      author: "Mr. James Antony",
      title: "English Professor",
      imageUrl: "/jems.jpeg"
    },
     
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to move to the next slide
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % reviews.length;
    
    // Move slider to the left (which appears as coming from right)
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.8s ease-in-out';
      sliderRef.current.style.transform = `translateX(-${(nextIndex) * 100}%)`;
    }
    
    setCurrentIndex(nextIndex);
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Click handler for indicator dots
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.8s ease-in-out';
      sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
    
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <section className="opinions-section">
      <div className="opinions-container">
        <h2 className="opinions-title">What People Say</h2>
        
        <div className="opinions-slider-container">
          <div 
            className="opinions-slider" 
            ref={sliderRef} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="opinion-card">
                <div className="opinion-content">
                  <div className="quote-icon">❝</div>
                  <p className="opinion-text">{review.content}</p>
                  <div className="quote-icon closing-quote">❞</div>
                </div>
                
                <div className="opinion-footer">
                  <div className="opinion-image-container">
                    <img 
                      src={review.imageUrl} 
                      alt={review.author || "Reviewer"} 
                      className="opinion-image"
                    />
                  </div>
                  <div className="opinion-author-info">
                    {review.author && <h4 className="author-name">{review.author}</h4>}
                    {review.title && <p className="author-title">{review.title}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="opinions-indicators">
          {reviews.map((_, index) => (
            <button 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to opinion ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="opinions-navigation">
          <button 
            className="nav-button prev"
            onClick={() => goToSlide((currentIndex - 1 + reviews.length) % reviews.length)}
            aria-label="Previous opinion"
          >
            &#10094;
          </button>
          <button 
            className="nav-button next"
            onClick={() => goToSlide((currentIndex + 1) % reviews.length)}
            aria-label="Next opinion"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Opinions;