import { useEffect, useState } from "react";

const SecurityBlocker = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wasHidden, setWasHidden] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [deviceCount, setDeviceCount] = useState(0);

  useEffect(() => {
    console.log("SecurityBlocker is running...");

    const incrementCounter = () => {
      setCounter((prev) => prev + 1);
    };
    const blockScreenshotAndRecording = (event) => {
      if (
        event.key === "PrintScreen" ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && ["S", "4", "R", "5"].includes(event.key))
      ) {
        event.preventDefault();
        alert("⚠ Screenshots & Screen Recording are disabled!");
      }
    };
  
    document.addEventListener("keydown", blockScreenshotAndRecording);
    
    
    const showAlert = (message) => {
      if (!alertActive) {
        setAlertActive(true);
        incrementCounter();
        setTimeout(() => {
          alert(message);
          setAlertActive(false);
        }, 100);
      }
    };

    const blockShortcuts = (event) => {
      if ((event.ctrlKey || event.metaKey) && [67, 86, 84].includes(event.keyCode)) {
        event.preventDefault();
        showAlert("⚠ Keyboard shortcuts are disabled!");
      }
    };
    document.addEventListener("keydown", blockShortcuts);

    document.addEventListener("visibilitychange", () => {
      setWasHidden(document.hidden);
    });

    window.onbeforeunload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
      incrementCounter();
    };

    const detectAppSwitch = () => {
      if (!document.hasFocus() && !wasHidden && !alertActive) {
        setAlertActive(true);
        incrementCounter();
        setTimeout(() => {
          alert("⚠ You switched apps! Please stay on this page.");
          setAlertActive(false);
        }, 100);
      }
    };
    window.addEventListener("blur", detectAppSwitch);

    const detectRemoteAccess = setInterval(() => {
      navigator.usb.getDevices().then((devices) => {
        setDeviceCount(devices.length);
      });
    }, 5000);

    const preventResize = () => {
      if ((window.innerWidth < 800 || window.innerHeight < 600) && !alertActive) {
        showAlert("⚠ You must keep the window in full size!");
        window.resizeTo(1024, 768);
      }
    };
    window.addEventListener("resize", preventResize);

    const blockScreenshot = (event) => {
      if (event.key === "PrintScreen") {
        event.preventDefault();
        showAlert("⚠ Screenshots are not allowed!");
      }
    };
    document.addEventListener("keyup", blockScreenshot);

    return () => {
      clearInterval(detectRemoteAccess);
      window.removeEventListener("blur", detectAppSwitch);
      window.removeEventListener("resize", preventResize);
      document.removeEventListener("keydown", blockShortcuts);
      document.removeEventListener("keyup", blockScreenshotAndRecording );
    };
  }, [wasHidden, alertActive]);

  useEffect(() => {
    if (counter > 0 && counter % 4 === 0) {
      setText("");
    }
  }, [counter]);

  const handleSubmit = () => {
    if (counter < 10) {
      setSubmitted(true);
      alert("✅ Submission successful!");
    } else {
      alert("❌ Submission failed! Too many security violations.");
    }
  };

  return (
    // <div style={{ padding: "20px", textAlign: "center" }}>
    //   <h1>Security Blocker Active</h1>
    //   <p>Connected USB Devices: <strong>{deviceCount}</strong></p>
    //   <textarea
    //     placeholder="Type something here..."
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //     style={{ width: "80%", height: "100px", fontSize: "16px" }}
    //   ></textarea>
    //   <p>Security violations detected: <strong>{counter}</strong></p>
    //   <button onClick={handleSubmit} disabled={submitted} style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}>
    //     Submit
    //   </button>
    // </div>
    <></>
  );
};

export default SecurityBlocker;