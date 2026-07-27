import React, { useState } from "react";
import { updateProfile } from "../../../services/operations/profileAPI";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function EditProfile({ setIsEditing, initialProfile }) {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const [ProfileData, setProfileData] = useState({
    about: initialProfile?.about || "",
    dob: initialProfile?.dob || "",
    gender: initialProfile?.gender || "",
    contactNo: initialProfile?.contactNo || "",
  });

  const handleProfileData = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { about, dob, gender, contactNo } = ProfileData;   //destructing data


  const fetchProfileData = async (e) => {
    e.preventDefault();
    
  console.log("SAVE CLICKED");
 
    console.log("BEFORE DISPATCH");

await dispatch(
  updateProfile({
    dob,
    gender,
    contactNo,
    about,
    setIsEditing,
    navigate
  })
);

console.log("AFTER DISPATCH");
  };
  
  return (
    <div className="profile-container">

      <h1 className="profile-title">
        Edit Profile
      </h1>

      <div className="profile-details-card">

        <div className="form-group">
          <label>About</label>
          <textarea
            name="about"
            value={about}
            onChange={handleProfileData}
          />
        </div>

        <div className="form-group">
          <label>Date Of Birth</label>
          <input
            name="dob"
            type="date"
            value={dob}
            onChange={handleProfileData}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleProfileData}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNo"
            value={contactNo}
            onChange={handleProfileData}
          />
        </div>

        <div className="edit-buttons">

          <button
            className="cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>

          <button className="save-btn" onClick={fetchProfileData}>
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;