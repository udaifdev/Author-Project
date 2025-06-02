import React, { useState } from 'react';
import Form from '../../Components/Form/Form.tsx';
import './FormPage.css'; // Add this for styling
import Contact from '../../Components/Contact/Contact.tsx';


const FormPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log('Modal opened, isModalOpen:', true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        console.log('Modal closed, isModalOpen:', false);
    };
  
    return (
        <div className="form-page-container">
            <div className="contact-section">
                <h2>Get in Touch</h2>
                <p>Have questions or feedback? I'd love to hear from you!</p>
                <button 
                    className="contact-button" 
                    onClick={openModal}
                >
                    Contact Me
                </button>
            </div>
            
            <Form   
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />

            <Contact/>
        </div>
    );
};

export default FormPage;