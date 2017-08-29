import React from "react";
import { Table, Input } from "reactstrap";
import uuid from "uuid";

export default ({
  data = [],
  headers = [],
  filter = {},
  sort = {},
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

        .dataCellSort:hover {
          background: #ade2ff;
        }
      `}
    </style>
    <Table striped hover>
      <thead>
        <tr>
          {headers.map(({ title, id }) =>
            <th
              className="headerCell"
              key={`${title}-${id}`}
              onClick={() => onSort({ id })}
            >
              {id === sort.id ? !sort.desc ? <div className="headerCellSort" /> : null : null}
              {title}
              {id === sort.id ? sort.desc ? <div className="headerCellSort" /> : null : null}
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
          .sort(({ [sort.id]: a = '' }, { [sort.id]: b = '' }) =>
            !sort.desc ? a.localeCompare(b) : b.localeCompare(a))
          .map(dataProps =>
            <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
              {headers
                .map(({ ...props, id }) => ({
                  ...props,
                  data: dataProps[id],
                }))
                .map(({ id, data, type, title, action }) =>
                  <td className={id == sort.id ? 'dataCellSort' : ''} key={uuid()}>
                    {data}
                  </td>
                )}
            </tr>
          )}
      </tbody>
    </Table>
  </div>;
