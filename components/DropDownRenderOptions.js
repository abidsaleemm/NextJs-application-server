import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

const DropDownRenderOptions = ({ studyUID, setRender = () => {} }) => (
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
          setRender({
            studyUID
          });
        }}
      >
        Spine Video
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setRender({
            studyUID,
            debug: true
          });
        }}
      >
        Spine Video - Debug
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setRender({
            studyUID,
            anonymous: true
          });
        }}
      >
        Spine Video - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setRender({
            studyUID,
            template: "spineImages"
          });
        }}
      >
        Spine Images
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setRender({
            studyUID,
            template: "spineImages",
            anonymous: true
          });
        }}
      >
        Spine Images - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setProjectProps({
            studyUID,
            template: "spineComparison"
          });
        }}
      >
        Spine Compare
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
const mapStateToProps = ({ setProjectProps }) => ({
  setProjectProps
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownRenderOptions);
