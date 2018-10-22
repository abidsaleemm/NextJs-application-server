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

export default ({
  series = [],
  onChangeWhiteList = () => {},
  onChangeBlackList = () => {}
}) => {
  // filterDefaultRender
  // TODO This is duplicated in application-interface.
  // Handle as import when refactor of iframe to component gets completed. WG
  //   const regExRemove = [/3-pl/gi, /O-Ax/, /\bloc\b/i, /scout/gi];
  //   const regExAllow = [/T2/gi, /GE/gi];

  //   const ret = filterSeriesBlacklist(series)
  //     ? false
  //     : filterSeriesWhitelist(series)
  //       ? true
  //       : !regExRemove.some(v => v.test(seriesName)) &&
  //         regExAllow.some(v => v.test(seriesName));

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
            </tr>
          </thead>
          <tbody>
            {series.map(
              (
                {
                  seriesUID,
                  seriesDate,
                  seriesName = "",
                  seriesNumber,
                  seriesTime,
                  // This are composed in projectDetail pages component
                  whitelisted = false,
                  blacklisted = false
                },
                i
              ) => {
                //
                const shouldRender = filterDefaultRender({ seriesName });

                return (
                  <tr
                    key={`render-filter-${seriesUID}-${i}`}
                    style={{
                      background: whitelisted
                        ? "green"
                        : blacklisted
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
                        checked={whitelisted}
                        onChange={() => {
                          onChangeWhiteList({ seriesUID, value: whitelisted });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={blacklisted}
                        onChange={() => {
                          onChangeBlackList({ seriesUID, value: blacklisted });
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
