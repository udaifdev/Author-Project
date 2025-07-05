import React, { useState } from 'react';
import { BookOpen, Plus, Search, X, Eye, Edit, Trash2, Upload, Package, ChevronLeft, ChevronRight, Calendar, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../Context/AuthContext.tsx';
import './AdminHome.css';

const AdminHome = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [newBook, setNewBook] = useState({ name: '', image: null, imagePreview: '' });
  const [newEvent, setNewEvent] = useState({ title: '', description: '', image: null, imagePreview: '' });

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const stats = [
    { title: 'Total Books', value: '2,847', change: '+12%', icon: BookOpen, color: 'blue' },
    { title: 'In Stock', value: '2,156', change: '+8%', icon: Package, color: 'green' }
  ];

   



  const [books, setBooks] = useState([]);
  console.log('set books ----->  ', books)

  const [loadingBooks, setLoadingBooks] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Fetch books on mount
  React.useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false }); // Optional: newest first

      if (error) {
        console.error('Error fetching books:---------', error.message);
        toast.error('Failed to fetch books');
      } else if (data && data.length) {
        console.log('Fetched books:---------', data);
      } else {
        console.log('No books found or data is empty');
      }

      if (error) {
        console.error('Error fetching books:---------', error.message);
      } else {
        setBooks(data);
      }
      setLoadingBooks(false);
    };

    fetchBooks();
  }, []);



  const handleAddBook = async () => {
    if (!newBook.name || !newBook.image) {
      toast.error("Please provide book name and image.");
      return;
    }
    try {
      // Show loading toast
      const loadingToast = toast.loading("Adding book...");

      // Upload image to Supabase Storage
      const filePath = `public/${Date.now()}_${newBook.image.name}`;
      const { data: storageData, error: uploadError } = await supabase
        .storage
        .from('bookimage') // bucket name in Supabase Storage
        .upload(filePath, newBook.image);

      console.log('data -----> ', { data: storageData, error: uploadError })

      if (uploadError) throw uploadError;

      // Get the public URL of the image
      const { data: publicUrlData } = supabase
        .storage
        .from('bookimage')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      console.log('-----> ', imageUrl)

      // Save book name and image URL to the database
      const { error: insertError } = await supabase
        .from('books') // your table name
        .insert([
          { bookName: newBook.name, bookimage: imageUrl, created_at: new Date().toISOString() }
        ]);

      if (insertError) throw insertError;

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Book added successfully!');

      setShowAddBookModal(false);
      setNewBook({ name: '', image: null, imagePreview: '' });

      // Refetch books after insert
      const { data: updatedBooks } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      setBooks(updatedBooks);

    } catch (error) {
      console.error('Error adding book:', error.message);
      toast.error('Failed to add book. Please try again.');
    }
  };

  const filteredBooks = books.filter(book =>
    (book.bookName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="admin-container">
      <div className="admin-content">
        {/* Stats Cards */}
        {/* <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className="stat-change">{stat.change}</span>
              </div>
            </div>
          ))}
        </div> */}

        {/* Header Actions */}
        <div className="page-header">
          <h1>Arjun Book Management</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddBookModal(true)}
          >
            <Plus size={16} />
            Add New Book
          </button>
         
        </div>


        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {currentBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.bookimage} alt={book.bookName} />
                <div className="book-overlay">
                  <button className="btn-icon" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="btn-icon" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="btn-icon danger" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="book-info">
                <h4 className="book-name">{book.bookName}</h4>
                {/* <div className="book-price">${book.price}</div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-btn"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div className="page-header">
          <button className="btn btn-red" onClick={handleLogout} >
            <LogOut size={16} />
            Log Out
          </button>
        </div>

      </div>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div className="modal-overlay" onClick={() => setShowAddBookModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Book</h3>
              <button
                className="btn-icon"
                onClick={() => setShowAddBookModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Book Image</label>
                <div className="image-upload">
                  {newBook.imagePreview ? (
                    <div className="image-preview">
                      <img src={newBook.imagePreview} alt="Preview" />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => setNewBook(prev => ({ ...prev, image: null, imagePreview: '' }))}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="upload-area">
                      <Upload size={24} />
                      <span>Upload Book Cover</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Book Name</label>
                <input
                  type="text"
                  value={newBook.name}
                  onChange={(e) => setNewBook(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter book name"
                />
              </div>

              {/* <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newBook.price}
                  onChange={(e) => setNewBook(prev => ({...prev, price: e.target.value}))}
                  placeholder="0.00"
                />
              </div> */}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddBookModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddBook}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default AdminHome;