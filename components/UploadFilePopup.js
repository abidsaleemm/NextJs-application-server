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
      <DropdownToggle caret style={{ height: "100%", background: "green" }}>
        {fileList.length}
      </DropdownToggle>
      <DropdownMenu>
        <div style={{ minWidth: "400px", maxWidth: "800px" }}>
          <Table hover>
            <tbody>
              {fileList.map((name, i) => (
                <tr key={`file-upload-${studyUID}-${i}`}>
                  <td className="tableCell">
                    <a
                      style={{ whiteSpace: "nowrap" }}
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
