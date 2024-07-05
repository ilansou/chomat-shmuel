import React from "react";
import { Newsletter } from "../components/Newsletter";
import { EventList } from "../components/EventList";
import { Carousel } from "../components/Carousel";

export const Home = () => {
  const slides = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1719922326745-0ba9484d02e2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1718049447951-27c218890810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8ajJ6ZWM2a2Q5Vmt8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">ברוכים הבאים לאתר האירועים שלנו</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[70%]">
              <EventList />
            </div>
          </div>
          <div className="p-4">
            <Carousel slides={slides} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
