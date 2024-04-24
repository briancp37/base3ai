import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import OpticalObjectRecognition from './pages/OpticalObjectRecognition';
import ChatGPTPage from './pages/ChatGPTPage';
import Llamma3Page from './pages/Llamma3Page';
import Base3GPTPage from './pages/Base3GPTPage';
import TravelGPTPage from './pages/TravelGPTPage';
import './App.css';
// import './pages/ChatGPT.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/optical-object-recognition" element={<OpticalObjectRecognition />} />
          <Route path="/chatgpt" element={<ChatGPTPage />} />
          <Route path="/llamma3" element={<Llamma3Page />} />
          <Route path="/base3gpt" element={<Base3GPTPage />} />
          <Route path="/travelgpt" element={<TravelGPTPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;