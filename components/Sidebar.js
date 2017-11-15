import React, { Component } from "react";
import ArrowIcon from "./icons/ArrowIcon";

export default class extends Component {
  static defaultProps = {
    toggleSidebar: () => {},
    width: 400,
    isOpen: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      shouldShowToggle: false,
    };
  }

  handleShowToggle() {
    this.setState({ shouldShowToggle: true });
    setTimeout(() => this.setState({ shouldShowToggle: false }), 2000);
  }

  render() {
    const { props: { toggleSidebar, isOpen, children, width }, state: { shouldShowToggle } } = this;
    const toggleWidth = 30;
    const toggleIn = shouldShowToggle ? `${-toggleWidth}px` : "3px";
    const triggerWidth = 10;
    const overlayIn = !shouldShowToggle ? `${-triggerWidth}px` : "-0px";
    const iconTransform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
    const contentOpacity = isOpen ? "1" : "0";
    const sidebarWidth = isOpen ? `${width}px` : "0px";

    const dynamicStyle = {
      sidebar: {
        width: sidebarWidth
      },
      content: {
        opacity: contentOpacity
      },
      toggle: {
        right: toggleIn,
        width: toggleWidth
      },
      toggleOverlay: {
        right: overlayIn,
        width: `${triggerWidth}px`
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
              display: flex;
              width: 0;
              background: white;
              z-index: 2;
              position: relative;
              height: 100%;
              transition: all 0.05s ease;
            }

            .content {
              width: 100%;
              background: white;
              overflow-x: scroll;
              height: 100%;
              transition: all 0.2s ease;
              padding: 10px;
            }

            .toggleContainer {
              display: flex;
              align-items: center;
              position: absolute;
              height: 100%;
              z-index: -1;
              pointer-events: none;
              transition: all 0.08s ease;
            }

            .toggleOverlay {
              position: absolute;
              height: 100%;
              z-index: -2;
              pointer-events: auto;
            }

            .toggle {
              display: flex;
              background: white;
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
          `}
        </style>
        <div
          className="toggleOverlay"
          onMouseMove={() => this.handleShowToggle()}
          style={dynamicStyle.toggleOverlay}
        />
        <div className="toggleContainer" style={dynamicStyle.toggle}>
          <div
            onClick={ toggleSidebar }
            className="toggle"
          >
            <span style={dynamicStyle.toggleIcon} className="toggleIcon">
              <ArrowIcon color="black" size="30" />
            </span>
          </div>
        </div>
        <div style={dynamicStyle.content} className="content">
          {children}
        </div>
      </div>
    );
  }
}
