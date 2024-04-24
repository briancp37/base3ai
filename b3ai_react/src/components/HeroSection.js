import React from 'react';
import backgroundVideo from '../images/waves.mp4';

const HeroSection = () => {
  return (
    <div className="hero">
      <video autoPlay loop muted id="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>Base3AI: 1.58bit LLMs</h1>
        <button>Learn more about Base3AI</button>
      </div>
    </div>
  );
};

export default HeroSection;