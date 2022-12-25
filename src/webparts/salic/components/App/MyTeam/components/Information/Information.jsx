import React, { useContext } from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import './Information.css';
import { AreaChartOutlined, UserOutlined } from '@ant-design/icons';
import { BiWorld } from 'react-icons/bi';
import { CgHashtag } from 'react-icons/cg';
import { RiUser6Line, RiUserStarLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaMobileAlt, FaRegIdCard } from 'react-icons/fa';
import { RxIdCard } from 'react-icons/rx';
import { TiFlowChildren } from 'react-icons/ti';
import { TbUserCircle } from 'react-icons/tb';
import { FiMail } from 'react-icons/fi';
import { MdOutlineGrade } from 'react-icons/md';
import { Bar } from '@ant-design/plots';
import { AppCtx } from '../../../App';
import moment from 'moment';
import { calcDate } from './datesCalc'



const data = [
  {
    year: '2018',
    value: 55,
  },
  {
    year: '2019',
    value: 70,
  },
  {
    year: '2020',
    value: 85,
  },
  {
    year: '2021',
    value: 130,
  },
  {
    year: '2022',
    value: 100,
  },
];
const config = {
  data,
  xField: 'value',
  yField: 'year',
  barWidthRatio: 0.75,
  height: 300,
  seriesField: 'year',
  legend: {
    position: 'top-right',
  },
};


const { Text } = Typography;




const Information = ({ userData }) => {
  const { user_data } = useContext(AppCtx);


  let workingYears = {};
  if(userData && Object.keys(userData).length > 0) {
    var dateParts = userData?.HireDate?.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    workingYears = calcDate(moment(dateObject).format('MM-DD-YYYY'), moment(new Date()).format('MM-DD-YYYY'))
    workingYears = calcDate(moment(dateObject).format('MM-DD-YYYY'), moment(new Date()).format('MM-DD-YYYY'))
  }


  return (
    <div className='profile-container'>

      <Row gutter={[20, 20]}>
        <Col sm={24} md={24} lg={12} xxl={12} /* sm={24} md={12} lg={12} xxl={6} */>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><UserOutlined /> Summary</Text>}>
            <div className='card-content'>
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Full Name" groupSeparator="" value={userData?.DisplayName || ' - '} prefix={<TbUserCircle />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Job Title" groupSeparator="" value={userData?.Title || ' - '} prefix={<RxIdCard />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Department" groupSeparator="" value={userData?.Department || ' - '} prefix={<TiFlowChildren />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Nationality" groupSeparator="" value={userData?.Nationality || ' - '} prefix={<BiWorld />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Ext" groupSeparator="" value={userData?.Ext || ' - '} prefix={<CgHashtag />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="PIN" groupSeparator="" value={parseInt(userData?.PIN, 10) || ' - '} prefix={<FaRegIdCard />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Manager" groupSeparator="" value={userData?.DirectManager?.DisplayName || user_data?.Data?.DisplayName || ' - '} prefix={<RiUser6Line />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="HireDate" groupSeparator="" value={userData?.HireDate || ' - '} prefix={<AiOutlineCalendar />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Mobile" groupSeparator="" value={userData?.Mobile || ' - '} prefix={<FaMobileAlt />} />
              <a className='email-part' href={`mailto:${userData?.Mail}`} title={`Click to contact with ${userData?.DisplayName}`}><Statistic valueStyle={{fontSize: '1.2rem', display: 'flex'}} title="Mail" groupSeparator="" value={userData?.Mail || ' - '} prefix={<FiMail />} /></a>
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Grade" groupSeparator="" value={userData?.OfficeLocation || ' - '} prefix={<MdOutlineGrade />} />
              <Statistic valueStyle={{fontSize: '1.2rem'}} title="Working Years" groupSeparator="" value={workingYears?.result || ' - '} prefix={<RiUserStarLine />} />
            </div>
          </Card>
        </Col>

        <Col sm={24} md={24} lg={12} xxl={12}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><AreaChartOutlined /> Performance</Text>} >
            <Bar {...config} />
          </Card>
        </Col>

      </Row>

    </div>
  )
}

export default Information









/* <div className='profile-information'>
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
                  <Col><Text>{userData?.DirectManager?.DisplayName || ' - '}</Text></Col>
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
          </div> */