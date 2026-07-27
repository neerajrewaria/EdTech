import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEnrolledCourses } from '../../../services/operations/profileAPI';

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      setLoading(true);
      const result = await fetchEnrolledCourses(token, dispatch);
      if (result) {
        setEnrolledCourses(result);
      }
      setLoading(false);
    };

    if (token) {
      getEnrolledCourses();
    }
  }, [token, dispatch]);

  if (loading) {
    return (
      <div className="enrolled-courses-container">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="enrolled-courses-container">
      <h2 className="enrolled-courses-title">Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <div className="enrolled-courses-empty">
          <p>You have not enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="navbar-button-primary"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="enrolled-courses-list">
          <div className="list-header">
            <p className="header-col-name">Course Name</p>
            <p className="header-col-duration">Duration</p>
            <p className="header-col-progress">Progress</p>
          </div>
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`course-row ${i === arr.length - 1 ? "last-row" : ""}`}
              key={course._id}
              onClick={() => navigate(`/view-course/${course._id}`)}
            >
              <div className="course-name-section">
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="course-thumbnail-small"
                />
                <div className="course-text">
                  <p className="course-name-text">{course.courseName}</p>
                  <p className="course-desc-text">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="course-duration-section">
                2h 30m
              </div>
              <div className="course-progress-section">
                <p className="progress-status-text">Progress: 0%</p>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;