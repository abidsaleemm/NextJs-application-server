import React from "react";
import { Table, Input } from 'reactstrap';
import uuid from 'uuid';

export default ({ data = [], headers = [], onRowClick = () => { } }) => (
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
                        <th key={`${title}-${id}`}>{title}</th>
                    )}
                </tr>
                <tr className="fieldColor">
                    {headers.map(({ id, filter }) => filter !== undefined ?
                        (<td className="fieldFilter" key={`${id}-filter`}>
                            <Input type='text' name={`filter-${id}`} placeholder={filter} />
                        </td>) : <td key={`${id}-filter`} />
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((dataProps) => (
                    <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
                        {headers
                            .map(({ id, type, title, action }) =>
                                ({ data: dataProps[id], type, title, action }))
                            .map(({ data, type, title, action }) =>
                                (<td key={uuid()}>{data}</td>))
                        }
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
)