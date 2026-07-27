import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";
import { addCourseDetails, editCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

function AddCourseForm({ onCancel, onCourseCreated, course }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [formData, setFormData] = useState({
    courseName: course?.courseName || "",
    courseDescription: course?.courseDescription || "",
    price: course?.price || "",
    category: course?.category || "",
    tag: course?.tag?.map(t => t.name || t).join(", ") || "",
    whatYouWillLearn: course?.whatYouWillLearn || "",
    instructions: course?.instructions || "",
    thumbnail: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnail || null);

  const token = localStorage.getItem("token")?.replace(/"/g, ""); // Retrieve token for Auth

  const {
    courseName,
    courseDescription,
    price,
    category,
    tag,
    whatYouWillLearn,
    instructions,
  } = formData;

  useEffect(() => {
    const getCategories = async () => {
      setLoadingCategories(true);

      try {
        // This API gets all categories from DB, so instructor can select one.
        const response = await apiConnector("GET", categories.CATEGORIES_API);

        if (response?.data?.success) {
          setCategoryList(response.data.data || []);
        }
      } catch (error) {
        console.log("Could not fetch categories", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // 2MB check for images
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Please select an image smaller than 2MB");
      e.target.value = "";
      return;
    }

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // If we have a course prop, we are EDITING
    const data = new FormData();
    if (course) data.append("courseId", course._id);

    data.append("courseName", formData.courseName);
    data.append("courseDescription", formData.courseDescription);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("whatYouWillLearn", formData.whatYouWillLearn);
    data.append("tag", formData.tag);
    data.append("instructions", formData.instructions);

    // Only append thumbnail if a new file was actually selected
    if (formData.thumbnail) {
      try {
        const options = {
          maxSizeMB: 1,            // Max size 1MB
          maxWidthOrHeight: 1920, // Max dimensions
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(formData.thumbnail, options);
        // Maintain original name for backend consistency
        const renamedFile = new File([compressedFile], formData.thumbnail.name, {
          type: formData.thumbnail.type,
        });

        data.append("thumbnail", renamedFile);
      } catch (error) {
        console.log("Compression Error:", error);
        data.append("thumbnail", formData.thumbnail); // Fallback to original
      }
    }

    if (course) {
      const result = await editCourseDetails(data, token);
      if (result) onCourseCreated(result);
    } else {
      const result = await addCourseDetails(data, token);
      if (result) onCourseCreated(result);
    }
  };

  return (
    <form className="add-course-form" onSubmit={handleOnSubmit}>
      <h2>Course Information</h2>

      <label className="add-course-label">
        <span className="add-course-label-text">Course Title <span className="required-star">*</span></span>
        <input
          required
          type="text"
          name="courseName"
          value={courseName}
          onChange={handleOnChange}
          placeholder="Enter Course Title"
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Course Short Description <span className="required-star">*</span></span>
        <textarea
          required
          name="courseDescription"
          value={courseDescription}
          onChange={handleOnChange}
          placeholder="Enter Description"
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Price <span className="required-star">*</span></span>
        <input
          required
          type="number"
          name="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Enter Price"
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Category <span className="required-star">*</span></span>
        <select
          required
          name="category"
          value={category}
          onChange={handleOnChange}
          disabled={loadingCategories}
        >
          <option value="">
            {loadingCategories ? "Loading Categories..." : "Choose a Category"}
          </option>

          {categoryList.map((singleCategory) => (
            // We save _id because backend needs category id while creating course.
            <option key={singleCategory._id} value={singleCategory._id}>
              {singleCategory.name}
            </option>
          ))}
        </select>
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Tags <span className="required-star">*</span></span>
        <input
          required
          type="text"
          name="tag"
          value={tag}
          onChange={handleOnChange}
          placeholder="Choose a Tag"
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Course Thumbnail <span className="required-star">*</span></span>

        {thumbnailPreview && (
          <div className="thumbnail-preview-container">
            <img
              src={thumbnailPreview}
              alt="Preview"
              style={{ width: "200px", borderRadius: "8px", marginBottom: "10px", display: "block" }}
            />
          </div>
        )}

        <input
          required={!course} // Thumbnail is only required when creating, not when editing
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Benefits of the course <span className="required-star">*</span></span>
        <textarea
          required
          name="whatYouWillLearn"
          value={whatYouWillLearn}
          onChange={handleOnChange}
          placeholder="Enter Benefits of the course"
        />
      </label>

      <label className="add-course-label">
        <span className="add-course-label-text">Requirements/Instructions <span className="required-star">*</span></span>
        <textarea
          required
          name="instructions"
          value={instructions}
          onChange={handleOnChange}
          placeholder="Enter Requirements/Instructions"
        />
      </label>

      <button type="submit">Next</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default AddCourseForm;
