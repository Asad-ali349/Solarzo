import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { CiViewList } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { deleteTeam, getTeam } from '../../../Redux/Slices/teamSlice';


const DataTableComponent = () => {
    const {teams,loading}=useSelector(state=>state.team);
    const dispatch = useDispatch();
    const navigate=useNavigate();
 
    const usersData = teams.map((item, index) => ({
        id: index,
        Name: item.name,
        Email:item.email,
        Phone: item.phone,
        Address: item.street+item.city??','+item.city,
        Action: 
        <>
        <CiViewList style={{fontSize:'20px',color:'green',cursor:'pointer'}} onClick={()=>navigate('/user/'+item._id)}/>
        <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}}  onClick={async ()=>{
            await dispatch(deleteTeam(item._id)) 
            await dispatch(getTeam())
        }}/>
        </>
    }));
    
    useEffect(()=>{
        dispatch(getTeam())
    },[]);

    return (
        <Fragment>
            
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" size="sm" />
                </div>
            ) : (

                <>
                <button className='btn btn-primary' style={{float:'right', marginBottom:'30px'}} onClick={()=>navigate('/users/add')}>Add New Team</button>
                <DataTable
                    data={usersData}
                    columns={tableColumns}
                    striped={true}
                    center={true}
                    pagination
                    />
                
                </>
            )} 
        </Fragment>
    )
}
export default DataTableComponent