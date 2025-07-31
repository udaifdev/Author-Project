import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Linkedin, Menu, X, Youtube } from 'lucide-react';
import './header.css'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = 80;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after navigation
            setIsMobileMenuOpen(false);
        }
    };

    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();
        scrollToSection(sectionId);
    };

    return (
        <>
           

            <header className="header-containers">
                <div className="container">
                    <nav className="navbar">
                        {/* Logo/Brand Section */}
                        <div className="brand">
                            <img src="/arjundelogo.jpeg" alt="logo" />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="nav-links">
                            <a
                                href="#about"
                                onClick={(e) => handleLinkClick(e, 'about')}
                                className="nav-link"
                            >
                                About
                            </a>
                            <a
                                href="#books"
                                onClick={(e) => handleLinkClick(e, 'books')}
                                className="nav-link"
                            >
                                Books
                            </a>
                            <a
                                href="#blog"
                                onClick={(e) => handleLinkClick(e, 'blog')}
                                className="nav-link"
                            >
                                Events
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, 'contact')}
                                className="nav-link"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Social Media Links - Desktop */}
                        <div className="social-links">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link instagram"
                                aria-label="Instagram"
                            >
                                <Instagram size={22} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link facebook"
                                aria-label="Facebook"
                            >
                                <Facebook size={22} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link twitter"
                                aria-label="Twitter"
                            >
                                <Youtube size={22} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link linkedin"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={22} />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="mobile-menu-btn"
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                        <div className="mobile-nav-links">
                            <a
                                href="#about"
                                onClick={(e) => handleLinkClick(e, 'about')}
                                className="mobile-nav-link"
                            >
                                About
                            </a>
                            <a
                                href="#books"
                                onClick={(e) => handleLinkClick(e, 'books')}
                                className="mobile-nav-link"
                            >
                                Books
                            </a>
                            <a
                                href="#blog"
                                onClick={(e) => handleLinkClick(e, 'blog')}
                                className="mobile-nav-link"
                            >
                                Events
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, 'contact')}
                                className="mobile-nav-link"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Mobile Social Media Links */}
                        <div className="mobile-social-links">
                            <a
                                href="https://www.instagram.com/arjunmaurya_author?igsh=am1oYmg1NnZucWlr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-link instagram"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-link facebook"
                                aria-label="Facebook"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://youtube.com/@jegamedia?si=4NF1GmJrdgPKYg_f"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-link twitter"
                                aria-label="Twitter"
                            >
                                <Youtube size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/arjun-maurya-725b1b327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-link linkedin"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="mobile-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </header>

            {/* Demo content to show scrolling behavior */}

        </>
    );
};

export default Header;