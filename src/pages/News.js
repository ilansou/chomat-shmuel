import React from "react";
import { FacebookProvider, Page } from "react-facebook";
import { Chat } from "../components/Chat";
import PageFeedback from "../components/PageFeedback";

export const News = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Chat Component */}
            <div className="w-full h-[50] rounded-lg overflow-hidden">
              <Chat />
            </div>
            {/* Facebook Component */}
            <div className="w-full h-[600px] rounded-lg  overflow-hidden">
              <FacebookProvider appId="YOUR_FACEBOOK_APP_ID">
                <Page
                  href="https://www.facebook.com/harhomat"
                  tabs="timeline"
                  width="2000"
                  height="600"
                  smallHeader={true}
                  adaptContainerWidth={true}
                  hideCover={false}
                  showFacepile={true}
                />
              </FacebookProvider>
            </div>
          </div>

          {/* Page Feedback */}
          <div className="mt-5">
            <PageFeedback pageId="news and updates" />
          </div>
        </div>
      </div>
    </div>
  );
};
