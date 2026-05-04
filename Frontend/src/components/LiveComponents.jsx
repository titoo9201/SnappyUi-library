import { LiveProvider, LivePreview, LiveError } from "react-live";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { FiRefreshCw } from "react-icons/fi";
export const LiveComponents = ({ code }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  let sanitized = code
    .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
    .replace(/export\s+/g, "");

  sanitized = sanitized
    .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
    .replace(/position\s*:\s*fixed/g, 'position: "absolute"')
    .replace(/\bfixed\b/g, "absolute");

  const match = sanitized.match(/const\s+([A-Z]\w+)/);
  const componentName = match ? match[1] : null;

  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName}/>)`
    : sanitized;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%" }}>
      <motion.button
        onClick={refreshPreview}
        whileTap={{ scale: 0.9, rotate: 90 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
          background: "rgba(255,255,255,0.8)",
          border: "none",
          color: "#333",
          padding: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <FiRefreshCw size={16} />
      </motion.button>
      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{ React, useState, useEffect, useRef, useCallback }}
        noInline={true}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: "100%",
            minHeight: "300px",

            // 🔥 Responsive max width
            maxWidth: "100%",

            border: "1px solid #1e293b",
            borderRadius: "12px",
            background: "#020617",

            position: "relative",
            overflow: "hidden",

            // 🔥 Responsive padding
            padding: "clamp(10px, 2vw, 20px)",
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "auto",
            }}
          >
            <LivePreview />

          </motion.div>
        </motion.div>
        <LiveError
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#ff4d4f",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "clamp(12px,1.5vw,14px)",
            overflowX: "auto",
          }}
        />
        {
            !componentName&&(
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    marginTop:"10px",
                    padding:"10px",
                    background:"#ff4d4f",
                    borderRadius:"6px",
                    color:"#fff",
                    fontSize:"clamp(12px,1.5vw,14px)"
                }}
                >
                    preview is not available copy the code and paste into your project.

                </motion.div>
            )
        }
      </LiveProvider>
    </div>
  );
};
