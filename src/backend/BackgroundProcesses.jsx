import ReactDOM from "react-dom";
import EyeBallTrack from "./EyeBallTrack";
import WideTracking from "./WideTracking";
import VoiceDetection from "./VoiceDetection";

const BackgroundProcesses = () => {
  return ReactDOM.createPortal(
    <div className="hidden">
      <EyeBallTrack />
      <WideTracking />
      <VoiceDetection />
    </div>,
    document.body
  );
};

export default BackgroundProcesses;
