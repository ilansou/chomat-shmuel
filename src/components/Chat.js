import React, { useEffect, useRef } from 'react';
import { useNews } from '../contexts/NewsContext';
import { format } from 'date-fns';
import whatsappBackground from '../images/WhatsApp.png';

export const Chat = ({ handleSelectNews, renderAttachment }) => {
  const { newsList } = useNews();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div>
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
                  {format(news.updateDate, "dd/MM/yyyy HH:mm")}
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
    </div>
  );
};