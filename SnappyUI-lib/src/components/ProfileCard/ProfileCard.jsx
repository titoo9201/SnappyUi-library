import React, { useState } from "react";

export const ProfileCard = ({
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
    linkedin: "#",
  },
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isMsgHovered, setIsMsgHovered] = useState(false);

  const cardStyle = {
    width: "360px",
    backgroundColor,
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    fontFamily: "'Segoe UI', sans-serif",
    color: textColor,
  };

  const coverStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    display: "block",
  };

  const avatarWrapperStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "0 20px",
    marginTop: "-45px",
  };

  const avatarStyle = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: `4px solid ${backgroundColor}`,
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  const onlineBadgeStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "#22C55E",
    borderRadius: "50%",
    border: `3px solid ${backgroundColor}`,
    position: "absolute",
    bottom: "4px",
    right: "4px",
  };

  const avatarContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const socialContainerStyle = {
    display: "flex",
    gap: "10px",
    paddingBottom: "6px",
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
    fontSize: "16px",
  });

  const infoStyle = {
    padding: "14px 20px 0",
  };

  const nameStyle = {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 4px 0",
  };

  const roleStyle = {
    fontSize: "14px",
    color: accentColor,
    fontWeight: "600",
    margin: "0 0 10px 0",
  };

  const bioStyle = {
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: "0 0 18px 0",
  };

  const statsContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "16px 20px",
    borderTop: "1px solid #F3F4F6",
    borderBottom: "1px solid #F3F4F6",
    margin: "0 0 18px 0",
  };

  const statItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  };

  const statNumberStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: textColor,
  };

  const statLabelStyle = {
    fontSize: "12px",
    color: "#9CA3AF",
    fontWeight: "500",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    padding: "0 20px 20px",
  };

  const followBtnStyle = {
    flex: 1,
    padding: "11px",
    backgroundColor: isFollowing
      ? "transparent"
      : isBtnHovered
      ? darkenColor(accentColor)
      : accentColor,
    color: isFollowing ? accentColor : "#FFFFFF",
    border: `2px solid ${accentColor}`,
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    letterSpacing: "0.3px",
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
    transition: "all 0.25s ease",
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);

  function darkenColor(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div style={cardStyle}>
      {/* Cover Image */}
      <img src={coverImage} alt="cover" style={coverStyle} />

      {/* Avatar + Social Icons Row */}
      <div style={avatarWrapperStyle}>
        <div style={avatarContainerStyle}>
          <img src={avatar} alt={name} style={avatarStyle} />
          <div style={onlineBadgeStyle} />
        </div>

        <div style={socialContainerStyle}>
          {/* Twitter */}
          <button
            style={iconBtnStyle(hoveredIcon === "twitter")}
            onMouseEnter={() => setHoveredIcon("twitter")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => window.open(socialLinks.twitter, "_blank")}
            title="Twitter"
          >
            🐦
          </button>

          {/* GitHub */}
          <button
            style={iconBtnStyle(hoveredIcon === "github")}
            onMouseEnter={() => setHoveredIcon("github")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => window.open(socialLinks.github, "_blank")}
            title="GitHub"
          >
            🐙
          </button>

          {/* LinkedIn */}
          <button
            style={iconBtnStyle(hoveredIcon === "linkedin")}
            onMouseEnter={() => setHoveredIcon("linkedin")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => window.open(socialLinks.linkedin, "_blank")}
            title="LinkedIn"
          >
            💼
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={infoStyle}>
        <h2 style={nameStyle}>{name}</h2>
        <p style={roleStyle}>{role}</p>
        <p style={bioStyle}>{bio}</p>
      </div>

      {/* Stats */}
      <div style={statsContainerStyle}>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{posts}</span>
          <span style={statLabelStyle}>Posts</span>
        </div>
        <div
          style={{
            width: "1px",
            backgroundColor: "#E5E7EB",
            alignSelf: "stretch",
          }}
        />
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{followers}</span>
          <span style={statLabelStyle}>Followers</span>
        </div>
        <div
          style={{
            width: "1px",
            backgroundColor: "#E5E7EB",
            alignSelf: "stretch",
          }}
        />
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{following}</span>
          <span style={statLabelStyle}>Following</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={buttonContainerStyle}>
        <button
          style={followBtnStyle}
          onClick={() => setIsFollowing(!isFollowing)}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
        >
          {isFollowing ? "✓ Following" : "+ Follow"}
        </button>
        <button
          style={messageBtnStyle}
          onMouseEnter={() => setIsMsgHovered(true)}
          onMouseLeave={() => setIsMsgHovered(false)}
        >
          💬 Message
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;