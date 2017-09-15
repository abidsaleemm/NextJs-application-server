import React, { Component } from "react";
import ArrowIcon from "./icons/ArrowIcon";

// import SidebarController from "../hoc/SidebarController";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowToggle: false,
      isOpen: true, // TODO Handle this through redux
    }
  }

  handleShowToggle() {
    console.log('handleShowToggle');
    this.setState({ shouldShowToggle: true });
    setTimeout(() => this.setState({ shouldShowToggle: false }), 2000);
  }

  render() {
    const { 
      props,
      state: {
        shouldShowToggle,
        isOpen,
      }
    } = this;

    const toggleIn = shouldShowToggle ? "-30px" : "3px";
    const iconTransform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
    const contentOpacity = isOpen ? "1" : "0";
    const sidebarStateWidth = isOpen ? '400px' : "0px";

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
      },
      toggleOverlay: {
        right: !shouldShowToggle ? "-30px" : "3px"
      }
    };

    return (
      <div style={dynamicStyle.sidebar} className="sidebar">
        <style jsx>
          {`
          .sidebar {
            display: flex;
            width: 0;
            background: white;
            z-index: 2;
            position: relative;
            height: 100%;
            transition: all 0.05s ease;
          }

          .content {
            background: white;
            overflow: hidden;
            height: 100%;
            transition: all 0.2s ease;
          }

          .toggleContainer {
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: absolute;
            top: 0px;
            width: 30px;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            transition: all 0.08s ease;
          }

          .toggle {
            display: flex;
            align-self: center;
            background: white;
            width: 30px;
            height: 60px;
            border-radius: 0 100px 100px 0;
            transition: all 0.08s ease;
            cursor: pointer;
            box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
            pointer-events: auto;
          }

          .toggleIcon {
            display: flex;
            align-items: center;
            right: 5px;
            position: relative;
            transition: transform 0.3s ease;
          }

          .toggleOverlay {
            background: rgba(255,0,0,0.5);
            position: absolute;
            right: -30px;
            top: 0px;
            width: 30px;
            height: 100%;
            border-radius: 0 10px 10px 0;
            z-index: -2;
            pointer-events: auto;
          }
        `}
        </style>
        <div 
          className="toggleOverlay" 
          onMouseMove={() => this.handleShowToggle()}
          style={dynamicStyle.toggleOverlay}
        />
        <div
          className="toggleContainer"
          style={dynamicStyle.toggle}
        >
          <div
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            className="toggle"
          >
            <span style={dynamicStyle.toggleIcon} className="toggleIcon">
              <ArrowIcon color="black" size="30" />
            </span>
          </div>
        </div>
        <div style={dynamicStyle.content} className="content">
          {props.children}
        </div>
      </div>
    );
  };
}

// export default SidebarController(Sidebar);
