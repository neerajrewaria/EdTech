import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseCard from "./CourseCard";
import CourseBuilder from "./CourseBuilder";
import PublishSettings from "./PublishSettings";
import { fetchInstructorCourses, editCourseDetails, deleteCourse } from "../../../../services/operations/courseDetailsAPI";

function MyCourses({ initialCreate = false }) {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(initialCreate);
  const [showCourseBuilder, setShowCourseBuilder] = useState(false);
  const [showPublishSettings, setShowPublishSettings] = useState(false);
  const [newCourse, setNewCourse] = useState(null);
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  useEffect(() => {
    setShowCreateForm(initialCreate);
    if (initialCreate) {
      setNewCourse(null);
      setShowCourseBuilder(false);
      setShowPublishSettings(false);
    }
  }, [initialCreate]);

  useEffect(() => {
    const getCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    getCourses();
  }, [showCreateForm, showPublishSettings, token]); // Refetch when we close a form or finish a course

  const handleDeleteCourse = async (courseId) => {
    const result = await deleteCourse({ courseId }, token);
    if (result) {
      const updatedCourses = await fetchInstructorCourses(token);
      if (updatedCourses) setCourses(updatedCourses);
    }
  };

  const handleEditCourse = (course) => {
    setNewCourse(course);
    setShowCreateForm(true);
  };

  if (showCreateForm) {
    return (
      <div className="my-courses-page">
        <div className="my-courses-header">
          <h2>Add Course</h2>
          <button onClick={() => {
            setShowCreateForm(false);
            setNewCourse(null);
          }}>
            Back to My Courses
          </button>
        </div>

        <AddCourseForm
          course={newCourse}
          onCancel={() => {
            setShowCreateForm(false);
            setNewCourse(null);
          }}
          onCourseCreated={(newCourse) => {
            setNewCourse(newCourse);
            setShowCreateForm(false);
            setShowCourseBuilder(true);
          }}
        />
      </div>
    );
  }

  if (showCourseBuilder && newCourse) {
    return (
      <div className="my-courses-page">
        <CourseBuilder
          course={newCourse}
          onBack={() => {
            setShowCourseBuilder(false);
            setShowCreateForm(true);
          }}
          onFinish={(finalCourse) => {
            setNewCourse(finalCourse);
            setShowCourseBuilder(false);
            setShowPublishSettings(true);
          }}
        />
      </div>
    );
  }

  if (showPublishSettings && newCourse) {
    return (
      <div className="my-courses-page">
        <PublishSettings
          course={newCourse}
          onBack={() => {
            setShowPublishSettings(false);
            setShowCourseBuilder(true);
          }}
          onSave={async (finalCourse) => {
            // Important: Call API to save final status in DB
            const result = await editCourseDetails({
              courseId: finalCourse._id,
              status: finalCourse.status
            }, token);

            if (result) {
              setNewCourse(null);
              setShowPublishSettings(false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="inst-dashboard-wrapper">
      <div className="inst-dashboard-top-section">
        <h2 style={{ color: "white", fontSize: "2rem" }}>My Courses</h2>
        <button className="inst-add-course-btn" onClick={() => {
          setNewCourse(null);
          setShowCreateForm(true);
        }}>
          Add Course
        </button>
      </div>

      <div className="inst-courses-table">
        <div className="inst-table-header">
          <p>Courses</p>
          <p>Duration</p>
          <p>Price</p>
          <p>Actions</p>
        </div>

        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDeleteCourse}
              onEdit={handleEditCourse}
            />
          ))
        ) : (
          <div className="empty-courses-box">
            <h3>No courses created yet</h3>
            <p>Create your first course to start building your instructor catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
