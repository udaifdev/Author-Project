import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Linkedin, Menu, X, Youtube } from 'lucide-react';

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
            <style jsx>{`
                /* Header Container */
                .header-containers {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                     backdrop-filter: blur(100px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
                    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
                    width: 100%;
                    overflow: visible;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    width: 100%;
                    box-sizing: border-box;
                }

                /* Navigation Bar */
                .navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 80px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 100%;
                    min-height: 60px;
                }

                /* Brand/Logo */
                .brand {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    flex-shrink: 0;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                }

                .brand img {
                    height: 70px;
                    width: auto;
                    object-fit: contain;
                }

                /* Desktop Navigation Links */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    flex-grow: 1;
                    justify-content: center;
                }

                .nav-link {
                    color: #2c3e50;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 600;
                    letter-spacing: 0.8px;
                    padding: 12px 0;
                    position: relative;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #3498db;
                    transition: width 0.3s ease;
                }

                .nav-link:hover {
                    color: #3498db;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                /* Social Media Links */
                .social-links {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-shrink: 0;
                }

                .social-link {
                    color: #666;
                    text-decoration: none;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .social-link:hover {
                    transform: translateY(-2px) scale(1.1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .social-link.instagram:hover {
                    color: #e1306c;
                }

                .social-link.facebook:hover {
                    color: #4267B2;
                }

                .social-link.Youtube:hover {
                    color: #1DA1F2;
                }

                .social-link.linkedin:hover {
                    color: #0077b5;
                }

                /* Mobile Menu Button */
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #4a4a4a;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .mobile-menu-btn:hover {
                    color: #3498db;
                    background-color: rgba(52, 152, 219, 0.1);
                }

                /* Mobile Menu */
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: white;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    z-index: 999;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                    max-height: calc(100vh - 80px);
                    overflow-y: auto;
                }

                .mobile-menu.open {
                    display: block;
                    opacity: 1;
                    transform: translateY(0);
                }

                .mobile-nav-links {
                    padding: 20px;
                }

                .mobile-nav-link {
                    display: block;
                    color: #2c3e50;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 600;
                    padding: 16px 20px;
                    margin: 4px 0;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                }

                .mobile-nav-link:hover {
                    color: #3498db;
                    background-color: rgba(52, 152, 219, 0.08);
                }

                /* Mobile Social Links */
                .mobile-social-links {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    padding: 20px;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    margin-top: 10px;
                }

                .mobile-social-link {
                    color: #666;
                    text-decoration: none;
                    padding: 12px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-social-link:hover {
                    transform: scale(1.1);
                }

                .mobile-social-link.instagram:hover {
                    color: #e1306c;
                }

                .mobile-social-link.facebook:hover {
                    color: #4267B2;
                }

                .mobile-social-link.Youtube:hover {
                    color: #1DA1F2;
                }

                .mobile-social-link.linkedin:hover {
                    color: #0077b5;
                }

                /* Mobile Overlay */
                .mobile-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.3);
                    z-index: 998;
                }

                /* Responsive Design */
                
                /* Large tablets and small desktops */
                @media screen and (max-width: 1024px) {
                    .nav-links {
                        gap: 24px;
                    }
                    
                    .nav-link {
                        font-size: 16px;
                    }
                }

                /* Tablets */
                @media screen and (max-width: 768px) {
                    .container {
                        padding: 0 16px;
                    }
                    
                    .navbar {
                        height: 64px;
                        min-height: 64px;
                    }
                    
                    .nav-links {
                        display: none;
                    }
                    
                    .social-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .brand {
                        font-size: 20px;
                    }
                }

                /* Small mobile screens */
                @media screen and (max-width: 480px) {
                    .container {
                        padding: 0 12px;
                    }
                    
                    .navbar {
                        height: 56px;
                        min-height: 56px;
                    }
                    
                      .brand {
                        font-size: 20px;
                    }

                    .brand img {
                        height: 50px;
                    }
                    .mobile-nav-link {
                        font-size: 16px;
                        padding: 14px 16px;
                    }
                    
                    .mobile-social-links {
                        gap: 16px;
                        padding: 16px;
                    }
                    
                    .mobile-menu {
                        max-height: calc(100vh - 56px);
                    }
                }

                /* Extra small screens */
                @media screen and (max-width: 360px) {
                    .container {
                        padding: 0 8px;
                    }
                    
                    .navbar {
                        height: 50px;
                        min-height: 50px;
                    }
                    
                  .brand {
                        font-size: 18px;
                    }

                    .brand img {
                        height: 35px;
                    }

                    .mobile-nav-link {
                        font-size: 14px;
                        padding: 12px 14px;
                    }
                    
                    .mobile-social-links {
                        gap: 12px;
                        padding: 12px;
                    }
                    
                    .mobile-menu {
                        max-height: calc(100vh - 50px);
                    }
                }

                /* Prevent horizontal scrolling */
                * {
                    box-sizing: border-box;
                }

                body {
                    overflow-x: hidden;
                }

                /* Animation for mobile menu */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .mobile-menu.open {
                    animation: slideDown 0.3s ease forwards;
                }
            `}</style>

            <header className="header-containers">
                <div className="container">
                    <nav className="navbar">
                        {/* Logo/Brand Section */}
                        <div className="brand">
                            <img src="/arjun logo.PNG" alt="logo" />
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