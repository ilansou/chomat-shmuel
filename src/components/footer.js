import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4 className="footer-heading">מנהל קהילתי חומת שמואל</h4>
                    <ul className="footer-links">
                        <li>
                            <Link to="/about" className="footer-link">
                                אודות המנהל
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                צוות המנהל
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                טפסים
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4 className="footer-heading">חוגים, צהרונים ואירועים</h4>
                    <ul className="footer-links">
                        <li>
                            <Link to="#" className="footer-link">
                                חוג אומנות
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                חוג העשרה
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                גלריות
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4 className="footer-heading">שירותים ואגפים בתנהל הקהילתי</h4>
                    <ul className="footer-links">
                        <li>
                            <Link to="#" className="footer-link">
                                הגיל השלישי
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                אגף הנוער
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                אגף תרבות ואירועים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                עבודה קהילתית
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                שכונות צעירות
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                אירועים - משפחתונים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                צח"רונים "נצנצים" בגני ילדים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                קליטה
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4 className="footer-heading">צרו עמנו קשר</h4>
                    <ul className="footer-text">
                        <li>
                            <a
                                href="https://www.google.com/maps/place/Chomat+Shmuel+Community+Center/@31.7760214,35.2243475,17z/data=!3m1!4b1!4m5!3m4!1s0x1502d5f864069329:0x60830c328429942d!8m2!3d31.7760172!4d35.2265362"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link">
                                רח' שאול אביגור 7, שכונת חומת שמואל, ירושלים
                            </a>
                        </li>
                        <li>
                            <a href="tel:02-6453891" className="footer-link">
                                טל: 02-6453891
                            </a>
                        </li>
                        <li>
                            <a href="fax:02-329804" className="footer-link">
                                פקס: 02-329804
                            </a>
                        </li>
                        <li>
                            <a href="mailto:homat-shmuel@matnasim.co.il" className="footer-link">
                                דוא"ל: homat-shmuel@matnasim.co.il
                            </a>
                        </li>
                    </ul>

                    <div className="footer-social">
                        <a href="https://www.facebook.com/harhomat" className="footer-social-link">
                            <FontAwesomeIcon icon={faFacebookF} size="2x" />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UCY9XtfWYjuDqrqZwQBFp4Hw"
                            className="footer-social-link">
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
