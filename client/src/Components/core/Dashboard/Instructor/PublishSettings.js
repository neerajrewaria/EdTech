import React, { useState } from "react";

function PublishSettings({ course, onBack, onSave }) {
  const [makePublic, setMakePublic] = useState(false);

  const handleSaveDraft = () => {
    onSave({
      ...course,
      status: "Drafted",
    });
  };

  const handleSavePublish = () => {
    onSave({
      ...course,
      status: makePublic ? "Published" : "Drafted",
    });
  };

  return (
    <div className="publish-settings">
      <div className="publish-settings-card">
        <h2>Publish Settings</h2>

        <label className="publish-checkbox-label">
          <input
            type="checkbox"
            checked={makePublic}
            onChange={(e) => setMakePublic(e.target.checked)}
          />
          Make this Course Public
        </label>
      </div>

      <div className="publish-actions">
        <button type="button" className="publish-back-btn" onClick={onBack}>
          Back
        </button>

        <div className="publish-right-actions">
          <button type="button" className="publish-draft-btn" onClick={handleSaveDraft}>
            Save as a Draft
          </button>

          <button type="button" className="publish-main-btn" onClick={handleSavePublish}>
            Save and Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishSettings;
