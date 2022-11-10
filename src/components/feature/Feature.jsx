import React from "react";
import "./feature.css";

const Feature = ({ title, text }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="gpt3__features-container_feature-text">
      <p style={{ color: "#71E5FF" }}>{text}</p>
    </div>
  </div>
);

export default Feature;
