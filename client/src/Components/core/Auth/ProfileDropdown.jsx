import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile) || {};
  const profileImage = user?.image || "https://api.dicebear.com/5.x/initials/svg?seed=User";

  return (  
    <div className="profile-dropdown">
      <Link to="/dashboard" className="dashboard-link">
        <img src={profileImage} alt="Profile" className="profile-image-small" />
      </Link>
    </div>
  );
};

export default ProfileDropdown;