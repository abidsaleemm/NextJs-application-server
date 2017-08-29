import React from "react";
import { Table, Button } from 'reactstrap';
import uuid from 'uuid';




export default ({ data = [], headers = [], sort = () => {}, onRowClick = () => {} }) => (
    
    <Table striped hover>
        <thead>
            <tr>
                {headers.map(({ title, id, type, action }) =>
                    <th key={`${title}-${id}`} onClick={() => sort (id, data)} >{title}</th>
                )}
            </tr>
        </thead>
        <tbody>
            {data.map((dataProps) => (
                <tr key={uuid()} onClick={() => onRowClick(dataProps)}>
                    {headers
                        .map(({ id, type, title }) => ({ data: dataProps[id], type, title }))
                        .map(({ data, type, title }) => (
                            <td key={uuid()}>{type === 'button' ? <Button>{title}</Button> : data}</td>))
                    }
                </tr>
            ))}
        </tbody>
    </Table>
)