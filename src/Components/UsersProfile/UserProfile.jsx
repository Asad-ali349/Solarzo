import React, { Fragment, useState } from 'react';
import { Col, Card, CardHeader, Row } from 'reactstrap';
import { H6, Image,} from '../../../src/AbstractElements';
import { ContactUs,  Email, Location } from '../../Constant';
import { useNavigate } from 'react-router';
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfile = () => {

  const [url, setUrl] = useState('');
  const navigate=useNavigate();
  
  return (
    <Fragment>
      
        <Col sm='12'>
           <Card className='hovercard text-center'>
             <CardHeader className='cardheader'></CardHeader>
             <div className='user-image'>
               <div className='avatar'>
                  <Image attrImage={{ className: 'step1', alt: '', src: `${url ? url : require('../../assets/images/user/sample.png')}` }} />  
               </div>
               <div className='icon-wrapper step2' onClick={() => navigate("/edit_profile")}>
                 <i className='icofont icofont-pencil-alt-5' >
                   
                 </i>
               </div>
             </div>
             <div className='info'>
               <Row className='step3' data-intro='This is the your details'>
                 <Col sm='6' lg='4' className='order-sm-1 order-xl-0'>
                   <Row>
                     <Col md='6'>
                       <div className='ttl-info text-start'>
                         <H6>
                           <i className='fa fa-envelope me-2'></i> {Email}
                         </H6>
                         <span>{"abc@gmail.com"}</span>
                       </div>
                     </Col>
                     <Col md='6'>
                       <div className='ttl-info text-start ttl-xs-mt'>
                         <H6>
                           <i className='fa fa-phone me-2'></i>
                           {ContactUs}
                         </H6>
                         <span>{'1234567899'}</span>
                       </div>
                     </Col>
                   </Row>
                 </Col>
                 <Col sm='12' lg='4' className='order-sm-0 order-xl-1'>
                   <div className='user-designation'>
                     <div className='title'>
                       <a target='_blank' href='#javascript'>
                         {'John'}
                       </a>
                     </div>
                     
                   </div>
                 </Col>
                 <Col sm='6' lg='4' className='order-sm-2 order-xl-2'>
                   <Row>
                   <Col md='6'>
                       <div className='ttl-info text-start ttl-sm-mb-0'>
                         <H6>
                           <i className='fa fa-location-arrow me-2'></i>
                           {Location}
                         </H6>
                         <span>{'strret,city,state'}</span>
                       </div>
                     </Col>
                     <Col md='6'>
                       <div className='ttl-info text-start ttl-xs-mt'>
                         <H6>
                           <i className='fa fa-phone me-2'></i>
                           {ContactUs}
                         </H6>
                         <span>{'12345'}</span>
                       </div>
                     </Col>
                     
                   </Row>
                 </Col>
               </Row>
               
              
             </div>
           </Card>
        </Col> 

      
    </Fragment>
  );
};

export default UserProfile;
