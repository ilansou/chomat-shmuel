import React, { useEffect } from "react";
import { EventList } from "../components/events/EventList";
import { useNews } from "../contexts/NewsContext";

export const Home = () => {
  const { newsList, getNewsList } = useNews();

  return (
    <div className="flex flex-wrap pt-24">
      <div className="w-full lg:w-2/5 p-4">
      <EventList />
        <h1 className="text-3xl font-bold mb-4">WhatsApp CHAT</h1>
        {/* Add more content or components as needed */}
      </div>
    </div>
  );
};

export default Home;