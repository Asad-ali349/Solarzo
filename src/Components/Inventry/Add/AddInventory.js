import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements'
import BasicFormControlClass from './BasicFormControl';

export default function AddInventory() {
    return (
        <Fragment>
          <Breadcrumbs mainTitle='Inventory' parent='Inventory' subParent='Add New Inventory' />
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
