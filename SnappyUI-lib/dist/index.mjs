// src/components/Button/Button.jsx
import React, { useState } from "react";
var Button = ({
  label = "Click Me",
  onClick,
  backgroundColor = "#4F46E5",
  textColor = "#FFFFFF",
  fontSize = "16px",
  padding = "10px 24px",
  borderRadius = "8px",
  disabled = false,
  variant = "solid"
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
    userSelect: "none"
  };
  const variantStyle = variant === "outline" ? {
    backgroundColor: isHovered && !disabled ? backgroundColor : "transparent",
    color: isHovered && !disabled ? textColor : backgroundColor
  } : {
    backgroundColor: isHovered && !disabled ? darkenColor(backgroundColor) : backgroundColor,
    color: textColor
  };
  const pressedStyle = isPressed && !disabled ? { transform: "scale(0.96)" } : { transform: "scale(1)" };
  const combinedStyle = { ...baseStyle, ...variantStyle, ...pressedStyle };
  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, (num >> 8 & 255) - 30);
    const b = Math.max(0, (num & 255) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      style: combinedStyle,
      onClick: !disabled ? onClick : void 0,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsPressed(false);
      },
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      disabled
    },
    label
  );
};

// src/components/Card/Card.jsx
import React2, { useState as useState2 } from "react";
var Card = ({
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
  tag = "Featured"
}) => {
  const [isHovered, setIsHovered] = useState2(false);
  const [isBtnHovered, setIsBtnHovered] = useState2(false);
  const cardStyle = {
    width,
    backgroundColor,
    borderRadius,
    overflow: "hidden",
    boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.15)" : "0 4px 16px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif"
  };
  const imageContainerStyle = {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    position: "relative"
  };
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.4s ease"
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
    letterSpacing: "0.5px"
  };
  const contentStyle = {
    padding: "20px"
  };
  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: textColor,
    margin: "0 0 10px 0"
  };
  const descriptionStyle = {
    fontSize: "14px",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: "0 0 20px 0"
  };
  const dividerStyle = {
    height: "1px",
    backgroundColor: "#F3F4F6",
    margin: "0 0 16px 0"
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
    transform: isBtnHovered ? "scale(0.98)" : "scale(1)"
  };
  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, (num >> 8 & 255) - 30);
    const b = Math.max(0, (num & 255) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      style: cardStyle,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    showImage && /* @__PURE__ */ React2.createElement("div", { style: imageContainerStyle }, /* @__PURE__ */ React2.createElement("img", { src: image, alt: title, style: imageStyle }), tag && /* @__PURE__ */ React2.createElement("span", { style: tagStyle }, tag)),
    /* @__PURE__ */ React2.createElement("div", { style: contentStyle }, /* @__PURE__ */ React2.createElement("h2", { style: titleStyle }, title), /* @__PURE__ */ React2.createElement("p", { style: descriptionStyle }, description), /* @__PURE__ */ React2.createElement("div", { style: dividerStyle }), showButton && /* @__PURE__ */ React2.createElement(
      "button",
      {
        style: buttonStyle,
        onClick: onButtonClick,
        onMouseEnter: () => setIsBtnHovered(true),
        onMouseLeave: () => setIsBtnHovered(false)
      },
      buttonLabel
    ))
  );
};

