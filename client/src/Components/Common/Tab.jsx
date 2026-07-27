import React from "react";

const Tab = ({ tabData, field, setField }) => {
  const activeType = field || tabData?.[0]?.type;
  const activeIndex = Math.max(0, tabData.findIndex((tab) => tab.type === activeType));

  return (
    <div className="account-type-tabs">
      <div className="tab-slider" style={{ transform: `translateX(${activeIndex * 100}%)` }} />
      {tabData.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-button ${activeType === tab.type ? "active" : ""}`}
          onClick={() => setField(tab.type)}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
