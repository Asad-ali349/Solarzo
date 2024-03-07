import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Spinner } from 'reactstrap';

import { MdDelete } from "react-icons/md";


const DataTableComponent = () => {
   
   const users=[{
    _id:'1',
    name:'Hammer',
    quantity:'5'
   }]
    const navigate=useNavigate();


    const usersData = users.map((item, index) => ({
        id: index,
        Name: item.name,
        Quantity:item.quantity,
        Action: <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}} />
    }));


    return (
        <Fragment>
            <button className='btn btn-primary' style={{float:'right', marginBottom:'30px'}} onClick={()=>navigate('/inventory/add')}>Add New Inventory</button>
            <DataTable
                data={usersData}
                columns={tableColumns}
                striped={true}
                center={true}
                pagination
                />
        </Fragment>
    )
}
export default DataTableComponent