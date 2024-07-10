import React, {useState, useEffect } from "react";
import { useNews } from "../contexts/NewsContext";
import { EventList } from "../components/events/EventList";
import { Chat } from "../components/Chat";

export const Home = () => {

  const { newsList, getNewsList } = useNews();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showCreateNews, setShowCreateNews] = useState(false);

  useEffect(() => {
    getNewsList();
  }, []);

  const handleSelectNews = (news) => {
    setSelectedNews(news);
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
    <div className="flex flex-wrap pt-24">
      <div className="w-full lg:w-3/5 p-4 order-2 lg:order-1">
        <EventList />
        <Chat/>
      </div>
      <div className="w-full lg:w-2/5 p-4 order-1 lg:order-2">
      </div>
    </div>
  );
};
