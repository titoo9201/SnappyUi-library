import React, { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick,
  backgroundColor = "#4F46E5",
  textColor = "#FFFFFF",
  fontSize = "16px",
  padding = "10px 24px",
  borderRadius = "8px",
  disabled = false,
  variant = "solid",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const baseStyle = {
    fontSize,
    padding,
    borderRadius,
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "600",
    border: variant === "outline" ? `2px solid ${backgroundColor}` : "none",
    transition: "all 0.2s ease",
    outline: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
  };

  const variantStyle =
    variant === "outline"
      ? {
          backgroundColor: isHovered && !disabled ? backgroundColor : "transparent",
          color: isHovered && !disabled ? textColor : backgroundColor,
        }
      : {
          backgroundColor: isHovered && !disabled
            ? darkenColor(backgroundColor)
            : backgroundColor,
          color: textColor,
        };

  const pressedStyle = isPressed && !disabled
    ? { transform: "scale(0.96)" }
    : { transform: "scale(1)" };

  const combinedStyle = { ...baseStyle, ...variantStyle, ...pressedStyle };

  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <button
      style={combinedStyle}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;