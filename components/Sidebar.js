import React from "react";
import ArrowIcon from "./icons/ArrowIcon";

import SidebarController from "../hoc/SidebarController";
const Sidebar = (props, context) => {
  const {
    shouldShowToggle,
    isHovered,
    isOpen,
    sidebarWidth,
    handleToggle
  } = props;

  const toggleIn = shouldShowToggle || isHovered ? "-30px" : "3px";
  const iconTransform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  const contentOpacity = isOpen ? "1" : "0";
  const sidebarStateWidth = isOpen ? sidebarWidth : "0px";

  const dynamicStyle = {
    sidebar: {
      width: sidebarStateWidth
    },
    content: {
      opacity: contentOpacity
    },
    toggle: {
      right: toggleIn
    },
    toggleIcon: {
      transform: iconTransform
    }
  };

  return (
    <div style={dynamicStyle.sidebar} className="sidebar">
      <style jsx>
        {`
          .sidebar {
            width: 0;
            background: white;
            z-index: 2;
            position: relative;
            height: 100vh;
            transition: all 0.05s ease;
          }

          .content {
            background: white;
            overflow: hidden;
            height: 100vh;
            transition: all 0.2s ease;
          }

          .toggle {
            display: flex;
            align-items: center;
            background: white;
            position: absolute;
            top: 40vh;
            width: 30px;
            height: 60px;
            border-radius: 0 200px 200px 0;
            transition: all 0.08s ease;
            z-index: -1;
            cursor: pointer;
            box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
          }

          .toggleIcon {
            display: flex;
            align-items: center;
            right: 5px;
            position: relative;
            transition: transform 0.3s ease;
          }
        `}
      </style>
      <div
        onClick={handleToggle}
        style={dynamicStyle.toggle}
        className="toggle"
      >
        <span style={dynamicStyle.toggleIcon} className="toggleIcon">
          <ArrowIcon color="black" size="30" />
        </span>
      </div>
      <div style={dynamicStyle.content} className="content">
        {props.children}
      </div>
    </div>
  );
};

export default SidebarController(Sidebar);
