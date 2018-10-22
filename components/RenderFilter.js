import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Table
} from "reactstrap";

export default ({
  series = [],
  onChangeWhiteList = () => {},
  onChangeBlackList = () => {}
}) => {
    const regExRemove = [/3-pl/gi, /O-Ax/, /\bloc\b/i, /scout/gi];
  const regExAllow = [/T2/gi, /GE/gi];

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
                return (
                  <tr key={`render-filter-${seriesUID}-${i}`}>
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
