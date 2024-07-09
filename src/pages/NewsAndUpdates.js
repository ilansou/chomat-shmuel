import React, { useEffect } from 'react';
import UpdateItem from '../components/newsAndUpdates/NewsAndUpdatesItem';
import { useNewsAndUpdates } from '../hooks/useNewsAndUpdates';
import logo from '../images/logo1.png';

export const NewsAndUpdates = () => {
  const { newsAndUpdatesList, loading, loadMore, addNewsAndUpdates } = useNewsAndUpdates();

  useEffect(() => {
    loadMore(); // Fetch initial data
  }, []);

  const handleTitleClick = (update) => {
    console.log('Clicked on:', update.title);
  };

  const handleAddUpdate = async () => {
    const newUpdate = {
      title: 'New Update Title',
      description: 'New Update Description',
      updateDate: new Date().toISOString(),
      expireDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    };

    try {
      await addNewsAndUpdates(newUpdate);
      console.log('Successfully added new update!');
    } catch (error) {
      console.error('Error adding update:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 mt-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">עדכונים שותפים</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
          onClick={handleAddUpdate}
        >
          הוסף עדכון
        </button>
      </div>
      <div className="max-w-5xl mx-auto space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center">טוען עדכונים...</p>
        ) : newsAndUpdatesList.length === 0 ? (
          <p className="text-gray-500 text-center">אין עדכונים שותפים</p>
        ) : (
          newsAndUpdatesList.map((update) => (
            <UpdateItem
              key={update.id} // Ensure 'id' is unique for each update
              update={update}
              onClick={handleTitleClick}
              logo={logo}
            />
          ))
        )}
      </div>
    </div>
  );
};

