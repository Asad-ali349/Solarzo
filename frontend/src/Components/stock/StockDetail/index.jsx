import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetail } from '../../../Redux/Slices/stockSlice';
import DataTableComponent from './DataTableComponent';

const StockDetail = () => {
  const {id}=useParams()
  const {loading,selectedStock}=useSelector(state=>state.stock)
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getStockDetail(id))
  }, []);


  return (
    <Fragment>
    <Breadcrumbs mainTitle="Stocks Detail" parent="stocks detail"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title={`Stock Detail:`} />
              <CardBody>
                {
                  !loading && Object.keys(selectedStock.stock).length>1 ?   (
                    <>
                    <Row className='row'>
                      {
                         Object.entries(selectedStock.stock).map(([key, value]) => {
                          if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v') {
                              return (
                                  <Col md={3} sm={12}><p key={key}><b>{key}:</b> {value}</p></Col>
                              );
                          }
                          return null; // Return null for excluded keys
                      })
                      }
                     
                    </Row>
                    </>
                  ):(
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Spinner animation="border" size="sm" />
                    </div>
                  )
                }
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <HeaderCard title={`Summary`} />
              <CardBody>
                <DataTableComponent summary={selectedStock.summary} loading={loading}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default StockDetail;