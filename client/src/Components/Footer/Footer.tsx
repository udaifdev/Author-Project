import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-name">Arjun Maurya</h2>
          <p className="footer-tagline">Author of best-selling marketing books.</p>
        </div>
        
        <nav className="footer-nav">
           
        </nav>
        
        <div className="footer-right">
          <p className="footer-copyright">© Created by MUHAMMAD UDAIF | All rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;