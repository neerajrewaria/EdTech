import React, { useState } from "react";
import { createSection, createSubSection } from "../../../../services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";

function CourseBuilder({ course, onBack, onFinish }) {
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState(course.courseContent || []);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    video: null,
    durationHours: "",
    durationMinutes: "",
    durationSeconds: "",
  });

  const {
    title,
    description,
    durationHours,
    durationMinutes,
    durationSeconds,
  } = lectureData;

  const handleLectureChange = (e) => {
    setLectureData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    // 20MB check (20 * 1024 * 1024 bytes)
    if (file && file.size > 20 * 1024 * 1024) {
      toast.error("keep the video size below 20 mb");
      e.target.value = ""; // Clear the input field
      return;
    }

    setLectureData((prevData) => ({
      ...prevData,
      video: file,
    }));
  };

  const handleAddSection = async (e) => {
    e.preventDefault();

    const result = await createSection({
      sectionName,
      courseId: course._id,
      sectionDescription: "Default Section Description", // Sending a default description, can be made dynamic later
    }, token);

    if (result) {
      setSections(result.courseContent);
      setSectionName("");
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    console.log("Save Lecture button clicked");

    const timeDuration = `${durationHours || 0}h ${durationMinutes || 0}m ${durationSeconds || 0}s`;

    const formData = new FormData();
    formData.append("sectionId", activeSectionId);
    formData.append("title", lectureData.title);
    formData.append("description", lectureData.description);
    formData.append("video", lectureData.video);
    formData.append("timeDuration", timeDuration);

    // Debug: log form data keys (optional)
    console.log("Sending Lecture Data for Section:", activeSectionId);

    const result = await createSubSection(formData, token);

    console.log("Result from createSubSection:", result);

    if (result) {
      // Update the specific section in our state list
      const updatedSections = sections.map((section) =>
        section._id === activeSectionId ? result : section
      );

      setSections(updatedSections);
      setActiveSectionId(null);
      setLectureData({ title: "", description: "", video: null, durationHours: "", durationMinutes: "", durationSeconds: "" });
    }
  };

  const handleFinish = () => {
    const finalCourse = {
      ...course,
      courseContent: sections,
    };

    onFinish(finalCourse);
  };

  return (
    <div className="course-builder">
      <div className="course-builder-top">
        <div>
          <p>Course Builder</p>
          <h2>{course.courseName}</h2>
        </div>

        <button type="button" onClick={onBack}>
          Back
        </button>
      </div>

      <form className="section-form" onSubmit={handleAddSection}>
        <label className="add-course-label">
          <span className="add-course-label-text">
            Section Name <span className="required-star">*</span>
          </span>

          <input
            required
            type="text"
            name="sectionName"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Enter section name, like Lesson 1"
          />
        </label>

        <button type="submit">Add Section</button>
      </form>

      <div className="section-list">

        {sections.length === 0 ? (
          <div className="empty-builder-box">
            <h3>No sections added yet</h3>
            <p>Add your first section, then add lectures inside it.</p>
          </div>
        ) : (
          sections.map((section) => (
            <div className="section-box" key={section._id}>
              <div className="section-box-header">
                <h3>{section.sectionName}</h3>

                <button
                  type="button"
                  onClick={() => setActiveSectionId(section._id)}
                >
                  Add Lecture
                </button>
              </div>

              {section.subSection?.length > 0 && (
                <div className="lecture-list">
                  {section.subSection?.map((lecture) => (
                    <div className="lecture-item" key={lecture._id}>
                      <div>
                        <h4>{lecture.title}</h4>
                        <p>{lecture.description}</p>
                        <p className="lecture-video-name">
                          Video: {lecture.video?.name || "Selected video"}
                        </p>
                      </div>

                      <span>{lecture.timeDuration}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeSectionId === section._id && (
                <form className="lecture-form" onSubmit={handleAddLecture}>
                  <label className="add-course-label">
                    <span className="add-course-label-text">
                      Lecture Title <span className="required-star">*</span>
                    </span>
                    <input
                      required
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleLectureChange}
                      placeholder="Enter lecture title"
                    />
                  </label>

                  <label className="add-course-label">
                    <span className="add-course-label-text">
                      Lecture Description <span className="required-star">*</span>
                    </span>
                    <textarea
                      required
                      name="description"
                      value={description}
                      onChange={handleLectureChange}
                      placeholder="Enter lecture description"
                    />
                  </label>

                  <label className="add-course-label">
                    <span className="add-course-label-text">
                      Lecture Video <span className="required-star">*</span>
                    </span>
                    <input
                      required
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                  </label>

                  <label className="add-course-label">
                    <span className="add-course-label-text">
                      Duration <span className="required-star">*</span>
                    </span>

                    <div className="duration-inputs">
                      <input
                        required
                        type="number"
                        name="durationHours"
                        value={durationHours}
                        onChange={handleLectureChange}
                        placeholder="Hrs"
                        min="0"
                      />

                      <input
                        required
                        type="number"
                        name="durationMinutes"
                        value={durationMinutes}
                        onChange={handleLectureChange}
                        placeholder="Min"
                        min="0"
                        max="59"
                      />

                      <input
                        required
                        type="number"
                        name="durationSeconds"
                        value={durationSeconds}
                        onChange={handleLectureChange}
                        placeholder="Sec"
                        min="0"
                        max="59"
                      />
                    </div>
                  </label>

                  <div className="lecture-form-buttons">
                    <button type="submit">Save Lecture</button>
                    <button type="button" onClick={() => setActiveSectionId(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>

      <div className="course-builder-actions">
        <button type="button" onClick={handleFinish} disabled={sections.length === 0}>
          Save Course
        </button>
      </div>
    </div>
  );
}

export default CourseBuilder;
