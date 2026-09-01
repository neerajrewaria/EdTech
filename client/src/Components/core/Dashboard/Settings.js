import React from 'react';
import { HiOutlineCog, HiOutlineShieldCheck, HiOutlineBell, HiOutlineLockClosed } from 'react-icons/hi';
import './Profile.css';

const Settings = () => {
  return (
    <div className="nx-workspace" style={{ padding: '36px 40px' }}>
      <div className="nx-card" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div className="nx-card-header">
          <div className="nx-card-title-group">
            <div className="nx-card-icon-badge">
              <HiOutlineCog />
            </div>
            <h3 className="nx-card-title">Account Settings</h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
          <div className="nx-info-tile">
            <span className="nx-tile-bar purple" />
            <div className="nx-tile-icon">
              <HiOutlineLockClosed />
            </div>
            <div className="nx-tile-content">
              <span className="nx-tile-label">Security & Password</span>
              <span className="nx-tile-value" style={{ fontSize: '0.9rem' }}>Password management & active sessions</span>
            </div>
          </div>

          <div className="nx-info-tile">
            <span className="nx-tile-bar sky" />
            <div className="nx-tile-icon">
              <HiOutlineBell />
            </div>
            <div className="nx-tile-content">
              <span className="nx-tile-label">Notification Preferences</span>
              <span className="nx-tile-value" style={{ fontSize: '0.9rem' }}>Course updates, announcements & emails</span>
            </div>
          </div>

          <div className="nx-info-tile">
            <span className="nx-tile-bar orange" />
            <div className="nx-tile-icon">
              <HiOutlineShieldCheck />
            </div>
            <div className="nx-tile-content">
              <span className="nx-tile-label">Privacy & Data</span>
              <span className="nx-tile-value" style={{ fontSize: '0.9rem' }}>Account visibility & data privacy controls</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;