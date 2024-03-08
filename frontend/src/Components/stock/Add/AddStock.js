import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements'
import BasicFormControlClass from './BasicFormControl';

export default function AddStocks() {
    return (
        <Fragment>
          <Breadcrumbs mainTitle='Stocks' parent='Stocks' subParent='Add New Stock' />
          <Container fluid={true}>
            <Row>
              <Col sm='12'>
                <BasicFormControlClass />
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
}
