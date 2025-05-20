import React, { useEffect, useState } from "react";

const TestResultPopup = ({ passed, failed, onClose }) => {
  const isAllPassed = failed === 0;
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    if (isAllPassed) {
      setShowRocket(true);
      setTimeout(() => setShowRocket(false), 3000);
    }
  }, [isAllPassed]);

  // Inject keyframes only once
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @keyframes flyRocket {
        0% {
          transform: translateX(-50%) translateY(0) scale(1);
          opacity: 1;
        }
        30% {
          transform: translateX(-50%) translateY(-100px) scale(1.1) rotate(0deg);
          opacity: 1;
        }
        60% {
          transform: translateX(-50%) translateY(-200px) scale(1.05) rotate(5deg);
          opacity: 0.8;
        }
        100% {
          transform: translateX(-50%) translateY(-350px) scale(0.9) rotate(-5deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#1e1e2f",
          padding: "30px",
          borderRadius: "16px",
          color: "white",
          minWidth: "320px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {showRocket && (
          <div style={styles.rocketContainer}>
            <div style={styles.rocket}>🚀</div>
          </div>
        )}

        <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>
          Test Case Summary
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div style={styles.cardPass}>
            <div style={{ color: "#28a745", fontWeight: "600" }}>✅ Passed</div>
            <div style={{ fontSize: "1.5rem", marginTop: "8px" }}>{passed}</div>
          </div>

          <div style={styles.cardFail}>
            <div style={{ color: "#ff4d4f", fontWeight: "600" }}>❌ Failed</div>
            <div style={{ fontSize: "1.5rem", marginTop: "8px" }}>{failed}</div>
          </div>
        </div>

        <div
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: isAllPassed ? "#28a745" : "#ff4d4f",
            marginBottom: "20px",
          }}
        >
          {isAllPassed
            ? "🎉 Question Accepted!"
            : "🔁 Retry: Some test cases failed"}
        </div>

        <button
          onClick={onClose}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            backgroundColor: "#9333EA",
            border: "none",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardPass: {
    border: "2px solid #28a745",
    borderRadius: "10px",
    padding: "12px 24px",
    width: "120px",
    backgroundColor: "#1b1b2f",
  },
  cardFail: {
    border: "2px solid #ff4d4f",
    borderRadius: "10px",
    padding: "12px 24px",
    width: "120px",
    backgroundColor: "#1b1b2f",
  },
  rocketContainer: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 999,
  },
  rocket: {
    fontSize: "2.5rem",
    animation: "flyRocket 3s ease-in-out forwards",
  },
};

export default TestResultPopup;
