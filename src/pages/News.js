import React from "react";
import { FacebookProvider, Page } from 'react-facebook';
import { Chat } from '../components/Chat';
import PageFeedback from '../components/PageFeedback'; // Adjust the import path as needed

export const News = () => {

  return (
    <div className="flex flex-col pt-28 px-4 lg:px-20 pb-20 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex flex-col w-full lg:w-1/2 items-center">
          <Chat />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 items-center">
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
      <div className="w-full">
        <PageFeedback pageId="news and updates" />
      </div>
    </div>
  );
};