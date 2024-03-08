import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tableColumns } from './Defaultdata';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Col, Row, Spinner, } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { CiViewList } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { deleteStock, getStock } from '../../Redux/Slices/stockSlice';
import { FaRegEdit } from "react-icons/fa";

const DataTableComponent = () => {
    const dispatch=useDispatch();
    const {loading,stocks}=useSelector(state=>state.stock);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModelData] = useState({});
    const navigate=useNavigate();   



    const openModal = (data) => {
        setShowModal(true);
        setModelData(data)
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        
    };


    const usersData = stocks.map((item, index) => ({
        id: index,
        Name: item.name,
        Quantity:item.quantity,
        Action: <Fragment>
                    <CiViewList style={{fontSize:'20px',color:'green',cursor:'pointer'}}  onClick={()=>openModal(item)}/>
                    <FaRegEdit style={{fontSize:'20px',color:'blue',cursor:'pointer'}} onClick={()=>navigate('/stock/edit/'+item._id)}/>
                    <MdDelete style={{fontSize:'20px',color:'red',cursor:'pointer'}} onClick={async ()=>{
                        await dispatch(deleteStock(item._id))
                        await dispatch(getStock())
                    }}/>
                </Fragment>
    }));
    useEffect(()=>{
        dispatch(getStock());
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
                            <ModalHeader toggle={closeModal}>Stock Detail</ModalHeader>
                            <ModalBody>
                                <Row>
                                    {
                                        Object.entries(modalData).map(([key, value]) => {
                                            if (key != '_id' && key != 'createdAt' && key != 'updatedAt' && key != '__v') {
                                                return (
                                                    <Col md={6} sm={12}><p><b>{key}:</b> {value}</p></Col>
                                                );
                                            }
                                        })
                                        
                                    }
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