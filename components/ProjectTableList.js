import React from "react";
import { sort, compose, reverse, filter, reduce, toPairs } from "ramda";

export default props => {
  const {
    data = [],
    header = {},
    sortKey = "",
    sortDesc = false,
    sortFunc = {},
    filterRender = {},
    filterFunc = {},
    onSort = () => {}
  } = props;

  const filterByKey = (key, func = () => true) => filter(v => func(v));

  const { [sortKey]: selectSortFunc = (a, b) => a - b } = sortFunc;

  // Sorting and filtering here
  const dataEnhanced = compose(
    (list = []) => (sortDesc ? reverse(list) : list),
    sort(selectSortFunc),
    (list = []) =>
      reduce(
        (acc, [key, func]) => filterByKey(key, func)(acc),
        list,
        toPairs(filterFunc)
      )
  )(data);

  const gridTemplateColumns = Object.entries(header)
    .map(() => `1fr`)
    .join(" ");

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            display: grid;
            overflow-y: auto;
            grid-template-columns: ${gridTemplateColumns};
            grid-row-gap: 1px;
            width: 100%;
            align-content: start;
          }

          .fieldFilter {
            padding: 3px;
            border: none;
            background: white;
          }

          .headerCell {
            padding: 3px;
            border: none;
            user-select: none;
            position: sticky;
            top: 0;
            background: white;
            z-index: 100;
            border-bottom: solid;
            box-shadow: 0px 2px 5px black;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
          }

          .headerCellDisabled {
            pointer-events: none;
          }

          .headerTab:hover {
            background: #d5d5d5;
          }

          .headerTab--active {
            background: #999;
          }

          .headerTab {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 3px;
            background: #eee;
          }

          .dataCell {
            padding: 3px;
            align-self: center;
            height: 100%;
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
      {Object.entries(header).map(([id, title]) => {
        const { [id]: sort } = sortFunc;
        const { [id]: render = null } = filterRender;

        return (
          <div
            className={`headerCell ${!sort && "headerCellDisabled"}`}
            key={`tableList-${title}-${id}`}
          >
            <div
              className={`headerTab ${id == sortKey && "headerTab--active"}`}
              onClick={() => onSort(id)}
            >
              {title}
              {id === sortKey && sort ? (
                <div className={`arrow ${sortDesc ? "arrow--up" : null}`} />
              ) : null}
            </div>
            <div className="fieldFilter" key={`tableList-${id}-filter`}>
              {render}
            </div>
          </div>
        );
      })}
      {dataEnhanced.map(({ tableBackground, tableColor, ...dataProps }, i) =>
        Object.entries(header)
          .map(([id, props]) => ({
            ...props,
            id,
            data: dataProps[id]
          }))
          .map(({ id, data, title }) => {
            return (
              <div
                className="dataCell"
                key={`tableCell-${id}-${title}`}
                style={{
                  ...(tableBackground ? { background: tableBackground } : {}),
                  ...(tableColor ? { color: tableColor } : {})
                }}
              >
                {data !== undefined ? data : null}
              </div>
            );
          })
      )}
    </div>
  );
};
