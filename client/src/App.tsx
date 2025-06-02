import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Your existing components
import Header from './Components/Header/Header.jsx';
import Land from './Components/Land/Land.tsx';
import About from './Components/About/About.tsx';
import Book from './Components/Book/Book.tsx';
import Best from './Components/Best/Best.tsx';
import Opinions from './Components/Opinions/Opinions.tsx';
import Blog from './Components/Blog/Blog.tsx';
import FormPage from './Pages/Contact/FormPage.tsx';
import Footer from './Components/Footer/Footer.tsx';

// Admin components
import Login from './Admin/Components/AdminLogin/Login.tsx';
import Home from './Admin/Pages/Home.tsx';

// Auth system components
import { AuthProvider } from '../../client/src/Admin/Context/AuthContext.tsx';
import ProtectedRoute from '../src/Admin/Components/ProtectedRoute.tsx';
import PublicRoute from '../src/Admin/Components/PublicRoute.tsx';

// MainLayout component for the homepage
const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '50px' }}>
        <div id="home">
          <Land />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="books">
          <Book />
          <Best />
        </div>
        <div>
          <Opinions />
        </div>
        <div id="blog">
          <Blog />
        </div>
        <div id="contact">
          <FormPage />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          {/* Public route for admin login - only accessible when NOT logged in */}
          <Route 
            path="/authoradminlogin" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Protected route for admin home - only accessible when logged in */}
          <Route 
            path='/authoradminhome' 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          {/* Route for the main homepage - always accessible */}
          <Route path="/" element={<MainLayout />} />

          {/* Redirect any other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* ToastContainer should be outside Routes so it's available globally */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
};

export default App;