import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { Spinner } from 'reactstrap';


const DataTableComponent = ({summary,loading}) => {
    const usersData = summary.map((item, index) => ({
        id: index,
        Name: item.team_id.name,
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