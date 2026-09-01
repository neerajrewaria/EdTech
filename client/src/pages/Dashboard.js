import React from 'react';
import Sidebar from '../Components/core/Dashboard/Sidebar';
import Profile from '../Components/core/Dashboard/Profile';
import CartPage from '../pages/CartPage';
import Settings from '../Components/core/Dashboard/Settings';
import EnrolledCourses from '../Components/core/Dashboard/EnrolledCourses';
import PurchaseHistory from '../Components/core/Dashboard/PurchaseHistory';
import { useState } from 'react';
import MyCourses from "../Components/core/Dashboard/Instructor/MyCourses";
import { useLocation } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const initialPage = location?.state?.activePage || "profile";
  const [activePage, setActivePage] = useState(initialPage);

  return (
    <div className="nx-dashboard-wrapper">
      {/* Flex row: sidebar + content */}
      <div className="nx-dashboard-shell">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="nx-dashboard-main">
          {activePage === "profile"         && <Profile />}
          {activePage === "wishlist"        && <CartPage />}
          {activePage === "settings"        && <Settings />}
          {activePage === "enrolledCourses" && <EnrolledCourses />}
          {activePage === "purchaseHistory" && <PurchaseHistory />}
          {activePage === "myCourses"       && <MyCourses />}
          {activePage === "addCourse"       && <MyCourses initialCreate={true} />}
        </div>
      </div>
      {/* Footer spans FULL width — outside the flex shell */}
      <Footer />
    </div>
  );
}

export default Dashboard;