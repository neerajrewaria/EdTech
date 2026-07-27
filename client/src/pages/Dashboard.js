import React from 'react';
import Sidebar from '../Components/core/Dashboard/Sidebar';
import Profile from '../Components/core/Dashboard/Profile';
import Wishlist from '../Components/core/Dashboard/Wishlist';
import CartPage from '../pages/CartPage'; // Import CartPage
import Settings from '../Components/core/Dashboard/Settings';
import EnrolledCourses from '../Components/core/Dashboard/EnrolledCourses';
import PurchaseHistory from '../Components/core/Dashboard/PurchaseHistory';
import { useState } from 'react';
import MyCourses from "../Components/core/Dashboard/Instructor/MyCourses";

import { useLocation } from 'react-router-dom';
import Footer from '../Components/Common/Footer';

function Dashboard() {
  const location = useLocation();
  const initialPage = location?.state?.activePage || "profile";
  const [activePage, setActivePage] = useState(initialPage);


  return (

    <div>

   
    <div className="dashboard-container">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="dashboard-content">

        {activePage === "profile" && <Profile />}
        {activePage === "wishlist" && <CartPage />}
        {activePage === "settings" && <Settings />}
        {activePage === "enrolledCourses" && <EnrolledCourses />}
        {activePage === "purchaseHistory" && <PurchaseHistory />}
        {activePage === "myCourses" && <MyCourses />}

      </div>

    </div>
    <Footer/>
     </div>
  );
}

export default Dashboard;