import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './table.css';

const TableComponent = ({ headerData, tableData, decrementPageNo, incrementPageNo, pageNo = 0, decrementButtonDisable = false, showPagination=true ,containerClassName="" }) => {
  
    const getTableRow = () => {
        return tableData.map((rowObj, index) => {
            return <tr key={"table-row-" + index}>
                {headerData.map((v, index) => (<td key={v + index}>
                    {v === 'image' ? 
                        <img src={rowObj[v]} width="50px" alt="image" onLoad={() => console.log("image loaded")} />
                     : rowObj[v]}
                </td>))}
            </tr>
        })
    }

    return (
        <div className={containerClassName}>
           {/* {showPagination && <div className="table-pagination">
                <Pagination>
                    <Pagination.Prev onClick={decrementPageNo} disabled={decrementButtonDisable} />
                    <Pagination.Item>{pageNo}</Pagination.Item>
                    <Pagination.Next onClick={incrementPageNo} />
                </Pagination>
            </div>} */}
            <Table striped bordered hover responsive>
                <thead >
                    <tr>
                        {headerData.map(th => <th key={th} style={{ textTransform: 'uppercase' }}>{th}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {getTableRow()}
                </tbody>
            </Table>
           
        </div>
    )
}

export default TableComponent;