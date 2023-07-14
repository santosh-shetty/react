import React from "react";
import "./style.css";

const HotProperties = ({ hotProperty, setHotProperty }) => {
  return (
    <div>
      <section id="model-54">
        <div className="card">
          <div className="toggle">
            <input
              type="checkbox"
              id="check-54"
              data-id={hotProperty}
              checked={hotProperty}
              onChange={(e) => setHotProperty(e.target.checked)}
            />
            <label htmlFor="check-54"></label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotProperties;
