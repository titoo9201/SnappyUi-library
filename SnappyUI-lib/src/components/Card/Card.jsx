import React, { useState } from "react";

export const Card = ({
  title = "Card Title",
  description = "This is a simple card description. You can customize it with props.",
  image = "https://picsum.photos/400/200",
  buttonLabel = "Read More",
  onButtonClick,
  backgroundColor = "#FFFFFF",
  textColor = "#1F2937",
  accentColor = "#4F46E5",
  borderRadius = "16px",
  width = "320px",
  showImage = true,
  showButton = true,
  tag = "Featured",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const cardStyle = {
    width,
    backgroundColor,
    borderRadius,
    overflow: "hidden",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0,0,0,0.15)"
      : "0 4px 16px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const imageContainerStyle = {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.4s ease",
  };

  const tagStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: accentColor,
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
  };

  const contentStyle = {
    padding: "20px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: textColor,
    margin: "0 0 10px 0",
  };

  const descriptionStyle = {
    fontSize: "14px",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
  };

  const dividerStyle = {
    height: "1px",
    backgroundColor: "#F3F4F6",
    margin: "0 0 16px 0",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: isBtnHovered ? darkenColor(accentColor) : accentColor,
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: isBtnHovered ? "scale(0.98)" : "scale(1)",
  };

  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      {showImage && (
        <div style={imageContainerStyle}>
          <img src={image} alt={title} style={imageStyle} />
          {tag && <span style={tagStyle}>{tag}</span>}
        </div>
      )}

      {/* Content Section */}
      <div style={contentStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={descriptionStyle}>{description}</p>

        <div style={dividerStyle} />

        {/* Button */}
        {showButton && (
          <button
            style={buttonStyle}
            onClick={onButtonClick}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;