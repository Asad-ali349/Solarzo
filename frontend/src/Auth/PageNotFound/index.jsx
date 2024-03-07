import React, { Fragment } from "react";
import { Col, Container,Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const PageNotFound = ({ selected }) => {
  const navigate=useNavigate();
  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12" >
            <div style={{display:'flex',justifyContent:"center",alignItems:'center',height:'100vh'}}>
                <div style={{width:'400px'}} className="text-center">
                    <h3 className="text-center">Page Not Found</h3>
                    <button type="button" onClick={()=>navigate(-1)} className="btn btn-primary">Go Back</button>
                </div>

            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );

};

export default PageNotFound;
