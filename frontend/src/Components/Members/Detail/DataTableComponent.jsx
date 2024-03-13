import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useNavigate } from "react-router-dom";
import { Spinner } from 'reactstrap';


const DataTableComponent = ({stocks,loading}) => {
    const navigate=useNavigate();
    console.log(stocks)
    const usersData = stocks.map((item, index) => ({
        id: index,
        Name: item.stock_id.name,
        Quantity:item.quantity,
    }));

    return (
        <Fragment>
            
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" size="sm" />
                </div>
            ) : (
                <DataTable
                    data={usersData}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination
                    />
            )} 
        </Fragment>
    )
}
export default DataTableComponent