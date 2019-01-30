import CheckConfirm from "./CheckConfirm";
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default ({ fileList = [], studyUID = "", onFileDelete = () => {} }) => {
  return (
    <UncontrolledDropdown direction="left">
      <style jsx>
        {`
          .buttonContents {
            min-width: 400px;
            max-width: 800px;
          }

          .fileLink {
            white-space: nowrap;
          }
        `}
      </style>

      <DropdownToggle
        caret
        style={{
          height: "100%",
          background: "green",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0"
        }}
      >
        {fileList.length}
      </DropdownToggle>
      <DropdownMenu>
        <div className="buttonContents">
          <Table hover>
            <tbody>
              {fileList.map((name, i) => (
                <tr key={`file-upload-${studyUID}-${i}`}>
                  <td className="tableCell">
                    <a
                      className="fileLink"
                      href={`/uploadGet/?id=${studyUID}&name=${name}`}
                      target="_UploadPreview"
                    >
                      {name}
                    </a>
                  </td>
                  <td className="tableCell">
                    <CheckConfirm
                      onConfirm={() => {
                        onFileDelete({ studyUID, name });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
