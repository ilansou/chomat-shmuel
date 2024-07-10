import React, { useState, useEffect, useRef } from "react";
import { useNews } from "../contexts/NewsContext";
import { useAuth } from "../contexts/AuthContext";
import { CreateNews } from "../components/news/CreateNews";
import { NewsModal } from "../components/news/NewsModal";
import { FacebookProvider, Page } from 'react-facebook';
import { Chat } from '../components/Chat';

export const News = () => {
  const { newsList, getNewsList } = useNews();
  const { user } = useAuth();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showCreateNews, setShowCreateNews] = useState(false);

  useEffect(() => {
    getNewsList();
  }, []);

  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

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
    <div className="flex flex-col lg:flex-row justify-between pt-28 px-4 lg:px-20 pb-20 space-y-8 lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-[calc(50%-16px)] xl:w-[calc(50%-16px)] shadow-lg">
        {/* WhatsApp-like header */}
        <div className="bg-[#075e54] text-white p-3 flex justify-between items-center rounded-t-lg">
          <h1 className="text-lg font-bold">חדשות ועדכונים</h1>
          {user && (
            <button
              onClick={() => setShowCreateNews(true)}
              className="bg-[#128c7e] hover:bg-[#075e54] text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
            >
              הוסף חדשות
            </button>
          )}
        </div>
        {/* Chat area */}
        <Chat handleSelectNews={handleSelectNews} renderAttachment={renderAttachment} />
      </div>

      {/* Facebook Page Plugin */}
      <div className="w-full lg:w-1/2 xl:w-1/3 shadow-lg p-3 rounded-lg bg-white flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">עקבו אחרינו בפייסבוק</h2>
        <FacebookProvider appId="YOUR_FACEBOOK_APP_ID">
          <Page 
            href="https://www.facebook.com/harhomat"
            tabs="timeline"
            width="340"
            height="500"
            smallHeader={false}
            adaptContainerWidth={true}
            hideCover={false}
            showFacepile={true}
          />
        </FacebookProvider>
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