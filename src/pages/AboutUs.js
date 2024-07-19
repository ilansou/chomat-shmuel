import React, { useEffect } from "react";
import { useAbout } from "../hooks/useAbout";
import { Section } from "../components/about/Section";
import { useAuth } from "../contexts/AuthContext";
import StaffManagement from "../components/about/StaffManagement";
import PageFeedback from "../components/PageFeedback";

const AboutUs = () => {
  const { user } = useAuth();
  const {
    sectionList,
    getSectionList,
    addSection,
    removeSection,
    editSection,
    addSubheader,
    removeSubheader,
    editSubheader,
  } = useAbout();

  useEffect(() => {
    getSectionList();
  }, [getSectionList]);

  const handleAddSection = () => {
    addSection();
  };

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">קצת עלינו</h1>

      {sectionList.map((section) => (
        <Section
          key={section.id}
          section={section}
          onRemove={removeSection}
          onEdit={editSection}
          onAddSubheader={addSubheader}
          onRemoveSubheader={removeSubheader}
          onEditSubheader={editSubheader}
        />
      ))}

      {user && (
        <div className="flex justify-end">
          <button
            onClick={handleAddSection}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            הוסף כרטיס אודות
          </button>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-8">הנהלה וצוות המנהל</h1>
      <StaffManagement type="managers" />
      <StaffManagement type="team" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="AboutUs" />
      </div>
    </div>
  );
};

export default AboutUs;
