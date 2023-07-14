import React, { useState } from "react";
import "./style.css";
import "./responsive.css";

const VisualTabs = ({ tabs, propertyDetailsData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={index === activeTab ? "active" : ""}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default VisualTabs;
// import React, { useState } from 'react';

// const VisualTabs = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <div className="tabs">
//       <div className="tab-buttons">
//         <button
//           onClick={() => handleTabClick(0)}
//           className={activeTab === 0 ? 'active' : ''}
//         >
//           Tab 1
//         </button>
//         <button
//           onClick={() => handleTabClick(1)}
//           className={activeTab === 1 ? 'active' : ''}
//         >
//           Tab 2
//         </button>
//         <button
//           onClick={() => handleTabClick(2)}
//           className={activeTab === 2 ? 'active' : ''}
//         >
//           Tab 3
//         </button>
//       </div>
//       <div className="tab-content">
//         {activeTab === 0 &&
//         <div>
//           <p>Hello</p>
//           <p>Hello</p>
//         </div>
//         }
//         {activeTab === 1 && <p>Content for tab 2 goes here</p>}
//         {activeTab === 2 && <p>Content for tab 3 goes here</p>}
//       </div>
//     </div>
//   );
// };

// export default VisualTabs;
