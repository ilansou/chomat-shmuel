import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFax, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Newsletter from "../components/newsletter";

export const Contact = () => {
    // useEffect(() => {
    //     const map = new window.google.maps.Map(document.getElementById("map"), {
    //         center: { lat: 31.77602138132661, lng: 35.22434751533344 },
    //         zoom: 15,
    //     });

    //     const marker = new window.google.maps.Marker({
    //         position: { lat: 31.77602138132661, lng: 35.22434751533344 },
    //         map,
    //         icon: {
    //             url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    //         },
    //     });
    // }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">צרו עמנו קשר</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Map Section */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">המיקום שלנו</h2>
                        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192324932685!2d35.22434751533344!3d31.77602138132661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d5f864069329%3A0x60830c328429942d!2sChomat%20Shmuel%20Community%20Center!5e0!3m2!1sen!2sil!4v1642783739668!5m2!1sen!2sil"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Map"></iframe>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">שלחו לנו הודעה</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">שם:</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="הכנס את שמך"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">אימייל:</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="הכנס את האימייל שלך"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">מספר טלפון:</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="הכנס את מספר הטלפון שלך"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">נושא:</label>
                                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
                                    <option value="">בחר נושא</option>
                                    <option value="general">כללי</option>
                                    <option value="events">אירועים</option>
                                    <option value="classes">חוגים</option>
                                    <option value="news">חדשות ועדכונים</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">הודעה:</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    rows="4"
                                    placeholder="הכנס את הודעתך"></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                    שלח
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">פרטי התקשרות</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="tel:02-6453891"
                                    className="flex items-center hover:text-blue-600">
                                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                    02-6453891
                                </a>
                            </li>
                            <li>
                                <a
                                    href="fax:02-329804"
                                    className="flex items-center hover:text-blue-600">
                                    <FontAwesomeIcon icon={faFax} className="mr-2" />
                                    02-329804
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:homat-shmuel@matnasim.co.il"
                                    className="flex items-center hover:text-blue-600">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                    homat-shmuel@matnasim.co.il
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.google.com/maps/place/Chomat+Shmuel+Community+Center/@31.7760214,35.2243475,17z/data=!3m1!4b1!4m5!3m4!1s0x1502d5f864069329:0x60830c328429942d!8m2!3d31.7760172!4d35.2265362"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center hover:text-blue-600">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                    רח' שאול אביגור 7, שכונת חומת שמואל, ירושלים
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Newsletter />
        </div>
    );
};
