import React, { useEffect, useState, useRef } from 'react';
import { useNews } from '../contexts/NewsContext';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import whatsappBackground from '../images/WhatsApp.png';
import { NewsForm } from './news/NewsForm';
import { NewsModal } from './news/NewsModal';

export const Chat = () => {
  const scrollContainerRef = useRef();
  const { newsList, getNewsList } = useNews();
  const { user } = useAuth();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsForm, setShowNewsForm] = useState(false);

  useEffect(() => {
    getNewsList();
  }, []);

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
  }, []);

  const renderAttachment = (attachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <img 
          src={attachment.url} 
          alt="News attachment" 
          className="max-w-full h-auto rounded-lg mb-2"
        />
      );
    } else {
      return (
        <a 
          href={attachment.url} 
          download 
          className="flex items-center bg-gray-200 rounded-lg p-2 mb-2"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download {attachment.name}
        </a>
      );
    }
  };

  return (
    <div className="w-full lg:w-[calc(100%-16px)] xl:w-[calc(100%-16px)] shadow-lg">
      {/* WhatsApp-like header */}
      <div className="bg-[#075e54] text-white p-3 flex justify-between items-center rounded-t-lg">
        <h1 className="text-lg font-bold">חדשות ועדכונים</h1>
        {user && (
          <button
            onClick={() => setShowNewsForm(true)}
            className="bg-[#128c7e] hover:bg-[#075e54] text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
          >
            הוסף חדשות
          </button>
        )}
      </div>
      {/* Chat area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 h-[60vh] lg:h-[calc(100vh-300px)] flex flex-col-reverse"
        style={{ backgroundImage: `url(${whatsappBackground})`, backgroundSize: '210px' }}
      >
        <div className="flex flex-col">
          {newsList.slice().reverse().map((news) => (
            <div
              key={news.id}
              className="flex justify-start mb-3"
            >
              <div
                className="max-w-[80%] p-2 rounded-lg shadow cursor-pointer bg-white text-gray-800 rounded-tr-none"
                onClick={() => handleSelectNews(news)}
              >
                <h3 className="font-bold text-base mb-1">{news.title}</h3>
                <p className="text-sm mb-1">{news.description}</p>
                {news.attachment && renderAttachment(news.attachment)}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={handleCloseModal} />
      )}

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