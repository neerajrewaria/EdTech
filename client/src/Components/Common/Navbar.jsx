import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Logo from '../../assests/Images/Logo.png';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { useState, useEffect } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { RiArrowDropDownLine } from "react-icons/ri";
import './Navbar.css';

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const totalItems = cart.length;
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector(
        "GET",
        categories.CATEGORIES_API
      );
      console.log("Category List", result.data.data);
      setSubLinks(result?.data?.data || []);
    }
    catch (error) {
      console.log("Could not fetch the category list");
    }
  }

  useEffect(() => {
    fetchSubLinks()
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={Logo} alt="NCodeX logo" className="navbar-logo" />
        <span>NCodeX</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Home</NavLink>
        <div className='catalog-dropdown'>

          <div className="catalog-dropdown-trigger">
            <span>Catalog</span>
            <RiArrowDropDownLine size={22} className="catalog-dropdown-icon" />
          </div>



          <div className='dropdown'>
            {
              subLinks.map((item) => (
                <Link key={item._id} to={`/catalog/${item._id}`} className='dropdown-link'>{item.name}</Link>
              ))}
          </div>
        </div>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Contact Us</NavLink>
      </div>
      <div className="navbar-actions">
        {/* login/singup/dashboard */}
        {
          user && user.AccountType !== "Instructor" && (
            <Link to="/cart" className="navbar-cart-icon-container">
              <FaShoppingCart className="navbar-cart-icon" />
              {totalItems > 0 && (
                <span className="navbar-cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>
          )
        }
        {
          token === null ? (
            <>
              <Link to="/login" className="navbar-button navbar-button-ghost">
                Login
              </Link>
              <Link to="/signup" className="navbar-button navbar-button-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* { user && user.AccountType!=="Instructor" && <CartIcon />} */}
              <ProfileDropdown />
            </>
          )
        }
      </div>
    </nav>
  );
};
export default Navbar;
