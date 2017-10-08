import React from "react";
import { Table, Input } from "reactstrap";
import uuid from "uuid";

export default (props) => {
  const {
    data = [],
    headers = [],
    onRowClick = () => { },
    onFilter = () => { },
    onSort = () => { },
    settings = {
      filter: {
      status: "",
      patientName: "",
      studyName: "",
      modality: "",
      location: "",
      client: "",
  },
  sort: {
      id: 'status', // Set default soft id
      desc: false,
  }}
  } = props;
  console.log(settings)
  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            overflow: auto;
          }

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
                  {title}
                </th>
            )}
          </tr>
          <tr className="fieldColor">
            { headers.map(
              ({ id }) => (
                <td className="fieldFilter" key={`${id}-filter`}>
                  <Input
                    type="text"
                    name={`filter-${id}`}
                    value={settings.filter[id]}
                    onChange={({ target: { value } = {} }) =>
                    onFilter({ [id]: value })}
                  />
                </td>
              )
            ) }
          </tr>
        </thead>
        <tbody>
          {
            data.map(dataProps =>
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
            )
          }
        </tbody>
      </Table>
    </div>
  )
};
