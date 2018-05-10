import React from "react";
import { Table } from "reactstrap";
import R from "ramda";
import uuid from "uuid";
import SearchInput from "./SearchInput";

export default props => {
  const {
    data = [],
    header = {},
    filter = {},
    sortKey = "",
    sortDesc = false,
    onRowClick = () => {},
    onFilter = () => {},
    onSort = () => {}
  } = props;

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow: auto;
          }

          .fieldFilter {
            padding: 0.4em;
            border: none;
          }

          .fieldColor {
            background: #ddd;
          }

          .headerCell {
            white-space: nowrap;
            cursor: pointer;
            border: none;
            user-select: none;
          }

          .headerCellDisabled {
            white-space: nowrap;
            padding: 0.65em;
            pointer-events: none;
            user-select: none;
          }

          .headerCell:hover {
            background: #d5d5d5;
          }

          .headerCell--active {
            background: #ddd;
          }

          .headerCellSort {
            height: 0.25em;
            background: #1bf;
          }

          .headerTab {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 0.2rem;
          }

          .dataCell {
            padding: 0 3 0 3;
            margin: 0;
            vertical-align: middle;
            height: 0.25em;
            min-height: 0.25em;
            min-width: 20px;
          }

          .arrow {
            display: inline-block;
            position: relative;
            margin-left: 20px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #292b2c;
            transition: cubic-bezier(0.52, 0.13, 0, 1.07) 0.2s all;
          }

          .arrow--up {
            transform: rotate(180deg);
          }
        `}
      </style>
      <Table hover>
        <thead>
          <tr>
            {Object.entries(header).map(
              ([id, { title = "", sort = false }]) => (
                <th
                  className={`
                  ${sort ? "headerCell" : "headerCellDisabled"} 
                  ${id === sortKey ? "headerCell--active" : null}
                  `}
                  key={`tableList-${title}-${id}`}
                  onClick={() => onSort(id)}
                >
                  <div className="headerTab">
                    {title}
                    {id === sortKey && sort ? (
                      <div
                        className={`arrow ${
                          sortDesc ? "arrow--up" : null
                        }`}
                      />
                    ) : null}
                  </div>
                </th>
              )
            )}
          </tr>
          <tr className="fieldColor">
            {Object.entries(header).map(([id, { sort }]) => (
              <td
                className="fieldFilter"
                key={`tableList-${id}-filter`}
              >
                {filter[id] !== undefined ? (
                  <SearchInput
                    type="text"
                    name={`filter-${id}`}
                    value={filter[id]}
                    onClear={() => onFilter([id, ""])}
                    onChange={({ target: { value } = {} }) =>
                      onFilter([id, value])
                    }
                  />
                ) : null}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ tableBackground, ...dataProps }, i) => (
            <tr
              key={`tableList-tableRow-${i}`}
              onClick={() => onRowClick(dataProps)}
            >
              {Object.entries(header)
                .map(([id, props]) => ({
                  ...props,
                  id,
                  data: dataProps[id]
                }))
                .map(({ id, data, type, title, action }) => {
                  return (
                    <td
                      className="dataCell"
                      key={`tableList-tableCell-${id}-${title}`}
                      style={{
                        ...(tableBackground
                          ? { background: tableBackground }
                          : {})
                      }}
                    >
                      {data !== undefined ? data : null}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
