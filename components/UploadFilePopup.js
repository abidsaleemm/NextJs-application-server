import CheckConfirm from "./CheckConfirm";
import { Table, Popover, PopoverHeader } from "reactstrap";

export default ({
  popupTarget,
  fileList = [],
  studyUID = "",
  toggle = () => {},
  onDelete = () => {}
}) => {
  return popupTarget ? (
    <Popover
      placement="left"
      isOpen={true}
      target={popupTarget}
      toggle={toggle}
    >
      <style jsx>
        {`
          .tableCell {
            padding: 5px;
          }
        `}
      </style>
      <PopoverHeader>Files</PopoverHeader>
      <Table hover>
        <tbody>
          {fileList.map((name, i) => (
            <tr key={`file-upload-${popupTarget}-${i}`}>
              <td className="tableCell">
                <a
                  href={`/uploadGet/?id=${studyUID}&name=${name}`}
                  target="_UploadPreview"
                >
                  {name}
                </a>
              </td>
              <td className="tableCell">
                <CheckConfirm
                  onConfirm={() => {
                    onDelete({ studyUID, name });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Popover>
  ) : null;
};
