import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../services/operations/authAPI";
import { TbLogout } from "react-icons/tb";
import { VscAccount, VscMortarBoard, VscArchive, VscHistory, VscVm, VscSettingsGear } from "react-icons/vsc";
import './Sidebar.css'; // Importing your premium workspace design sheet

function Sidebar({ activePage, setActivePage }) {
  const { user } = useSelector((state) => state.profile);
  const accountType = user?.accountType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (page) => {
    if (page === "logout") {
      dispatch(logout());
      navigate("/login");
      return;
    }
    setActivePage(page);
  };

  // Extract initialization initials safely for the mini-profile circle avatar
  const userInitials = user?.firstname && user?.lastname 
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : user?.firstname 
      ? user.firstname[0].toUpperCase() 
      : "NR";

  return (
    <aside className="saas-sidebar-container">
      {/* Dynamic Embedded Workspace Identity Module */}
      <div className="saas-sidebar-profile-header">
        <div className="saas-avatar-circle">
          <span>{userInitials}</span>
          <div className="saas-active-pulse"></div>
        </div>
        <div className="saas-profile-details">
          <h4 className="saas-profile-name">{user?.firstname ? `${user.firstname} ${user.lastname || ''}` : "Neeraj Rewaria"}</h4>
          <span className="saas-profile-role-tag">{accountType || "Student Portal"}</span>
        </div>
      </div>

      {/* Main Context List Scroller */}
      <div className="saas-sidebar-scroll-wrapper">
        <div className="saas-menu-section">
          <span className="saas-section-caption">Core Workspace</span>
          <ul className="saas-menu-group">
            <li 
              className={`saas-menu-item ${activePage === "profile" ? "item-active" : ""}`}
              onClick={() => handleClick("profile")}
            >
              <VscAccount className="saas-menu-icon" />
              <span className="saas-menu-text">My Profile</span>
            </li>
          </ul>
        </div>

        {accountType === "Student" ? (
          <div className="saas-menu-section">
            <span className="saas-section-caption">Academic Tracks</span>
            <ul className="saas-menu-group">
              <li 
                className={`saas-menu-item ${activePage === "enrolledCourses" ? "item-active" : ""}`}
                onClick={() => handleClick("enrolledCourses")}
              >
                <VscMortarBoard className="saas-menu-icon" />
                <span className="saas-menu-text">Enrolled Courses</span>
              </li>

              <li 
                className={`saas-menu-item ${activePage === "wishlist" ? "item-active" : ""}`}
                onClick={() => handleClick("wishlist")}
              >
                <VscArchive className="saas-menu-icon" />
                <span className="saas-menu-text">Wishlist</span>
              </li>

              <li 
                className={`saas-menu-item ${activePage === "purchaseHistory" ? "item-active" : ""}`}
                onClick={() => handleClick("purchaseHistory")}
              >
                <VscHistory className="saas-menu-icon" />
                <span className="saas-menu-text">Purchase History</span>
              </li>

              <li 
                className={`saas-menu-item ${activePage === "courses" ? "item-active" : ""}`}
                onClick={() => handleClick("courses")}
              >
                <VscVm className="saas-menu-icon" />
                <span className="saas-menu-text">Explore Modules</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="saas-menu-section">
            <span className="saas-section-caption instructor-caption">Management Dashboard</span>
            <ul className="saas-menu-group">
              <li 
                className={`saas-menu-item ${activePage === "myCourses" ? "item-active" : ""}`}
                onClick={() => handleClick("myCourses")}
              >
                <VscVm className="saas-menu-icon instructor-icon" />
                <span className="saas-menu-text">My Courses</span>
              </li>
            </ul>
          </div>
        )}

        {/* Global Configuration Sections */}
        <div className="saas-menu-section system-footer-section">
          <span className="saas-section-caption">Preferences</span>
          <ul className="saas-menu-group">
            <li 
              className={`saas-menu-item ${activePage === "settings" ? "item-active" : ""}`}
              onClick={() => handleClick("settings")}
            >
              <VscSettingsGear className="saas-menu-icon" />
              <span className="saas-menu-text">Settings</span>
            </li>

            <li 
              className="saas-menu-item saas-logout-trigger"
              onClick={() => handleClick("logout")}
            >
              <TbLogout className="saas-menu-icon" />
              <span className="saas-menu-text">Sign Out</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;