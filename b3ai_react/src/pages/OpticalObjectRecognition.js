import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
// import ObjectRecognition from '../components/ObjectRecognition'; // Adjust the path as needed
import ObjectDetector from '../components/ObjectDetector';



const OpticalObjectRecognition = () => {
  return (
    <div>
      <Navbar />
      <ObjectDetector />
    </div>
  );
};

export default OpticalObjectRecognition;