import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Table
} from "reactstrap";

// TODO This is duplicated in application-interface.
// Handle as import when refactor of iframe to component gets completed. WG
const filterDefaultRender = ({ seriesName }) => {
  const regExRemove = [/3-pl/gi, /O-Ax/, /\bloc\b/i, /scout/gi];
  const regExAllow = [/T2/gi, /GE/gi];

  return (
    !regExRemove.some(v => v.test(seriesName)) &&
    regExAllow.some(v => v.test(seriesName))
  );
};

export default ({ series = [], onChange = () => {} }) => {
  return (
    <UncontrolledDropdown>
      <style jsx>
        {`
          .checkbox {
            width: 20px;
            height: 20px;
          }
        `}
      </style>
      <DropdownToggle caret>Series</DropdownToggle>
      <DropdownMenu>
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td />
              {/* <td>Date</td> */}
              {/* <td>Time</td> */}
              <td>W</td>
              <td>B</td>
              <td>Trim</td>
            </tr>
          </thead>
          <tbody>
            {series.map(
              (
                {
                  seriesUID, //   seriesDate,
                  seriesName = "",
                  seriesNumber, //   seriesTime,
                  // This are composed in projectDetail pages component
                  seriesFilter: { filter = "", trim = false } = {}
                },
                i
              ) => {
                //
                const shouldRender = filterDefaultRender({ seriesName });

                return (
                  <tr
                    key={`render-filter-${seriesUID}-${i}`}
                    style={{
                      background:
                        filter === "whitelisted"
                          ? "green"
                          : filter === "blacklisted"
                          ? "red"
                          : shouldRender
                          ? "#abebc6"
                          : "#fadbd8"
                    }}
                  >
                    <td>
                      {seriesName.length > 20
                        ? `${seriesName.substring(0, 20)}...`
                        : seriesName}
                    </td>
                    <td>{seriesNumber}</td>
                    {/* <td>{seriesDate}</td> */}
                    {/* <td>{seriesTime}</td> */}
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={filter === "whitelisted"}
                        onChange={() => {
                          onChange({
                            seriesUID,
                            value: filter !== "whitelisted" ? "whitelisted" : ""
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={filter === "blacklisted"}
                        onChange={() => {
                          onChange({
                            seriesUID,
                            value: {
                              filter:
                                filter !== "blacklisted" ? "blacklisted" : ""
                            }
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={trim}
                        onChange={() => {
                          onChange({
                            seriesUID,
                            value: {
                              trim: !trim
                            }
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
