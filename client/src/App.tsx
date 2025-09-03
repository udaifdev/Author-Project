import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Your existing components
import Header from './Components/Header/Header.jsx';
import Land from './Components/Land/Land.tsx';
import About from './Components/About/About.tsx';
import Book from './Components/Book/Book.tsx';
// import Best from './Components/Best/Best.tsx';
import Opinions from './Components/Opinions/Opinions.tsx';
import Blog from './Components/Blog/Blog.tsx';
import FormPage from './Pages/Contact/FormPage.tsx';
import Footer from './Components/Footer/Footer.tsx';

// Admin components
import Login from './Admin/Components/AdminLogin/Login.tsx';
import Home from './Admin/Pages/Home.tsx';
import Event from './Admin/Components/AdminEvent/Event.jsx';

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

// Admin Layout component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Admin header would go here if you have one */}
      {children}
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/authoradmin');

  return (
    <AuthProvider>
      <div>
        <Routes>
          {/* Public route for admin login */}
          <Route 
            path="/authoradminlogin" 
            element={
              <PublicRoute>
                <AdminLayout>
                  <Login />
                </AdminLayout>
              </PublicRoute>
            } 
          />
          
          {/* Protected route for admin home */}
          <Route 
            path='/authoradminhome' 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Home />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />

          {/* Protected route for admin events */}
          <Route 
            path='/authoradminevents' 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Event />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Route for the main homepage */}
          <Route path="/" element={<MainLayout />} />

          {/* Redirect any other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
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