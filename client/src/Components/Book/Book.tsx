import React, { useEffect, useState } from "react";
import "./book.css";
import { supabase } from "../../Admin/supabaseClient";
import Best from "../Best/Best.tsx";



interface BookItemProps {
  title: string;
  coverSrc: string;
  created_at: string;
}

const BookItem = ({ title, coverSrc }: BookItemProps) => {
  return (
    <div className="book-container">
      <div className="book-cover">
        <img src={coverSrc} alt={`${title} book cover`} />
      </div>
      <h3 className="book-title">"{title}"</h3>
    </div>
  );
};


const Book = () => {
  const [books, setBooks] = useState<BookItemProps[]>([]);
  const [latestBook, setLatestBook] = useState<BookItemProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('bookName, bookimage, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching books:", error.message);
      } else if (data) {
        const mappedBooks = data.map((book) => ({
          title: book.bookName,
          coverSrc: book.bookimage,
          created_at: book.created_at
        }));
        
        // Set the latest book (first in the array)
        if (mappedBooks.length > 0) {
          setLatestBook(mappedBooks[0]);
          // Set all other books
          setBooks(mappedBooks.slice(1));
        } else {
          setLatestBook(null);
          setBooks([]);
        }
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="books-loading">
        <div className="loading-spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <>
      {/* Show the Best component if there's a latest book */}
      {latestBook && (
        <Best 
          title={latestBook.title} 
          coverSrc={latestBook.coverSrc} 
          created_at={latestBook.created_at}
        />
      )}
      
      <section className="books-section">
        <div className="books-content">
          <div className="books-header">
            <h2 className="section-subtitle">Literary Collection</h2>
            <h1 className="section-title">Discover My Books</h1>
            {/* <p className="section-description">
              Explore my works on marketing, branding, and personal experiences 
              in internet marketing and communications.
            </p> */}
          </div>

          <div className="books-gallery">
            {books.length ? (
              books.map((book, index) => (
                <BookItem key={index} title={book.title} coverSrc={book.coverSrc} created_at={book.created_at} />
              ))
            ) : (
              <div className="no-books-found">
                <div className="no-books-icon">📚</div>
                <p>No books available at the moment</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;