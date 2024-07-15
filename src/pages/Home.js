import { EventList } from "../components/events/EventList";
import { Chat } from "../components/Chat";
import PageFeedback from "../components/PageFeedback";

export const Home = () => {
  return (
    <div className="pt-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-3/4 px-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden mt-14">
              <div className="bg-indigo-500 px-2 py-3">
                <h2 className="text-xl font-bold text-white">אירועים קרובים</h2>
              </div>
              <div className="p-3">
                <EventList />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 mt-14 px-0 mb-0 md:mb-0">
            <Chat />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="home" />
      </div>
    </div>
  );
};