// src/components/ProfileCard/ProfileCard.jsx
import React3, { useState as useState3 } from "react";
var ProfileCard = ({
  name = "John Doe",
  role = "Full Stack Developer",
  bio = "Passionate developer who loves building beautiful and functional web applications.",
  avatar = "https://i.pravatar.cc/150?img=12",
  coverImage = "https://picsum.photos/600/200?grayscale",
  followers = "12.4K",
  following = "1.2K",
  posts = "340",
  accentColor = "#4F46E5",
  backgroundColor = "#FFFFFF",
  textColor = "#1F2937",
  socialLinks = {
    twitter: "#",
    github: "#",
    linkedin: "#"
  }
}) => {
  const [isFollowing, setIsFollowing] = useState3(false);
  const [isBtnHovered, setIsBtnHovered] = useState3(false);
  const [isMsgHovered, setIsMsgHovered] = useState3(false);
  const cardStyle = {
    width: "360px",
    backgroundColor,
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    fontFamily: "'Segoe UI', sans-serif",
    color: textColor
  };
  const coverStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    display: "block"
  };
  const avatarWrapperStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "0 20px",
    marginTop: "-45px"
  };
  const avatarStyle = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: `4px solid ${backgroundColor}`,
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  };
  const onlineBadgeStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "#22C55E",
    borderRadius: "50%",
    border: `3px solid ${backgroundColor}`,
    position: "absolute",
    bottom: "4px",
    right: "4px"
  };
  const avatarContainerStyle = {
    position: "relative",
    display: "inline-block"
  };
  const socialContainerStyle = {
    display: "flex",
    gap: "10px",
    paddingBottom: "6px"
  };
  const iconBtnStyle = (hovered) => ({
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: `1.5px solid ${hovered ? accentColor : "#E5E7EB"}`,
    backgroundColor: hovered ? accentColor : "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    fontSize: "16px"
  });
  const infoStyle = {
    padding: "14px 20px 0"
  };
  const nameStyle = {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 4px 0"
  };
  const roleStyle = {
    fontSize: "14px",
    color: accentColor,
    fontWeight: "600",
    margin: "0 0 10px 0"
  };
  const bioStyle = {
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: "0 0 18px 0"
  };
  const statsContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "16px 20px",
    borderTop: "1px solid #F3F4F6",
    borderBottom: "1px solid #F3F4F6",
    margin: "0 0 18px 0"
  };
  const statItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px"
  };
  const statNumberStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: textColor
  };
  const statLabelStyle = {
    fontSize: "12px",
    color: "#9CA3AF",
    fontWeight: "500"
  };
  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    padding: "0 20px 20px"
  };
  const followBtnStyle = {
    flex: 1,
    padding: "11px",
    backgroundColor: isFollowing ? "transparent" : isBtnHovered ? darkenColor(accentColor) : accentColor,
    color: isFollowing ? accentColor : "#FFFFFF",
    border: `2px solid ${accentColor}`,
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    letterSpacing: "0.3px"
  };
  const messageBtnStyle = {
    flex: 1,
    padding: "11px",
    backgroundColor: isMsgHovered ? "#F3F4F6" : "transparent",
    color: textColor,
    border: "2px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease"
  };
  const [hoveredIcon, setHoveredIcon] = useState3(null);
  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, (num >> 8 & 255) - 30);
    const b = Math.max(0, (num & 255) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return /* @__PURE__ */ React3.createElement("div", { style: cardStyle }, /* @__PURE__ */ React3.createElement("img", { src: coverImage, alt: "cover", style: coverStyle }), /* @__PURE__ */ React3.createElement("div", { style: avatarWrapperStyle }, /* @__PURE__ */ React3.createElement("div", { style: avatarContainerStyle }, /* @__PURE__ */ React3.createElement("img", { src: avatar, alt: name, style: avatarStyle }), /* @__PURE__ */ React3.createElement("div", { style: onlineBadgeStyle })), /* @__PURE__ */ React3.createElement("div", { style: socialContainerStyle }, /* @__PURE__ */ React3.createElement(
    "button",
    {
      style: iconBtnStyle(hoveredIcon === "twitter"),
      onMouseEnter: () => setHoveredIcon("twitter"),
      onMouseLeave: () => setHoveredIcon(null),
      onClick: () => window.open(socialLinks.twitter, "_blank"),
      title: "Twitter"
    },
    "\u{1F426}"
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      style: iconBtnStyle(hoveredIcon === "github"),
      onMouseEnter: () => setHoveredIcon("github"),
      onMouseLeave: () => setHoveredIcon(null),
      onClick: () => window.open(socialLinks.github, "_blank"),
      title: "GitHub"
    },
    "\u{1F419}"
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      style: iconBtnStyle(hoveredIcon === "linkedin"),
      onMouseEnter: () => setHoveredIcon("linkedin"),
      onMouseLeave: () => setHoveredIcon(null),
      onClick: () => window.open(socialLinks.linkedin, "_blank"),
      title: "LinkedIn"
    },
    "\u{1F4BC}"
  ))), /* @__PURE__ */ React3.createElement("div", { style: infoStyle }, /* @__PURE__ */ React3.createElement("h2", { style: nameStyle }, name), /* @__PURE__ */ React3.createElement("p", { style: roleStyle }, role), /* @__PURE__ */ React3.createElement("p", { style: bioStyle }, bio)), /* @__PURE__ */ React3.createElement("div", { style: statsContainerStyle }, /* @__PURE__ */ React3.createElement("div", { style: statItemStyle }, /* @__PURE__ */ React3.createElement("span", { style: statNumberStyle }, posts), /* @__PURE__ */ React3.createElement("span", { style: statLabelStyle }, "Posts")), /* @__PURE__ */ React3.createElement(
    "div",
    {
      style: {
        width: "1px",
        backgroundColor: "#E5E7EB",
        alignSelf: "stretch"
      }
    }
  ), /* @__PURE__ */ React3.createElement("div", { style: statItemStyle }, /* @__PURE__ */ React3.createElement("span", { style: statNumberStyle }, followers), /* @__PURE__ */ React3.createElement("span", { style: statLabelStyle }, "Followers")), /* @__PURE__ */ React3.createElement(
    "div",
    {
      style: {
        width: "1px",
        backgroundColor: "#E5E7EB",
        alignSelf: "stretch"
      }
    }
  ), /* @__PURE__ */ React3.createElement("div", { style: statItemStyle }, /* @__PURE__ */ React3.createElement("span", { style: statNumberStyle }, following), /* @__PURE__ */ React3.createElement("span", { style: statLabelStyle }, "Following"))), /* @__PURE__ */ React3.createElement("div", { style: buttonContainerStyle }, /* @__PURE__ */ React3.createElement(
    "button",
    {
      style: followBtnStyle,
      onClick: () => setIsFollowing(!isFollowing),
      onMouseEnter: () => setIsBtnHovered(true),
      onMouseLeave: () => setIsBtnHovered(false)
    },
    isFollowing ? "\u2713 Following" : "+ Follow"
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      style: messageBtnStyle,
      onMouseEnter: () => setIsMsgHovered(true),
      onMouseLeave: () => setIsMsgHovered(false)
    },
    "\u{1F4AC} Message"
  )));
};
export {
  Button,
  Card,
  ProfileCard
};
