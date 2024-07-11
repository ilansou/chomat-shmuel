import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; // Adjust path as per your Firebase setup
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

import { Doughnut, Bar } from 'react-chartjs-2';
import {
  getDocs,
  query,
  collection,
  where,
  Timestamp,
} from 'firebase/firestore';
import * as XLSX from 'xlsx';

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
  const [eventStats, setEventStats] = useState({ total: 0, upcoming: 0, categories: {}, audienceAgeStats: {} });
  const [classStats, setClassStats] = useState({ total: 0, categories: {} });
  const [newsStats, setNewsStats] = useState({ total: 0, recentViews: 0, notExpired: 0 });
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef);
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => doc.data());
      const upcoming = eventsData.filter(event => new Date(event.eventDate.seconds * 1000) > new Date()).length;

      const categories = eventsData.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {});

      const audienceAgeStats = eventsData.reduce((acc, event) => {
        const ageCategory = event.audienceAge || 'Unknown';
        acc[ageCategory] = (acc[ageCategory] || 0) + 1;
        return acc;
      }, {});

      setEventStats({ total: eventsData.length, upcoming, categories, audienceAgeStats });
    };

    const fetchClassData = async () => {
      const classesRef = collection(db, 'classes');
      const q = query(classesRef);
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map(doc => doc.data());

      const categories = classesData.reduce((acc, cls) => {
        acc[cls.category] = (acc[cls.category] || 0) + 1;
        return acc;
      }, {});

      setClassStats({ total: classesData.length, categories });
    };

    const fetchNewsData = async () => {
      const newsRef = collection(db, 'news and updates');
      const q = query(newsRef);
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map(doc => doc.data());

      const now = new Date();
      const total = newsData.length;
      const recentViews = newsData.reduce((sum, news) => sum + (news.views || 0), 0);
      const notExpired = newsData.filter(news => !news.expireDate || new Date(news.expireDate.seconds * 1000) > now).length;

      setNewsStats({ total, recentViews, notExpired });
    };

    const fetchFeedbackData = async () => {
      const feedbackRef = collection(db, 'pageFeedback');
      const feedbackSnapshot = await getDocs(feedbackRef);
      console.log(feedbackSnapshot);
      const feedbackDocs = feedbackSnapshot.docs.map(doc => doc.data());
      setFeedbackData(feedbackDocs); // Update the feedbackData state here
    };
    

    fetchEventData();
    fetchClassData();
    fetchNewsData();
    fetchFeedbackData();
  }, []);

  const exportEventsToExcel = async () => {
    const workbook = XLSX.utils.book_new();
    const eventsRef = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsRef);
    const eventsData = eventsSnapshot.docs.map(doc => doc.data());
    const sheetName = 'Events';
    exportToExcel(workbook, eventsData, sheetName);
  };

  const exportClassesToExcel = async () => {
    const workbook = XLSX.utils.book_new();
    const classesRef = collection(db, 'classes');
    const classesSnapshot = await getDocs(classesRef);
    const classesData = classesSnapshot.docs.map(doc => doc.data());
    const sheetName = 'Classes';
    exportToExcel(workbook, classesData, sheetName);
  };

  const exportNewsToExcel = async () => {
    const workbook = XLSX.utils.book_new();
    const newsRef = collection(db, 'news and updates');
    const newsSnapshot = await getDocs(newsRef);
    const newsData = newsSnapshot.docs.map(doc => doc.data());
    const sheetName = 'News';
    exportToExcel(workbook, newsData, sheetName);
  };

  const exportToExcel = (workbook, data, sheetName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    XLSX.writeFile(workbook, 'dashboard_data.xlsx');
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false, // Hide the y-axis title
        },
      },
    },
  };
  const classData = {
    labels: Object.keys(classStats.categories),
    datasets: [
      {
        data: Object.values(classStats.categories),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F87171',
          '#FBBF24',
          '#34D399',
          '#60A5FA',
          '#A78BFA',
          '#F472B6',
          '#FBBF24',
          '#34D399',
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#EC4899',
          '#F59E0B',
          '#10B981',
        ],
        borderWidth: 1,
      },
    ],
  };
  const eventsByAudienceAgeData = {
    labels: Object.keys(eventStats.audienceAgeStats),
    datasets: [
      {
        data: Object.values(eventStats.audienceAgeStats),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F87171',
          '#FBBF24',
          '#34D399',
          '#60A5FA',
          '#A78BFA',
          '#F472B6',
          '#FBBF24',
          '#34D399',
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#059669',
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#EC4899',
          '#F59E0B',
          '#10B981',
        ],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const feedbackCharts = feedbackData.map((feedback, index) => {
    const data = {
      labels: ['עזר', 'לא עזר'],
      datasets: [
        {
          label: 'Feedback',
          data: [feedback.likes || 0, feedback.dislikes || 0],
          backgroundColor: ['green', 'red'],
        },
      ],
    };
  
    return (
      <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center mx-4"> {/* Added mx-4 for margin */}
        <h2 className="text-xl font-semibold mb-4">{`פידבק - ${feedback.type}`}</h2>
        <div className="h-64 flex justify-center items-center">
        <Doughnut data={data} options={pieChartOptions} />
        </div>
      </div>
    );
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">סך כל האירועים</h2>
          <p className="text-3xl font-bold text-blue-600">{eventStats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">אירועים עתידיים</h2>
          <p className="text-3xl font-bold text-green-600">{eventStats.upcoming}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">סך כל החוגים</h2>
          <p className="text-3xl font-bold text-purple-600">{classStats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">חדשות באתר</h2>
          <p className="text-3xl font-bold text-red-600">{newsStats.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg gap-8 mb-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">חוגים לפי קטגוריות</h2>
          <div className="h-[300px]">
            <Bar data={classData} options={chartOptions1} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">אירועים לפי קהל יעד</h2>
          <div className="h-[300px]">
            <Doughnut data={eventsByAudienceAgeData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
      {feedbackCharts}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <button
          onClick={exportEventsToExcel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ייצוא לאקסל אירועים
        </button>
        <button
          onClick={exportClassesToExcel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ייצוא לאקסל חוגים
        </button>
        <button
          onClick={exportNewsToExcel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ייצוא לאקסל חדשות ועדכונים
        </button>
      </div>
    </div>
  );
};