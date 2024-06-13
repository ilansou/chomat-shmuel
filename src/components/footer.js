import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Newsletter from "./newsletter";

export const Footer = () => {
    return (
        <footer className="bg-blue-800 w-full relative pb-2 text-white px-8 py-8">
            <div className="w-full bottom-0 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">מנהל קהילתי חומת שמואל</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="hover:underline">
                                    אודות המנהל
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline">
                                    צוות המנהל
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline">
                                    טפסים
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">צרו עמנו קשר</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://www.google.com/maps/place/Chomat+Shmuel+Community+Center/@31.7760214,35.2243475,17z/data=!3m1!4b1!4m5!3m4!1s0x1502d5f864069329:0x60830c328429942d!8m2!3d31.7760172!4d35.2265362"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline">
                                    רח' שאול אביגור 7, שכונת חומת שמואל, ירושלים
                                </a>
                            </li>
                            <li>
                                <a href="tel:02-6453891" className="hover:underline">
                                    טל: 02-6453891
                                </a>
                            </li>
                            <li>
                                <a href="fax:02-329804" className="hover:underline">
                                    פקס: 02-329804
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:homat-shmuel@matnasim.co.il"
                                    className="hover:underline">
                                    דוא"ל: homat-shmuel@matnasim.co.il
                                </a>
                            </li>
                        </ul>
                    
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="https://www.facebook.com/harhomat"
                                className="text-white hover:text-gray-400">
                                <FontAwesomeIcon icon={faFacebookF} size="2x" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCY9XtfWYjuDqrqZwQBFp4Hw"
                                className="text-white px-7 hover:text-gray-400">
                                <FontAwesomeIcon icon={faYoutube} size="2x" />
                            </a>
                        </div>
                        
                    </div>
                </div>
                <Newsletter />
            </div>
        </footer>
    );
};
