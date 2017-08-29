import React from "react";
import { Table, Input } from "reactstrap";
import uuid from "uuid";

export default ({
  data = [],
  headers = [],
  filter = {},
  onRowClick = () => { },
  onFilter = () => { }
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
      `}
    </style>
    <Table striped hover>
      <thead>
        <tr>
          {headers.map(({ title, id }) =>
            <th key={`${title}-${id}`}>
              {title}
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
          // TODO Add sorting
          .map(dataProps =>
            <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
              {headers
                .map(({ id, type, title, action }) => ({
                  data: dataProps[id],
                  type,
                  title,
                  action
                }))
                .map(({ data, type, title, action }) =>
                  <td key={uuid()}>
                    {data}
                  </td>
                )}
            </tr>
          )}
      </tbody>
    </Table>
  </div>;
