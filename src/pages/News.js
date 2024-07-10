import React from "react";
import { FacebookProvider, Page } from 'react-facebook';
import { Chat } from '../components/Chat';

export const News = () => {

  return (
    <div className="flex flex-col lg:flex-row justify-between pt-28 px-4 lg:px-20 pb-20 space-y-8 lg:space-y-0 lg:space-x-8">
      <Chat />

      {/* Facebook Page Plugin */}
      <div className="w-full lg:w-1/2 xl:w-1/3 shadow-lg p-3 rounded-lg bg-white flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">עקבו אחרינו בפייסבוק</h2>
        <FacebookProvider appId="YOUR_FACEBOOK_APP_ID">
          <Page 
            href="https://www.facebook.com/harhomat"
            tabs="timeline"
            width="340"
            height="500"
            smallHeader={false}
            adaptContainerWidth={true}
            hideCover={false}
            showFacepile={true}
          />
        </FacebookProvider>
      </div>
    </div>
  );
};