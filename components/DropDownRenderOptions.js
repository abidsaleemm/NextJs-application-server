import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Wrapper from "../hoc/wrapper";
import { connect } from "react-redux";

// TODO should this be in another location?
const windowName = "renderWindow";
const width = 1920;
const height = 1080;
const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;
const windowSettingsDebug = `width=${parseInt(
  width / 2
)},height=${parseInt(
  height / 2
)},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;

const DropDownRenderOptions =  ({ studyUID, setProjectProps = () => {} }) => (
  <UncontrolledDropdown>
    <style jsx>
      {`
        .renderOption {
          display: flex;
          background: green;
          justify-content: space-between;
          cursor: pointer;
        }
      `}
    </style>
    <DropdownToggle caret>Render</DropdownToggle>
    <DropdownMenu>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "none"
          });
        }}
      >
        Spine Video
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "debug"
          });
        }}
      >
        Spine Video - Debug
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "anonymous"
          });
        }}
      >
        Spine Video - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "spineImages"
          });
        }}
      >
        Spine Images
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "spineImages-anonymous"
          });
        }}
      >
        Spine Images - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            renderParam: "spineComparison"
          });
        }}
      >
        Spine Compare
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
const mapStateToProps = ({
  setProjectProps
}) => ({
  setProjectProps
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownRenderOptions);