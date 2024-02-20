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
    name:'john',
    email:'example@gmail.com',
    phone:'1234567878',
    address:'street,address,city'
   }]
    const navigate=useNavigate();


    const usersData = users.map((item, index) => ({
        id: index,
        Name: item.name,
        Email:item.email,
        Phone: item.phone,
        Address: item.address,
        Action: <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}} />
    }));


    return (
        <Fragment>
            
            {/* {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" size="sm" />
                </div>
            ) : ( */}

                <>
                <button className='btn btn-primary' style={{float:'right', marginBottom:'30px'}} onClick={()=>navigate('/users/add')}>Add New User</button>
                <DataTable
                    data={usersData}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination
                    />
                
                </>
            {/* )}  */}
        </Fragment>
    )
}
export default DataTableComponent