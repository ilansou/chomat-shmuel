import React, { useState, useEffect, useRef } from "react";
import { useNews } from "../contexts/NewsContext";
import { useAuth } from "../contexts/AuthContext";
import { CreateNews } from "../components/news/CreateNews";
import { format } from "date-fns";
import { NewsModal } from "../components/news/NewsModal";

export const News = () => {
  const { newsList, getNews } = useNews();
  const { user } = useAuth();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showCreateNews, setShowCreateNews] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [newsList]);

  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
    <div className="container items-center mx-auto pt-28 px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">חדשות ועדכונים</h1>
        {user && (
          <button
            onClick={() => setShowCreateNews(true)}
            className="bg-purple-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            הוסף חדשות
          </button>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="bg-gray-100 flex flex-col rounded-lg p-4 h-[calc(100vh-200px)] xl:w-[70%] overflow-y-auto"
      >
        {newsList.map((news, index) => (
          <div
            key={news.id}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } mb-4`}
          >
            <div
              className={`max-w-3/4 p-4 rounded-lg shadow cursor-pointer ${
                index % 2 === 0
                  ? "bg-white text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => handleSelectNews(news)}
            >
              <h3 className="font-bold text-lg mb-2">{news.title}</h3>
              <p className="mb-2">{news.description}</p>
              <p className="text-sm opacity-75">{format(news.updateDate, "dd/MM/yyyy HH:mm")}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedNews && (
        <NewsModal news={selectedNews} onClose={handleCloseModal} />
      )}

      {showCreateNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <CreateNews onClose={() => setShowCreateNews(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
