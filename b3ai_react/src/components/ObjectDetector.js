import React, { useEffect, useRef, useState } from 'react';
import ml5 from 'ml5';
import './ObjectDetector.css'; // Assume you've placed your CSS here



const ObjectDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [fps, setFps] = useState(50);
//   let objectDetector;
  const objectDetector = useRef(null);

  useEffect(() => {
    // Load ML5.js model
    // const ml5 = window.ml5;
    // objectDetector = ml5.objectDetector('cocossd', {}, () => {
    objectDetector.current = ml5.objectDetector('cocossd', {}, () => {
      console.log("Model Loaded!");
      setLoading(false);
    });

    // Access the webcam
    const constraints = {
      audio: false,
      video: {
        facingMode: "environment"
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // Start rendering the video and canvas
    const timer = setInterval(() => {
      if (videoRef.current && canvasRef.current && !loading) {
        const context = canvasRef.current.getContext('2d');
        setCanvasResolution();
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        if (aiEnabled) {
          performDetection(context);
        }
      }
    }, 1000 / fps);

    // Cleanup function
    return () => clearInterval(timer);
  }, [aiEnabled, fps, loading]);

  const setCanvasResolution = () => {
    // Implement resolution adjustment logic
  };

  const performDetection = (context) => {
    objectDetector.current.detect(canvasRef.current, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      // Drawing detection results
      results.forEach(element => {
        context.font = "15px Arial";
        context.fillStyle = "red";
        context.fillText(`${element.label} - ${(element.confidence * 100).toFixed(2)}%`, element.x + 10, element.y + 15);
        context.beginPath();
        context.strokeStyle = "red";
        context.rect(element.x, element.y, element.width, element.height);
        context.stroke();
      });
    });
  };

  return (
    <div>
      {loading && <h2 id="loading_text">Loading...</h2>}
      <video ref={videoRef} playsInline autoPlay muted controls={true} id="video"></video>
      <canvas ref={canvasRef} id="c1"></canvas>

      {/* Switches and Range Inputs */}
      <div>
        {/* AI Toggle */}
        <label>
          <input type="checkbox" disabled={loading} checked={aiEnabled} onChange={() => setAiEnabled(!aiEnabled)} />
          <span>{aiEnabled ? 'On' : 'Off'}</span>
        </label>

        {/* FPS Range */}
        <input type="range" min="1" max="60" value={fps} onChange={(e) => setFps(e.target.value)} />
      </div>
    </div>
  );
};

export default ObjectDetector;
