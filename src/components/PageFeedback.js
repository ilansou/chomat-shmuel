import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this import based on your Firebase setup

const PageFeedback = ({ pageId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const docRef = doc(db, 'pageFeedback', pageId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
      } else {
        await setDoc(docRef, { likes: 0, dislikes: 0 });
      }
    };

    fetchFeedback();
  }, [pageId]);

  const handleVote = async (isLike) => {
    if (userVote === isLike) return;

    const docRef = doc(db, 'pageFeedback', pageId);
    
    try {
      if (userVote === null) {
        await updateDoc(docRef, {
          [isLike ? 'likes' : 'dislikes']: increment(1)
        });
      } else {
        await updateDoc(docRef, {
          [isLike ? 'likes' : 'dislikes']: increment(1),
          [!isLike ? 'likes' : 'dislikes']: increment(-1)
        });
      }

      setUserVote(isLike);
      if (isLike) {
        setLikes(prev => prev + 1);
        if (userVote === false) setDislikes(prev => prev - 1);
      } else {
        setDislikes(prev => prev + 1);
        if (userVote === true) setLikes(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  const buttonClass = (isLike) => `
    flex items-center justify-center
    px-4 py-2 rounded-full
    transition-all duration-200 ease-in-out
    shadow-md hover:shadow-lg
    text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${userVote === isLike
      ? (isLike ? 'bg-blue-500 text-white' : 'bg-red-500 text-white')
      : 'bg-white text-gray-700 hover:bg-gray-100'}
    ${userVote === isLike ? 'focus:ring-blue-500' : 'focus:ring-gray-500'}
  `;

  return (
    <div className="rounded-lg p-6 max-w-md mx-auto ml-auto">   
     <h3 className="text-xl font-bold mb-6 text-center text-gray-800">האם העמוד עזר לך?</h3>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
        <button
          onClick={() => handleVote(true)}
          className={buttonClass(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span className="font-semibold text-green-700">{likes}</span>
        </button>
        <button
          onClick={() => handleVote(false)}
          className={buttonClass(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
          </svg>
          <span className="font-semibold text-red-700">{dislikes}</span>
        </button>
      </div>
    </div>
  );
};

export default PageFeedback;