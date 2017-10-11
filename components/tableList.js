import React from "react";
import { Table } from "reactstrap";
import SearchInput from "./SearchInput";
import uuid from "uuid";

export default props => {
  const {
    data = [],
    headers = [],
    onRowClick = () => {},
    onFilter = () => {},
    onSort = () => {},
    settings: {
      filter = {},
      sort: { id: sortId = "", desc: sortDesc = false } = {}
    }
  } = props;

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
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
          }

          .headerCellDisabled {
            white-space: nowrap;
            padding: 0.65em;
          }

          .headerCell:hover {
            background: #d5d5d5;
          }

          .headerCell--active {
            background: #ddd;
          }

          .headerCellSort {
            width: 100%;
            height: 0.25em;
            background: #1bf;
          }
          .headerTab {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: .2rem;
          }

          .dataCellSort {
            background: #e0f4ff;
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

      <Table striped hover>
        <thead>
          <tr>
            {headers.map(({ title, id }) => (
              <th
                className={`headerCell ${id !== sortId || "headerCell--active"}`}
                key={`${title}-${id}`}
                onClick={() => onSort({ id })}
              >
                <div className="headerTab">
                  {title}
                  {id === sortId ? (
                    <div className={`arrow ${!sortDesc || "arrow--up"}`} />
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
          <tr className="fieldColor">
            {headers.map(({ id }) => (
              <td className="fieldFilter" key={`${id}-filter`}>
                <SearchInput
                  type="text"
                  name={`filter-${id}`}
                  value={filter[id]}
                  onClear={() => onFilter({ [id]: "" })}
                  onChange={({ target: { value } = {} }) =>
                    onFilter({ [id]: value })
                  }
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(dataProps => (
            <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
              {headers
                .map(({ id, ...props }) => ({
                  ...props,
                  data: dataProps[id]
                }))
                .map(({ id, data, type, title, action }) => (
                  <td key={uuid()}>{data}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
