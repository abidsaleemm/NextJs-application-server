import React from "react";
import { Table, Button } from 'reactstrap';
import uuid from 'uuid';

export default ({ data = [], headers = [], onRowClick = () => {} }) => (
    <Table striped hover>
        <thead>
            <tr>
                {headers.map(({ title, id }) =>
                    <th key={`${title}-${id}`}>{title}</th>
                )}
            </tr>
        </thead>
        <tbody>
            {data.map((dataProps) => (
                <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
                    {headers
                        .map(({ id, type, title, action }) => ({ data: dataProps[id], type, title }))
                        .map(({ data, type, title, action }) => ( 
                            <td key={uuid()}>{type === 'button' ? <Button onClick={() => window.location = `/pdf/?id=${dataProps.studyUID}`} >{}{title}</Button> : data} </td>))
                    }
                </tr>
            ))}
        </tbody>
    </Table>
)