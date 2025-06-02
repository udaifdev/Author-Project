import React, { useEffect, useState } from "react";
import "./book.css";
import { supabase } from "../../Admin/supabaseClient";

interface BookItemProps {
    title: string;
    coverSrc: string;
}

interface BookItemProps {
    title: string;
    coverSrc: string;
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('books')
                .select('bookName, bookimage')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching books:", error.message);
            } else if (data) {
                // Map your fetched data to the props needed by BookItem
                const mappedBooks = data.map((book) => ({
                    title: book.bookName,
                    coverSrc: book.bookimage, // should be full public URL
                }));
                setBooks(mappedBooks);
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    return (
        <section className="books-section">
            <div className="books-content">
                <div className="books-header">
                    <h2 className="section-subtitle">Books</h2>
                    <h1 className="section-title">Meet All My Books</h1>

                    <p className="section-description">
                        I write about marketing, branding, and personal experience in
                        internet marketing and communications.
                    </p>
                </div>

                <div className="books-info">
                    <p>
                        You can find my books in the most popular bookstores in the USA, both
                        offline and online. For example, you can buy them on Amazon, in Barnes &
                        Noble, or by contacting me if you want the book to be signed.
                    </p>

                    <p className="discount-note">* Get 10% discount when you buy 3 books</p>
                </div>

                <div className="books-gallery">
                    {books.length ? (
                        books.map((book, index) => (
                            <BookItem key={index} title={book.title} coverSrc={book.coverSrc} />
                        ))
                    ) : (
                        <p>No books found</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Book;