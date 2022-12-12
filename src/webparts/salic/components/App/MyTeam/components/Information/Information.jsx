import React, { useContext } from 'react';
import { Col, Divider, Image, Row, Typography } from 'antd';
import './Information.css';
import { AppCtx } from '../../../App';


const { Text, Title } = Typography;

const Information = () => {
  const { user_data } = useContext(AppCtx);

  const userData = user_data.Data;
  return (
    <div className='profile-container'>
      <Row style={{padding: '40px'}}>
        {/* <Col sm={24} md={6} style={{paddingRight: 20}}>
          <Image
            src="https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=l&username=abdulmohsen.alaiban@salic.com"
          />
        </Col> */}

        <Col sm={24} md={24}>
          <div className='profile-information'>
            <div className="header">
              <Title level={2}>{userData?.DisplayName || ' - '}</Title>
              <Text style={{fontSize: '1.3rem'}}>{userData?.Title || ' - '}</Text>
            </div>
            
            <div className='personal'>
              <Divider orientation="left" orientationMargin="0" style={{fontSize: '1.3rem'}}>
                Personal
              </Divider>

              <div style={{padding: '0 20px'}}>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Department</Text></Col>
                  <Col><Text>{userData?.Department || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Nationality</Text></Col>
                  <Col><Text>{userData?.Nationality || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>PIN</Text></Col>
                  <Col><Text>{userData?.PIN || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Ext</Text></Col>
                  <Col><Text>{userData?.Ext || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Manager</Text></Col>
                  <Col><Text>{userData?.DirectManager || ' - '?.DisplayName}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Hire Date</Text></Col>
                  <Col><Text>11-1-2021</Text></Col>
                </Row>
              </div>
            </div>



            <div className='contact'>
              <Divider orientation="left" orientationMargin="0" style={{fontSize: '1.3rem'}}>
                Contact
              </Divider>
                <div style={{padding: '0 20px'}}>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Mobile</Text></Col>
                  <Col><Text>{userData?.Mobile || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Mail</Text></Col>
                  <Col><Text>{userData?.Mail || ' - '}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{fontSize: '1.3rem'}}>
                  <Col><Text strong>Grade</Text></Col>
                  <Col><Text>{userData?.OfficeLocation || ' - '}</Text></Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Information