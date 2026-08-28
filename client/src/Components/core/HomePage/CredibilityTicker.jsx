import React from 'react';
import { FiCode, FiCpu, FiTerminal, FiShield, FiZap, FiLayers, FiCheckCircle } from 'react-icons/fi';

const tickerItems = [
  { icon: <FiTerminal />, label: "In-Browser Code Execution Engine" },
  { icon: <FiCpu />, label: "Production-Simulated Architecture" },
  { icon: <FiShield />, label: "Verified Blockchain Credentials" },
  { icon: <FiZap />, label: "1-on-1 Mentor Code Reviews" },
  { icon: <FiLayers />, label: "Job-Ready Engineering Roadmaps" },
  { icon: <FiCode />, label: "Full-Stack & Cloud System Specs" },
  { icon: <FiCheckCircle />, label: "Zero-Latency Interactive Labs" },
];

const CredibilityTicker = () => {
  return (
    <section className="ncodex-ticker-section" aria-label="Platform capabilities ticker">
      <div className="ticker-track">
        {tickerItems.concat(tickerItems).map((item, index) => (
          <React.Fragment key={index}>
            <div className="ticker-item">
              <span className="ticker-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="ticker-separator" />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default CredibilityTicker;
