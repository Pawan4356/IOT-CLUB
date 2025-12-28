import React from "react";

function MeshBG() {
  return (
    <img
      src="GridMesh-WBG.png"
      alt=""
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        filter: "invert(1)",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.3,
      }}
    />
  );
}

export default MeshBG;
