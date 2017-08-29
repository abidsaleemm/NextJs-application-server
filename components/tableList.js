import React from "react";
import { Table, Input } from "reactstrap";
import uuid from "uuid";

export default ({
  data = [],
  headers = [],
  filter = {},
  sort: {
    id: sortId = '',
    desc: sortDesc = false,
  } = {},
  onRowClick = () => { },
  onFilter = () => { },
  onSort = () => { },
}) =>
  <div>
    <style jsx>
      {`
        .fieldFilter {
          padding: 0.4em;
        }

        .fieldColor {
          background: #ddd;
        }

        .headerCell {
          white-space: nowrap;
          cursor: pointer;
          padding: 0.65em;
        }

        .headerCellDisabled {
          white-space: nowrap;
          padding: 0.65em;
        }

        .headerCell:hover {
          background: #d5d5d5;
        }
        
        .headerCellSort {
          width: 100%;
          height: 0.25em;
          background: #1bf;
        }

        .dataCellSort {
          background: #e0f4ff;
        }
      `}
    </style>
    <Table striped hover>
      <thead>
        <tr>
          {headers.map(({ title, id, sortDisabled }) =>
            sortDisabled ?
              <th
                className="headerCellDisabled"
                key={`${title}-${id}`}
              >
                {title}
              </th>
              :
              <th
                className="headerCell"
                key={`${title}-${id}`}
                onClick={() => onSort({ id })}
              >
                {id === sortId ? !sortDesc ? <div className="headerCellSort" /> : null : null}
                {title}
                {id === sortId ? sortDesc ? <div className="headerCellSort" /> : null : null}
              </th>
          )}
        </tr>
        <tr className="fieldColor">
          {headers.map(
            ({ id }) =>
              filter[id] !== undefined
                ? <td className="fieldFilter" key={`${id}-filter`}>
                  <Input
                    type="text"
                    name={`filter-${id}`}
                    value={filter[id]}
                    onChange={({ target: { value } = {} }) =>
                      onFilter({ [id]: value })}
                  />
                </td>
                : <td key={`${id}-filter`} />
          )}
        </tr>
      </thead>
      <tbody>
        {data
          .filter(v =>
            Object.entries(v).reduce(
              (a, [k, dataValue]) =>
                filter[k] !== undefined
                  ? filter[k] !== ""
                    ? new RegExp(`${filter[k]}`, 'gi').test(dataValue)
                    : a
                  : a,
              true
            ))
          .sort(({ [sortId]: a = '' }, { [sortId]: b = '' }) =>
            !sortDesc ? a.localeCompare(b) : b.localeCompare(a))
          .map(dataProps =>
            <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
              {headers
                .map(({ ...props, id }) => ({
                  ...props,
                  data: dataProps[id],
                }))
                .map(({ id, data, type, title, action }) =>
                  <td key={uuid()}>
                    {data}
                  </td>
                )}
            </tr>
          )}
      </tbody>
    </Table>
  </div>;
