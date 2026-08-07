import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch, FiSun, FiMoon, FiCode, FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../core/Auth/ProfileDropdown';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCourseListOpen, setIsCourseListOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
    fetchSubLinks();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar${isScrolled ? ' is-scrolled' : ''}`}>
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

      <button
        type="button"
        className={`navbar-mobile-toggle ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="More navigation options"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
        <span className="navbar-mobile-toggle-label">More</span>
      </button>

      {/* ---------- Right Actions ---------- */}
      <div className="navbar-actions">
        <button type="button" className="navbar-icon-btn" aria-label="Search" title="Search">
          <FiSearch />
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

        <Link to="/login" className="navbar-button navbar-button-primary">
          Get Started
        </Link>
      </div>

      <div className={`navbar-mobile-panel ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="navbar-mobile-group">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <button
            type="button"
            className={`navbar-mobile-link navbar-mobile-accordion ${isCourseListOpen ? 'is-open' : ''}`}
            onClick={() => setIsCourseListOpen((open) => !open)}
            aria-expanded={isCourseListOpen}
          >
            <span>Courses</span>
            <RiArrowDropDownLine size={18} />
          </button>

          <div className={`navbar-mobile-sublinks ${isCourseListOpen ? 'is-open' : ''}`}>
            {subLinks.map((item) => (
              <Link
                key={item._id}
                to={`/catalog/${item._id}`}
                className="navbar-mobile-sublink"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </NavLink>
        </div>

        <div className="navbar-mobile-actions">
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
          {user && user.AccountType !== 'Instructor' && (
            <Link to="/cart" className="navbar-cart-icon-container" onClick={() => setIsMenuOpen(false)}>
              <FaShoppingCart className="navbar-cart-icon" />
              {totalItems > 0 && <span className="navbar-cart-badge">{totalItems}</span>}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login" className="navbar-button navbar-button-ghost" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="navbar-button navbar-button-primary" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
