import { Table, Tooltip } from "reactstrap";

export default ({
  popupTarget = null,
  fileList = [],
  toggle = () => {},
  studyUID = ""
}) =>
  popupTarget !== null ? (
    <div>
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
              width: 200px;
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
              padding: 5px;
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tooltip>
    </div>
  ) : null;
