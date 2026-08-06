import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch, FiSun, FiMoon, FiCode } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { useEffect } from 'react';
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

  // Purely cosmetic — does not touch app theme/state, matches the
  // sun/moon icon toggle shown in the reference design.
  const [isLightIcon, setIsLightIcon] = useState(false);

  // initialize theme from localStorage (or default to dark)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme_home');
      const isLight = saved === 'light';
      const homeRoot = document.querySelector('.home-page');
      if (homeRoot) {
        if (isLight) homeRoot.classList.add('light');
        else homeRoot.classList.remove('light');
      }
      if (isLight) document.documentElement.classList.add('light');
      else document.documentElement.classList.remove('light');
      setIsLightIcon(isLight);
    } catch (e) {
      // ignore
    }
  }, []);

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
      {/* ---------- Brand ---------- */}
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo-mark">
          <FiCode />
        </span>
        <span className="navbar-brand-name">NCodeX</span>
      </Link>

      {/* ---------- Center Links ---------- */}
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
        >
          Home
        </NavLink>

        <div className="catalog-dropdown">
          <div className="catalog-dropdown-trigger">
            <span>Courses</span>
            <RiArrowDropDownLine size={20} className="catalog-dropdown-icon" />
          </div>

          <div className="dropdown">
            {subLinks.map((item) => (
              <Link key={item._id} to={`/catalog/${item._id}`} className="dropdown-link">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
          About Us
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
          Contact Us
        </NavLink>
      </div>

      {/* ---------- Right Actions ---------- */}
      <div className="navbar-actions">
        <button type="button" className="navbar-icon-btn" aria-label="Search" title="Search">
          <FiSearch />
        </button>

        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={() => {
            const next = !isLightIcon;
            setIsLightIcon(next);
            try {
              const homeRoot = document.querySelector('.home-page');
              if (homeRoot) {
                if (next) {
                  homeRoot.classList.add('light');
                } else {
                  homeRoot.classList.remove('light');
                }
              }
              if (next) {
                document.documentElement.classList.add('light');
                localStorage.setItem('theme_home', 'light');
              } else {
                document.documentElement.classList.remove('light');
                localStorage.setItem('theme_home', 'dark');
              }
            } catch (e) { }
          }}
        >
          {isLightIcon ? <FiSun /> : <FiMoon />}
        </button>

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
                Sign In
              </Link>
              <Link to="/signup" className="navbar-button navbar-button-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <ProfileDropdown />
            </>
          )
        }
      </div>
    </nav>
  );
};
export default Navbar;
