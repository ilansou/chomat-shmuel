import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto px-4 flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 mb-6">
                    <h4 className="text-lg font-bold mb-4">מנהל קהילתי חומת שמואל</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                אודות המנהל
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                צוות המנהל
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                טפסים
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/4 mb-6">
                    <h4 className="text-lg font-bold mb-4">חוגים, צהרונים ואירועים</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                חוג אומנות
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                חוג העשרה
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                גלריות
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/4 mb-6">
                    <h4 className="text-lg font-bold mb-4">שירותים ואגפים בתנהל הקהילתי</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                הגיל השלישי
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                אגף הנוער
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                אגף תרבות ואירועים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                עבודה קהילתית
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                שכונות צעירות
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                אירועים - משפחתונים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                צח"רונים "נצנצים" בגני ילדים
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-400">
                                קליטה
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/4 mb-6">
                    <h4 className="text-lg font-bold mb-4">צרו עמנו קשר</h4>
                    <p className="mb-2">
                        רח' שאול אביגור 7,
                        <br />
                        שכונת חומת שמואל, ירושלים
                    </p>
                    <p className="mb-2">
                        טל: 02-6453891
                        <br />
                        פקס: 02-329804
                        <br />
                        דוא"ל: homat-shmuel@matnasim.co.il
                    </p>
                    <div className="mt-4 flex space-x-4 justify-center justify-evenly">
                        <a href="https://www.facebook.com/harhomat" className="hover:opacity-75">
                            <FontAwesomeIcon icon={faFacebookF} size="2x" />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UCY9XtfWYjuDqrqZwQBFp4Hw"
                            className="hover:opacity-75">
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
