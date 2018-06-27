import React from "react";
import { Table } from "reactstrap";
import {
  sortBy,
  prop,
  compose,
  reverse,
  filter,
  reduce,
  toPairs
} from "ramda";

export default props => {
  const {
    data = [],
    header = {},
    sortKey = "",
    sortDesc = false,
    sortFunc = {},
    filterRender = {},
    filterFunc = {},
    onRowClick = () => {},
    onSort = () => {}
  } = props;

  const filterByKey = (key, func = () => true) =>
    filter(v => func(v));

  // Sorting and filtering here
  const dataEnhanced = compose(
    (list = []) => (sortDesc ? reverse(list) : list),
    sortBy(prop(sortKey)),
    (list = []) =>
      reduce(
        (acc, [key, func]) => filterByKey(key, func)(acc),
        list,
        toPairs(filterFunc)
      )
  )(data);

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
            min-width: 1em;
            height: 100%;
          }

          .fieldColor {
            background: #ddd;
          }

          .filterColor {
            background: #eef;
          }

          .headerCell {
            white-space: nowrap;
            cursor: pointer;
            border: none;
            user-select: none;
            min-width: 1.5em;
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
            padding-right: 0.2em;
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
            {Object.entries(header).map(([id, title]) => {
              const { [id]: sort } = sortFunc;

              return (
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
              );
            })}
          </tr>
          <tr className="filterColor">
            {Object.keys(header).map(key => {
              const { [key]: render = null } = filterRender;

              return (
                <td
                  className="fieldFilter"
                  key={`tableList-${key}-filter`}
                >
                  {render}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataEnhanced.map(
            ({ tableBackground, ...dataProps }, i) => (
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
                  .map(({ id, data, title }) => {
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
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
