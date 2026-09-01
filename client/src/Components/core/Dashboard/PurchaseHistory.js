import React from 'react';
import { HiOutlineClock, HiOutlineReceiptTax } from 'react-icons/hi';
import './Profile.css';

const PurchaseHistory = () => {
  return (
    <div className="nx-workspace" style={{ padding: '36px 40px' }}>
      <div className="nx-card" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div className="nx-card-header">
          <div className="nx-card-title-group">
            <div className="nx-card-icon-badge">
              <HiOutlineClock />
            </div>
            <h3 className="nx-card-title">Purchase History</h3>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
          <HiOutlineReceiptTax style={{ fontSize: '3rem', color: '#6366f1', marginBottom: '16px' }} />
          <h4 style={{ color: 'var(--text-primary, #f8fafc)', fontSize: '1.2rem', margin: '0 0 8px' }}>
            No transaction records found
          </h4>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>
            Your course purchases and receipts will be recorded here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;