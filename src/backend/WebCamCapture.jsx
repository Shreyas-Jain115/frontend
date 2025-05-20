import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCamera, FaSave, FaPlay, FaArrowRight } from "react-icons/fa";

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const questions = useLocation().state?.questions || [];

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setCapturedImage(imageDataUrl);
    }
  };

  const sendToBackend = async () => {
    if (!capturedImage) return;
    const uniqueInteger = 3;
    try {
      const response = await fetch("https://1w7vd0hz-5002.inc1.devtunnels.ms/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage,
          unique_id: uniqueInteger,
        }),
      });

      const result = await response.json();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  const handleContinue = () => {
    navigate("/fetch-data", { state: { questions } });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Webcam Capture</h1>
      <video
        ref={videoRef}
        autoPlay
        width="640"
        height="480"
        className="rounded-lg mb-6 shadow-lg"
      ></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
        <motion.button
          className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 shadow-md"
          onClick={startWebcam}
          whileHover={{ scale: 1.1 }}
        >
          <FaPlay /> <span>Start Webcam</span>
        </motion.button>

        <motion.button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 shadow-md"
          onClick={captureImage}
          whileHover={{ scale: 1.1 }}
        >
          <FaCamera /> <span>Capture Image</span>
        </motion.button>

        <motion.button
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-700 shadow-md"
          onClick={sendToBackend}
          whileHover={{ scale: 1.1 }}
        >
          <FaSave /> <span>Save</span>
        </motion.button>

        <motion.button
          className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-700 shadow-md"
          onClick={handleContinue}
          whileHover={{ scale: 1.1 }}
        >
          <FaArrowRight /> <span>Continue</span>
        </motion.button>
      </div>

      {capturedImage && (
        <motion.p
          className="mt-6 text-green-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Image captured! Ready to send.
        </motion.p>
      )}
    </motion.div>
  );
};

export default WebcamCapture;
