import React, { Fragment, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTeamDetail } from "../../../Redux/Slices/teamSlice";
import DataTableComponent from "./DataTableComponent";
import HeaderCard from "../../Common/Component/HeaderCard";


const UsersProfileContain = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {loading,team_member}=useSelector(state=>state.team);
  useEffect(()=>{
    dispatch(getTeamDetail(id));
  },[]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Team Detail" parent="Team Detail" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <UserProfile user={team_member.user}/>
            <Col sm="12">
            <Card>
              <HeaderCard title="Assigned Stocks" />
              <CardBody>
                
                <DataTableComponent stocks={team_member.assinedstocks} loading={loading}/>
              </CardBody>
            </Card>
          </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default UsersProfileContain;
