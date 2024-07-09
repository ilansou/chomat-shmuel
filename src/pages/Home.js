import React, { useEffect } from "react";
import { EventList } from "../components/events/EventList";
import { useNews } from "../contexts/NewsContext";

export const Home = () => {
  const { newsList, getNews } = useNews();

  useEffect(() => {
    const fetchNews = async () => {
      if (newsList.length === 0) {
        await getNews();
      }
    };

    fetchNews();
  }, [getNews, newsList.length]);

  const formatDate = (dateString) => {
    if (!dateString) return 'תאריך לא זמין';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original string if invalid date
    
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">ברוכים הבאים לאתר האירועים שלנו</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <section className="mb-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-semibold mb-6 p-6 bg-blue-600 text-white">אירועים קרובים</h2>
          <div className="p-6">
            <EventList />
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-semibold mb-6 p-6 bg-green-600 text-white">חדשות ועדכונים</h2>
          <div className="p-6">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsList.slice(0, 6).map((newsItem) => (
                <li key={newsItem.id} className="border rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                  <h3 className="font-semibold text-lg mb-2">{newsItem.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{newsItem.description}</p>
                  <span className="text-xs text-gray-500 block text-right">
                    {newsItem.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;