import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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

export default ({ studyUID }) => (
  <UncontrolledDropdown>
    <style jsx>
      {`
        .renderOption {
          display: flex;
          background: green;
          justify-content: space-between;
        }

        .renderLink {
          padding-right: 30px;
          cursor: pointer;
          padding-left: 0px;
          margin-left: 0px;
        }
      `}
    </style>
    <DropdownToggle caret>Render</DropdownToggle>
    <DropdownMenu>
      <DropdownItem className="renderOption">
        <a
          className="renderLink"
          onClick={() => {
            window.open(
              `/static/render/?p=${studyUID}`,
              windowName,
              windowSettings
            );
          }}
        >
          Spine Video
        </a>
        <a
          className="btn btn-warning"
          color="warning"
          onClick={() => {
            window.open(
              `/static/render/?p=${studyUID}&debug=true`, // Don't need to assign template video is default
              windowName,
              windowSettingsDebug
            );
          }}
        >
          Debug
        </a>
      </DropdownItem>
      <DropdownItem>
        <a
          className="btn"
          color="warning"
          onClick={() => {
            window.open(
              `/static/render/?p=${studyUID}&template=spineImages`,
              windowName,
              windowSettings
            );
          }}
        >
          Spine Images
        </a>
      </DropdownItem>
      <DropdownItem>
        <a
          className="btn"
          color="warning"
          onClick={() => {
            window.open(
              `/static/render/?p=${studyUID}&template=spineComparison`,
              windowName,
              windowSettings
            );
          }}
        >
          Spine Compare
        </a>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
