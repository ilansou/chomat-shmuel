import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFax, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Newsletter from "../components/newsletter";
import "../styles/contact.css";

export const Contact = () => {
    return (
        <div className="contact-container">
            <main className="contact-main">
                <h1 className="contact-title">צרו עמנו קשר</h1>

                <div className="contact-grid">
                    {/* Map Section */}
                    <div className="contact-map-section">
                        <h2 className="contact-section-title">המיקום שלנו</h2>
                        <div className="contact-map">
                            <iframe
                                className="contact-map-iframe"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192324932685!2d35.22434751533344!3d31.77602138132661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d5f864069329%3A0x60830c328429942d!2sChomat%20Shmuel%20Community%20Center!5e0!3m2!1sen!2sil!4v1642783739668!5m2!1sen!2sil"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Map"></iframe>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="contact-form-section">
                        <h2 className="contact-section-title">שלחו לנו הודעה</h2>
                        <form className="contact-form">
                            <label htmlFor="name" className="contact-form-label">
                                שם מלא
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="contact-form-input"
                                placeholder="הכנס את שמך המלא"
                            />

                            <label htmlFor="email" className="contact-form-label">
                                כתובת דואר אלקטרוני
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="contact-form-input"
                                placeholder="הכנס את כתובת הדואר האלקטרוני שלך"
                            />

                            <label htmlFor="message" className="contact-form-label">
                                הודעה
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="contact-form-textarea"
                                placeholder="הכנס את ההודעה שלך"></textarea>

                            <button type="submit" className="contact-form-button">
                                שלח
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div className="contact-info-section">
                        <h2 className="contact-section-title">פרטי התקשרות</h2>
                        <ul className="contact-info-list">
                            <li className="contact-info-item">
                                <a href="tel:02-6453891" className="contact-info-link">
                                    <FontAwesomeIcon icon={faPhone} className="contact-info-icon" />
                                    02-6453891
                                </a>
                            </li>
                            <li className="contact-info-item">
                                <a href="fax:02-329804" className="contact-info-link">
                                    <FontAwesomeIcon icon={faFax} className="contact-info-icon" />
                                    02-329804
                                </a>
                            </li>
                            <li className="contact-info-item">
                                <a
                                    href="mailto:homat-shmuel@matnasim.co.il"
                                    className="contact-info-link">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="contact-info-icon"
                                    />
                                    homat-shmuel@matnasim.co.il
                                </a>
                            </li>
                            <li className="contact-info-item">
                                <a
                                    href="https://www.google.com/maps/place/Chomat+Shmuel+Community+Center/@31.7760214,35.2243475,17z/data=!3m1!4b1!4m5!3m4!1s0x1502d5f864069329:0x60830c328429942d!8m2!3d31.7760172!4d35.2265362"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-info-link">
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        className="contact-info-icon"
                                    />
                                    רח' שאול אביגור 7, שכונת חומת שמואל, ירושלים
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
          
        </div>
    );
};
