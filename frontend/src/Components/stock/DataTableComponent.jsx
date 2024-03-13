import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Col, Row, Spinner, } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { CiViewList } from "react-icons/ci";
import { MdDelete,MdAssignmentAdd } from "react-icons/md";
import { AssignStock, deleteStock, getStock, stockSliceAction } from '../../Redux/Slices/stockSlice';
import { FaRegEdit } from "react-icons/fa";
import { getTeam } from '../../Redux/Slices/teamSlice';

const styles={
    actionStyle:{
        fontSize:'20px',
        cursor:'pointer',
        marginLeft:'7px'
    },
    edit:{
        color:'blue',
    },
    view:{
        color:'green'
    },
    delete:{
        color:'red'
    }
}

const DataTableComponent = () => {
    const dispatch=useDispatch();
    const {loading,stocks}=useSelector(state=>state.stock);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModelData] = useState({});
    const navigate=useNavigate();   
    const {teams}=useSelector(state=>state.team);
    const [assignStock,SetAssignStock]=useState({
        stock_id:'',
        team_id:'',
        quantity:''
    })

    const openModal = (data) => {
        setShowModal(true);
        SetAssignStock({stock_id:data._id, team_id:'',quantity:''})
        setModelData(data)
        
    };

    const closeModal = () => {
        setShowModal(false);
        
    };

    

    const usersData = stocks.map((item, index) => ({
        id: index,
        Name: item.name,
        Quantity:item.quantity,
        Action: <Fragment>
                    <MdAssignmentAdd style={{ ...styles.actionStyle }} onClick={() => openModal(item)}/>
                    <CiViewList
                        style={{ ...styles.actionStyle, ...styles.view }} // Merge styles using spread operator
                        onClick={() => navigate('/stock/detail/'+item._id)}
                    />
                    <FaRegEdit
                        style={{ ...styles.actionStyle, ...styles.edit }} // Merge styles using spread operator
                        onClick={async () => {
                        await dispatch(stockSliceAction.singleStock(item));
                        navigate(`/stock/edit`);
                        }}
                    />
                    <MdDelete
                        style={{ ...styles.actionStyle, ...styles.delete }} // Merge styles using spread operator
                        onClick={async () => {
                        await dispatch(deleteStock(item._id));
                        await dispatch(getStock());
                        }}
                    />
                </Fragment>
    }));
    useEffect(()=>{
        dispatch(getStock());
        dispatch(getTeam());
    },[])

    return (
        <Fragment>
            {
                loading?
                (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner animation="border" size="sm" />
                    </div>
                ):(
                    <>
                        <button className='btn btn-primary' style={{float:'right', marginBottom:'30px'}} onClick={()=>navigate('/stock/add')}>Add New Stock</button>
                        <DataTable
                            data={usersData}
                            columns={tableColumns}
                            striped={true}
                            center={true}
                            pagination
                        />
                        <Modal isOpen={showModal} toggle={closeModal} centered>
                            <ModalHeader toggle={closeModal}>Stock: {modalData.name}</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col md={12}>
                                        <label htmlFor="team">Select Team</label>
                                         <select name="team" id="" className='form-control' value={assignStock.team_id} onChange={(e)=>SetAssignStock({...assignStock,team_id:e.target.value})}>
                                            
                                            <option value="">Select Team</option>
                                            {
                                                teams.map((team)=>(
                                                    <option value={team._id}>{team.name}</option>
                                                ))
                                            }
                                         </select>
                                    </Col>
                                    <Col md={12} className='mt-2'>
                                        <label htmlFor="team">Quantity</label>
                                         <input type="number" name="quantity" id="" className='form-control' placeholder='Enter Quantity' value={assignStock.quantity} onChange={(e)=>SetAssignStock({...assignStock,quantity:e.target.value})} />
                                    </Col>
                                    <Col md={12} className='mt-2'>
                                        <button 
                                            type="button"
                                            className='btn btn-primary'
                                            onClick={
                                                async ()=>{
                                                    await dispatch(AssignStock(assignStock)) 
                                                    await dispatch(getStock())
                                                    closeModal()
                                                }
                                            }>
                                            {loading?'Assigning...':'Assign Stock'}
                                        </button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                    </>
                )
            }

        </Fragment>
    )
}



export default DataTableComponent