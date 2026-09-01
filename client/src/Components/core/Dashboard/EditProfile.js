import React, { useState } from "react";
import { updateProfile } from "../../../services/operations/profileAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditProfile({ setIsEditing, initialProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Existing functional state — completely unchanged ──
  const [ProfileData, setProfileData] = useState({
    about:     initialProfile?.about     || "",
    dob:       initialProfile?.dob       || "",
    gender:    initialProfile?.gender    || "",
    contactNo: initialProfile?.contactNo || "",
  });

  const handleProfileData = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { about, dob, gender, contactNo } = ProfileData;

  // ── Existing functional submit — completely unchanged ──
  const fetchProfileData = async (e) => {
    e.preventDefault();
    console.log("SAVE CLICKED");
    console.log("BEFORE DISPATCH");
    await dispatch(
      updateProfile({ dob, gender, contactNo, about, setIsEditing, navigate })
    );
    console.log("AFTER DISPATCH");
  };

  return (
    <form onSubmit={fetchProfileData}>
      <div className="nx-form-grid">

        {/* Biography — full width */}
        <div className="nx-fg wide">
          <label>Professional Biography</label>
          <textarea
            name="about"
            value={about}
            onChange={handleProfileData}
            placeholder="Tell the NCodeX community about your background, expertise, and learning goals..."
          />
        </div>

        {/* Contact */}
        <div className="nx-fg">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNo"
            value={contactNo}
            onChange={handleProfileData}
            placeholder="+91 00000 00000"
          />
        </div>

        {/* DOB */}
        <div className="nx-fg">
          <label>Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={dob}
            onChange={handleProfileData}
          />
        </div>

        {/* Gender */}
        <div className="nx-fg">
          <label>Gender</label>
          <select name="gender" value={gender} onChange={handleProfileData}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

      </div>

      <div className="nx-form-actions">
        <button type="button" className="nx-btn-cancel" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="nx-btn-save">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditProfile;