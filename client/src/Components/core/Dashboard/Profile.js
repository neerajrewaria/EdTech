import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import './Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const firstname = user?.firstname || "John";
  const lastname = user?.lastname || "Doe";
  const about = user?.about || user?.additionalDetails?.about || "";
  const dob = user?.dob || user?.additionalDetails?.dob || "";
  const gender = user?.gender || user?.additionalDetails?.gender || "";
  const contactNo = user?.contactNo || user?.additionalDetails?.contactNo || "";
  const initialProfile = { about, dob, gender, contactNo };

  const formattedDOB = dob && dob.includes("T") ? dob.split("T")[0] : dob;

  // Placeholder handler for name/email editing to be updated later
  const handleAccountMetaEditPlaceholder = (e) => {
    e.preventDefault();
    // Will be handled later by user
  };

  return (
    <div className="saas-profile-workspace">
      <div className="saas-workspace-header-strip">
        <h1 className="saas-workspace-title">Profile Settings</h1>
      </div>

      {!isEditing ? (
        <div className="saas-profile-layout-stack">
          
          {/* CONTAINER 1: Identity & Account Meta Block */}
          <header className="saas-profile-hero-card">
            <div className="saas-hero-identity-group">
              <div className="saas-avatar-frame">
                <img
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`}
                  alt="User Profile"
                  className="saas-avatar-image"
                />
              </div>
              <div className="saas-identity-text">
                <h2 className="saas-user-fullname">{firstname} {lastname}</h2>
                <div className="saas-identity-meta-labels">
                  <span className="saas-email-text">{user?.email || "neeraj@gmail.com"}</span>
                  <span className="saas-meta-dot">•</span>
                  <span className="saas-tier-badge">{user?.accountType || "Student"} Account</span>
                </div>
              </div>
            </div>
            
            {/* Non-functional placeholder edit trigger */}
            <button 
              className="saas-inline-edit-btn" 
              onClick={handleAccountMetaEditPlaceholder}
              type="button"
            >
              <RiEditBoxLine /> <span>Edit Account</span>
            </button>
          </header>

          {/* CONTAINER 2: Combined Unified Metadata Workspace */}
          <main className="saas-unified-details-card">
            <div className="saas-card-master-header">
              <h3 className="saas-card-section-main-title">Profile Details</h3>
              
              {/* Fully functional metadata edit state setter */}
              <button 
                className="saas-inline-edit-btn functional-accent-btn" 
                onClick={() => setIsEditing(true)}
                type="button"
              >
                <RiEditBoxLine /> <span>Edit Details</span>
              </button>
            </div>

            {/* Internal layout split for grouped contents */}
            <div className="saas-split-details-workspace">
              
              {/* Left Column Section: Biography */}
              <div className="saas-split-column-bio">
                <h4 className="saas-subsection-subheading">Professional Biography</h4>
                <p className="saas-biography-body">
                  {about || "Write something about yourself..."}
                </p>
              </div>

              {/* Right Column Section: Particulars */}
              <div className="saas-split-column-particulars">
                <h4 className="saas-subsection-subheading">Personal Particulars</h4>
                <div className="saas-metadata-vertical-stack">
                  <div className="saas-meta-item-box">
                    <span className="saas-meta-label">Contact Number</span>
                    <p className="saas-meta-value">{contactNo || "Add Contact Number"}</p>
                  </div>

                  <div className="saas-meta-item-box">
                    <span className="saas-meta-label">Date of Birth</span>
                    <p className="saas-meta-value">{formattedDOB || "Add DOB"}</p>
                  </div>

                  <div className="saas-meta-item-box">
                    <span className="saas-meta-label">Gender Orientation</span>
                    <p className="saas-meta-value saas-text-capitalize">{gender || "Add Gender"}</p>
                  </div>
                </div>
              </div>

            </div>
          </main>

        </div>
      ) : (
        <div className="saas-edit-form-wrapper-card">
          <EditProfile
            setIsEditing={setIsEditing}
            initialProfile={initialProfile}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;