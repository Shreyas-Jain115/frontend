import React, { useEffect, useRef } from "react";
import axios from "axios";
import {API_URL} from "./api"; // Adjust the import path as necessary

const EyeBallTrack = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const resultRef = useRef({
        gaze_detection: "Waiting...",
        device_detection: "Waiting...",
        multiple_faces: "Waiting...",
        identity_verification: "Waiting...",
        liveness: "Waiting..."
    });

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startCamera();
        const interval = setInterval(captureFrame, 1000);
        return () => clearInterval(interval);
    }, []);

    const captureFrame = async () => {
        const currentSeconds = new Date().getSeconds();
        const currentTime = new Date().toString();
            if(currentSeconds % 5 !== 0) 
                return; // Skip if not divisible by 5
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("frame", blob, "frame.jpg");
            formData.append("userId", 3); // Add userId to formData
            formData.append("currentTime", currentTime); // Add unique_id to formData
            try {
                const response = await axios.post(`${API_URL}/process`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Update values without re-rendering
                resultRef.current = {
                    gaze_detection: response.data.gaze_detection?.gaze_status || "Unknown",
                    device_detection: response.data.device_detection?.device_detection || "Unknown",
                    multiple_faces: response.data.multiple_faces?.multiple_faces || "Unknown",
                    identity_verification: response.data.identity_verification?.identity_status || "Unknown",
                    liveness: response.data.liveness_detection || "Unknown",
                };

                // Manually trigger a UI update
                document.getElementById("gaze_detection").innerText = resultRef.current.gaze_detection;
                document.getElementById("device_detection").innerText = resultRef.current.device_detection;
                document.getElementById("multiple_faces").innerText = resultRef.current.multiple_faces;
                document.getElementById("identity_verification").innerText = resultRef.current.identity_verification;
                document.getElementById("liveness_detection").innerText = resultRef.current.liveness;

                console.log("Response from server:", response.data);
            } catch (error) {
                console.error("Error sending frame:", error.message);
            }
        }, "image/jpeg");
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">Eye & Device Tracking</h1>
            <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border"  />
            <canvas ref={canvasRef} width="640" height="480" hidden />
            <div className="mt-4 p-4 border rounded bg-gray-100">
                <p><strong>Gaze Detection:</strong> <span id="gaze_detection">{resultRef.current.gaze_detection}</span></p>
                <p><strong>Device Detection:</strong> <span id="device_detection">{resultRef.current.device_detection}</span></p>
                <p><strong>Multiple Faces:</strong> <span id="multiple_faces">{resultRef.current.multiple_faces}</span></p>
                <p><strong>Identity Verification:</strong> <span id="identity_verification">{resultRef.current.identity_verification}</span></p>
                <p><strong>Liveness Detection:</strong> <span id="liveness_detection">{resultRef.current.liveness}</span></p>
            </div>
        </div>
    );
};

export default EyeBallTrack;





