import React from 'react';

import logo from '../logo.svg';
import Navbar from '../components/Navbar'; 
import HeroSection from '../components/HeroSection';


import './HomePage.css';



function HomePage() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        {/* <div className="home-below-hero">fds</div> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }

  export default HomePage;