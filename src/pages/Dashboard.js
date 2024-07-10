import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventsContext';
import { useClasses } from '../contexts/ClassesContext';
import { useNews } from '../contexts/NewsContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { user } = useAuth();
  const { eventList } = useEvents();
  const { classList } = useClasses();
  const { newsList } = useNews();

  const [eventStats, setEventStats] = useState({ total: 0, upcoming: 0 });
  const [classStats, setClassStats] = useState({ total: 0, categories: {} });
  const [newsStats, setNewsStats] = useState({ total: 0, recentViews: 0 });

  useEffect(() => {
    // Calculate event stats
    const upcoming = eventList.filter(event => (event.eventDate) > new Date()).length;
    setEventStats({ total: eventList.length, upcoming });

    // Calculate class stats
    const categories = {};
    classList.forEach(cls => {
      categories[cls.category] = (categories[cls.category] || 0) + 1;
    });
    setClassStats({ total: classList.length, categories });

    // Calculate news stats
    const recentViews = newsList.reduce((sum, news) => sum + (news.views || 0), 0);
    setNewsStats({ total: newsList.length, recentViews });
  }, []);

  const eventData = {
    labels: ['Total Events', 'Upcoming Events'],
    datasets: [
      {
        data: [eventStats.total, eventStats.upcoming],
        backgroundColor: ['#4B5563', '#60A5FA'],
      },
    ],
  };

  const classData = {
    labels: Object.keys(classStats.categories),
    datasets: [
      {
        data: Object.values(classStats.categories),
        backgroundColor: [
          '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA',
          '#F472B6', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA',
        ],
      },
    ],
  };

  const newsData = {
    labels: ['Total News', 'Recent Views'],
    datasets: [
      {
        label: 'News Statistics',
        data: [newsStats.total, newsStats.recentViews],
        backgroundColor: ['#4B5563', '#60A5FA'],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Events</h2>
          <Doughnut data={eventData} options={{ responsive: true }} />
        </div>

        {/* Classes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Classes by Category</h2>
          <Doughnut data={classData} options={{ responsive: true }} />
        </div>

        {/* News Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">News Statistics</h2>
          <Bar data={newsData} options={{ responsive: true }} />
        </div>

        {/* Additional Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <ul className="space-y-2">
            <li>Total Events: {eventStats.total}</li>
            <li>Upcoming Events: {eventStats.upcoming}</li>
            <li>Total Classes: {classStats.total}</li>
            <li>Total News Articles: {newsStats.total}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};