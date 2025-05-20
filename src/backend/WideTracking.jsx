import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db1 } from "../firebaseConfig"; // Updated to use db1

const WideTracking = () => {
    let userId = "fff112";
    const url="https://1w7vd0hz-5000.inc1.devtunnels.ms/";
    const canvasRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [fetching, setFetching] = useState(false);
    const resultRef = useRef({
        person: "Waiting...",
        electronic_devices: "Waiting...",
        notebook: "Waiting...",
        activity: "Waiting..."
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const currentSeconds = new Date().getSeconds();
            const currentTime=new Date().toString();
            if(currentSeconds % 5 === 0) 
                fetchAndProcessImage(currentTime);
                
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const fetchAndProcessImage = async (currentTime) => {
        if (fetching || !userId) return;
        setFetching(true);

        try {
            const userDocRef = doc(db1, "images", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const imageList = userData.images || [];

                if (imageList.length === 0) {
                    console.log("No images available.");
                    setFetching(false);
                    return;
                }

                // Get the first image
                const base64Image = imageList[0];
                setCurrentImage(base64Image);

                // Convert Base64 to Blob
                const blob = base64toBlob(base64Image, "image/jpeg");

                // Draw image on canvas (optional)
                if (canvasRef.current) {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = base64Image;
                    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }

                // Process the image
                await sendImageToBackend(blob,currentTime);

                // Remove the processed image from Firestore
                await deleteProcessedImage(imageList);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setFetching(false);
        }
    };

    const deleteProcessedImage = async (imageList) => {
        if (!userId) return;

        try {
            const userDocRef = doc(db1, "images", userId); // Updated to use db1
            imageList.shift(); // Remove first image

            await updateDoc(userDocRef, { images: imageList }); // Updated to use db1
            console.log("Deleted processed image, remaining:", imageList.length);
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const sendImageToBackend = async (blob,currentTime) => {
        const formData = new FormData();
        formData.append("image", blob, "frame.jpg");
        formData.append("userId", userId); // Pass userId dynamically
        formData.append("currentTime",currentTime); // Pass current time
        try {
            const response = await axios.post(url+"analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.status === "queued") {
                fetchResult(response.data.task_id, userId); // Pass task_id and userId
            }
        } catch (error) {
            console.error("Error sending image:", error.message);
        }
    };

    const fetchResult = async (taskId, userId) => {
        try {
            const resultResponse = await axios.get(url+`result/${taskId}/${userId}`);

            if (resultResponse.data.status === "processing") {
                setTimeout(() => fetchResult(taskId, userId), 5000); // Poll every 5 sec
            } else {
                resultRef.current = {
                    person: resultResponse.data.person || "Unknown",
                    electronic_devices: resultResponse.data.electronic_devices || "Unknown",
                    notebook: resultResponse.data.notebook || "Unknown",
                    activity: resultResponse.data.activity || "Unknown",
                };
                console.log("Result from server:", resultRef.current);
            }
        } catch (error) {
            console.error("Error fetching result:", error);
        }
    };

    const base64toBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">Work Environment Monitoring</h1>
            <canvas ref={canvasRef} width="640" height="480" hidden />
            <div className="mt-4 p-4 border rounded bg-gray-100">
                <p><strong>Person Detection:</strong> {JSON.stringify(resultRef.current.person)}</p>
                <p><strong>Electronic Devices:</strong> {JSON.stringify(resultRef.current.electronic_devices)}</p>
                <p><strong>Activity Recognition:</strong> {JSON.stringify(resultRef.current.activity)}</p>
            </div>
        </div>
    );
};

export default WideTracking;