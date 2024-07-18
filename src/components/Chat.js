import React, { useEffect, useState, useRef } from "react";
import { useNews } from "../contexts/NewsContext";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import whatsappBackground from "../images/WhatsApp.png";
import { NewsForm } from "./news/NewsForm";
import { ClipLoader } from "react-spinners";
import { NewsModal } from "./news/NewsModal";

export const Chat = () => {
  const scrollContainerRef = useRef();
  const { newsList, loading } = useNews();
  const { user } = useAuth();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsForm, setShowNewsForm] = useState(false);

  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [newsList]);

  const renderAttachment = (imageUrl, title) => {
    if (!imageUrl) return null;

    const getFileType = (dataUrl) => {
      if (dataUrl.startsWith("data:image/")) return "image";
      if (dataUrl.startsWith("data:application/pdf")) return "pdf";
      return "other";
    };

    const fileType = getFileType(imageUrl);

    if (loading)
      return (
        <div className="flex justify-center items-center h-60">
          <ClipLoader color={"#000"} loading={loading} size={50} />
        </div>
      );
    return (
      <div className="mb-2 border rounded-lg overflow-hidden">
        <div className="p-2 bg-gray-100">
          {fileType === "image" && (
            <img
              src={imageUrl}
              alt={title || "News attachment"}
              className="max-w-full h-auto rounded-lg"
              onError={(e) => {
                console.error("Error loading image:", imageUrl);
                e.target.onerror = null;
                e.target.src = "/path/to/fallback/image.png"; // Replace with path to default image
              }}
            />
          )}
          {fileType === "pdf" && (
            <embed
              src={imageUrl}
              type="application/pdf"
              width="100%"
              height="250px"
              className="rounded-lg"
            />
          )}
          {fileType === "other" && (
            <div className="flex flex-col items-center justify-center h-40 bg-gray-200 rounded-lg">
              <svg
                className="w-16 h-16 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-600">לחץ על 'הורד' לצפייה בקובץ</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:w-[calc(100%)] xl:w-[calc(100%)] shadow-lg">
      {/* WhatsApp-like header */}
      <div className="bg-[#075e54] text-white p-3 flex justify-between items-center rounded-t-lg">
        <h1 className="text-lg font-bold">חדשות ועדכונים</h1>
        {user && (
          <button
            onClick={() => setShowNewsForm(true)}
            className="bg-[#128c7e] hover:bg-[#075e54] text-white font-bold py-1 px-2 rounded text-sm transition duration-300">
            הוסף חדשות
          </button>
        )}
      </div>
      {/* Chat area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 h-[60vh] lg:h-[calc(100vh-300px)] flex flex-col-reverse"
        style={{ backgroundImage: `url(${whatsappBackground})`, backgroundSize: "210px" }}>
        <div className="flex flex-col">
          {newsList
            .filter((news) => {
              const today = new Date();
              const expireDate = new Date(news.expireDate);
              return expireDate >= today.setHours(0, 0, 0, 0);
            })
            .slice()
            .reverse()
            .map((news) => (
              <div key={news.id} className="flex justify-start mb-3">
                <div
                  className="max-w-[80%] p-2 rounded-lg shadow cursor-pointer bg-white text-gray-800 rounded-tr-none"
                  onClick={() => handleSelectNews(news)}>
                  <h3 className="font-bold text-base mb-1">{news.title}</h3>
                  <p className="text-sm mb-1">{news.description}</p>
                  {news.imageUrl && renderAttachment(news.imageUrl, news.title)}
                  <p className="text-xs text-gray-500 text-left">
                    {format(new Date(news.updateDate), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Input area (optional, for consistency with WhatsApp UI) */}
      <div className="bg-[#f0f0f0] p-2 flex items-center rounded-b-lg">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 rounded-full py-1 px-3 mr-2 text-sm"
          disabled
        />
        <button className="bg-[#128c7e] text-white rounded-full p-1" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      {selectedNews && <NewsModal news={selectedNews} onClose={handleCloseModal} />}

      {showNewsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <NewsForm onClose={() => setShowNewsForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
