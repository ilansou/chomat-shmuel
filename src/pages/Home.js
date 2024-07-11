import React, { useState, useEffect } from "react";
import { useNews } from "../contexts/NewsContext";
import { EventList } from "../components/events/EventList";
import { Chat } from "../components/Chat";
import PageFeedback from '../components/PageFeedback'; // Adjust the import path as needed

export const Home = () => {
  const { newsList, getNewsList } = useNews();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsForm, setShowNewsForm] = useState(false);

  return (
    <div className="pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl leading-9 text-gray-900 sm:text-4xl sm:leading-10 text-center mb-6">
          ברוכים הבאים לאתר המינהל :)
        </h1>
        <p className="text-xl leading-7 text-gray-500 text-center mb-10">
          כאן תוכלו להתעדכן בכל מה שקורה
        </p>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          
          <div className="w-full md:w-3/4 px-4">
            <EventList />
          </div>
          <div className="w-full md:w-1/4 mt-14 px-0 mb-0 md:mb-0">
            <Chat />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="home" />
      </div>
    </div>
  );
};
