import { Table, Tooltip } from "reactstrap";
import CheckConfirm from "./CheckConfirm";

export default ({
  popupTarget,
  fileList = [],
  toggle = () => {},
  studyUID = "",
  onDelete = () => {}
}) => {
  return popupTarget ? (
    <Tooltip
      placement="left"
      isOpen={true}
      autohide={false}
      target={popupTarget}
      toggle={() => {
        toggle();
      }}
    >
      <style jsx>
        {`
          :global(div.tooltip.show) {
            opacity: 1;
          }

          :global(div.tooltip-inner) {
            background: white;
            color: black;
            border-radius: 5px;
            min-width: 200px;
            padding: 5px;
            -webkit-box-shadow: 3px 3px 23px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 3px 23px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 3px 23px 0px rgba(0, 0, 0, 0.75);
          }

          .tableCellHeader {
            display: flex;
            padding: 5px;
            background: lightgray;
          }

          .tableCell {
            display: flex;
            justify-content: space-between;
            padding: 0px;
            min-height: 24px;
            text-align: left;
          }
        `}
      </style>
      <Table hover>
        <thead>
          <tr>
            <td className="tableCellHeader">Files</td>
          </tr>
        </thead>
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
    </Tooltip>
  ) : null;
}
