import React from "react";
import SplitPane from "react-split-pane";
import LeftPanel from "./LeftPanel";
import TopPanel from "./TopPanel";
import BottomPanel from "./BottomPanel";
import SecurityBlocker from "../../SecurityBlocker"; // Import SecurityBlocker

const resizerStyle = {
  background: "#2D2D2D",
  width: "4px",
  cursor: "col-resize",
  borderRadius: "2px",
  boxShadow: "0 0 2px rgba(255, 255, 255, 0.2)",
};

const horizontalResizerStyle = {
  ...resizerStyle,
  width: "100%",
  height: "4px",
  cursor: "row-resize",
};

const ResizableLayout = () => {
  return (
    <>
      {/* <SecurityBlocker /> */}
      <div style={{ height: "100vh", background: "#1b1b2f" }}>
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={400}
          maxSize={800}
          resizerStyle={resizerStyle}
        >
          <LeftPanel />
          <SplitPane
            split="horizontal"
            minSize={100}
            defaultSize={"60%"}
            maxSize={"90%"}
            resizerStyle={horizontalResizerStyle}
          >
            <TopPanel />
            <BottomPanel />
          </SplitPane>
        </SplitPane>
      </div>
    </>
  );
};

export default ResizableLayout;
