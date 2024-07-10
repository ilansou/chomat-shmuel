import React from 'react';

export const Dashboard = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        title="Looker Studio"
        width="100%"
        height="100%"
        src="YOUR_LOOKER_STUDIO_EMBED_URL"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};
