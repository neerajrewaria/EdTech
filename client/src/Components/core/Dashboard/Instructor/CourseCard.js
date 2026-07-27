import React from 'react'
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CourseCard = ({ course, onDelete, onEdit }) => {
  const imageUrl =
    typeof course.thumbnail === "string" ? course.thumbnail : "";

  return (
    <div className="inst-course-row-card">
      <div className="inst-course-info-col">
        {imageUrl ? (
          <img src={imageUrl} alt={course.courseName} className="inst-course-thumbnail" />
        ) : (
          <div className="inst-course-thumbnail-empty">No Image</div>
        )}

        <div className="inst-course-details">
          <h3 className="inst-course-title">{course.courseName}</h3>
          <p className="inst-course-desc">{course.courseDescription}</p>
          <p className="inst-course-meta">
            Created: {course.createdAt || "Not published yet"}
          </p>

          <span className={`inst-status-badge ${course.status === "Published" ? "published" : "drafted"}`}>
            {course.status || "Drafted"}
          </span>
        </div>
      </div>

      <div className="inst-course-duration">2h 30m</div> {/* Hardcoded for UI check as requested */}
      <div className="inst-course-price">Rs. {course.price}</div>

      <div className="inst-course-actions">
        <button
          type="button"
          className="inst-action-btn edit"
          aria-label="Edit course"
          onClick={() => onEdit(course)}
        >
          <FiEdit2 />
        </button>

        <button
          type="button"
          className="inst-action-btn delete"
          aria-label="Delete course"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
              onDelete(course._id);
            }
          }}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default CourseCard
