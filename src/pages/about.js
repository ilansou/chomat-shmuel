import React from "react";
import "../styles/about.css";

export const About = () => {
    return (
        <div className="about-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">המנהל הקהילתי</h2>
                <ul className="sidebar-list">
                    <li className="sidebar-item">אודות המנהל הקהילתי</li>
                    <li className="sidebar-item">הנהלה וצוות המינהל</li>
                    <li className="sidebar-item">שכונת חומת שמואל</li>
                </ul>
                <div className="newsletter">
                    <h3 className="newsletter-title">הירשאו לעדכונים</h3>
                    <p>קבלו עדכונים שוטפים על אירועים, חוגים כל מה שחדש במנהל:</p>
                    <form className="newsletter-form">
                        <label className="newsletter-label">שם מלא*</label>
                        <input type="text" className="newsletter-input" />
                        <label className="newsletter-label">דוא"ל*</label>
                        <input type="email" className="newsletter-input" />
                        <button type="submit" className="newsletter-button">
                            צרפו אותי
                        </button>
                    </form>
                </div>
            </div>
            {/* Main Content */}
            <div className="main-content">
                <p>
                    מרחב קהילתי חומת שמואל הוא ארגון קהילתי מאפשר לתושבי השכונה לקחת חלק פעיל בתהליך
                    קבלת ההחלטות בקהילה.
                </p>
                <p>הקמתו היא פועל יוצא של צרכי המתמודד הנובע התושבים.</p>
                <p>
                    בראש המנהל הקהילתי ניצבת הנהלה מתנדבת הנבחרת בשכונה במהלך בחירות פתוח ודמוקרטי,
                    בנוסף לאנשי מקצוע משמש העיריה והחברה למתנ"סים.
                </p>
                <p>
                    בנוסף לזרוע הניהולית המרכזית משולבים קהילתיים פעילי ציבור בשכונה בנושאים במעמד
                    של משקיפים.
                </p>
                <p>
                    מנהל המנהל הקהילתי וצוות עובדים להחלטות ההנהלה, תמונות לעשות את מדיניות התפועלה.
                </p>
                <p>
                    חברי הנהלה לראשויות וועדות קהילתיות המאפשר הן לגופים הפעילים בשכונה והן לתושבים
                    לקחת חלק בתהליך קבלת ההחלטות והקביעות המדיניות בנושאים השונים.
                </p>
                <p>
                    פעולות הנהלת המנהל לקולות לשנים, האחרת הפעילה ישירות על תוכניות פעילת מגוון רחב
                    של נושאים. השניה, תכלול והנוויה הם תהליכים אסטרטגיים בכלל התחומים הקשורים לחיי
                    הקהילה (ביטחון, איכות סביבה, תכנון, השערה וכיוצב).
                </p>
                <div className="more-info">
                    <h3>רוצים לדעת עוד קצת?</h3>
                    <h3>להכיר אותנו?</h3>
                    <p>
                        מוזמנים לקרוא עוד ...{" "}
                        <a
                            href="https://online.fliphtml5.com/qfboh/fyni/?1609945510152#p=1"
                            target="_blank"
                            rel="noreferrer">
                            חוברת עינים להכיר - חומת שמואל
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
