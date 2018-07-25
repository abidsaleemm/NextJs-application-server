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
          cursor: pointer;
        }
      `}
    </style>
    <DropdownToggle caret>Render</DropdownToggle>
    <DropdownMenu>
      <DropdownItem
        onClick={() => {
          window.open(
            `/static/render/?p=${studyUID}`,
            windowName,
            windowSettings
          );
        }}
      >
        Spine Video
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          window.open(
            `/static/render/?p=${studyUID}&debug=true`, // Don't need to assign template video is default
            windowName,
            windowSettingsDebug
          );
        }}
      >
        Spine Video - Debug
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          // TODO create wrapper reusable function for this
          window.open(
            `/static/render/?p=${studyUID}&anonymous=true`,
            windowName,
            windowSettings
          );
        }}
      >
        Spine Video - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          // TODO create wrapper reusable function for this
          window.open(
            `/static/render/?p=${studyUID}&template=spineImages`,
            windowName,
            windowSettings
          );
        }}
      >
        Spine Images
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          // TODO create wrapper reusable function for this
          window.open(
            `/static/render/?p=${studyUID}&template=spineImages&anonymous=true`,
            windowName,
            windowSettings
          );
        }}
      >
        Spine Images - Anonymous
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          // TODO create wrapper reusable function for this
          window.open(
            `/static/render/?p=${studyUID}&template=spineComparison`,
            windowName,
            windowSettings
          );
        }}
      >
        Spine Compare
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
