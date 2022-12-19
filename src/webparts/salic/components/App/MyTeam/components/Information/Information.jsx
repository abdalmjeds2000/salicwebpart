import React from 'react';
import { Card, Col, Divider, Image, Rate, Row, Statistic, Table, Tag, Tooltip, Typography } from 'antd';
import './Information.css';
import { AreaChartOutlined, CheckCircleOutlined, CloseCircleOutlined, ContactsOutlined, ExclamationCircleOutlined, LogoutOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiWorld } from 'react-icons/bi';
import { CgHashtag } from 'react-icons/cg';
import { RiUser6Line } from 'react-icons/ri';
import { AiOutlineCalendar, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaMobileAlt, FaRegIdCard } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { MdOutlineGrade } from 'react-icons/md';
import { Bar } from '@ant-design/plots';
import moment from 'moment';



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


const { Text, Title } = Typography;

const Information = ({ userData, attendanceData }) => {
  return (
    <div className='profile-container'>
      <Card style={{backgroundColor: '#f5f5f5'}}>
        <div className="header">
          <Image
            width={115}
            src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=l&username=${userData?.Mail}`}
            preview={{src: `https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=L&username=${userData?.Mail}`,}}
          />
          <div>
            <Title level={1}>{userData?.DisplayName || ' - '}</Title>
            <Text style={{fontSize: '1.4rem'}}>{userData?.Title || ' - '}</Text>
            <Tooltip title="Grade: B"><Rate disabled defaultValue={5} /></Tooltip>
          </div>
        </div>
      </Card>




      <Row gutter={[20, 20]}>
        <Col sm={24} md={12} lg={8} xxl={6}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.4rem'}}><UserOutlined /> Personal</Text>}>
            <div className='card-content'>
              <Statistic title="Department" groupSeparator=""value={userData?.Department || ' - '} prefix={<HiOutlineOfficeBuilding />} />
              <Statistic title="Nationality" groupSeparator=""value={userData?.Nationality || ' - '} prefix={<BiWorld />} />
              <Statistic title="Ext" groupSeparator=""value={userData?.Ext || ' - '} prefix={<CgHashtag />} />
              <Statistic title="PIN" groupSeparator="" value={parseInt(userData?.PIN, 10) || ' - '} prefix={<FaRegIdCard />} />
              <Statistic title="Manager" groupSeparator=""value={userData?.DirectManager?.DisplayName || ' - '} prefix={<RiUser6Line />} />
              <Statistic title="HireDate" groupSeparator="" value={userData?.HireDate || ' - '} prefix={<AiOutlineCalendar />} />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8} xxl={6}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.4rem'}}><ContactsOutlined /> Contact</Text>}>
            <div className='card-content'>
              <Statistic title="Mobile" groupSeparator="" value={userData?.Mobile || ' - '} prefix={<FaMobileAlt />} />
              <Statistic title="Mail" groupSeparator=""value={userData?.Mail || ' - '} prefix={<FiMail />} />
              <Statistic title="Grade" groupSeparator=""value={userData?.OfficeLocation || ' - '} prefix={<MdOutlineGrade />} />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8} xxl={6}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.4rem'}}><AiOutlineCheckCircle /> Latest Attendance</Text>} bodyStyle={{padding: 0}}>
            <Table
              size='small'
              columns={[
                { width: `${100 / 3}%`, title: 'Date', dataIndex: 'Date', render: (val) => val || ' - '},
                { width: `${100 / 3}%`, title: 'Day', dataIndex: 'Day', render: (val) => val || ' - '},
                { width: `${100 / 3}%`, title: 'Status', dataIndex: 'IsAbsent', render: (val) => {
                  if(val) {
                    return <Tag icon={<CloseCircleOutlined />} color="error">Absent</Tag>
                  } else {
                    return <Tag icon={<ExclamationCircleOutlined />} color="warning">Incomplete</Tag>
                  }
                }},
              ]}
              dataSource={attendanceData}
              pagination={false}
            />
          </Card>
        </Col>


        <Col sm={24} md={12} lg={8} xxl={6}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.4rem'}}><LogoutOutlined /> Latest Leaves</Text>} bodyStyle={{padding: 0}}>
            <Table
              size='small'
              columns={[
                { width: `${100 / 3}%`, title: 'From', dataIndex: 'from', render: (val) => moment(val).format('MM/DD/YYYY') },
                { width: `${100 / 3}%`, title: 'To', dataIndex: 'to', render: (val) => moment(val).format('MM/DD/YYYY') },
                { width: `${100 / 3}%`, title: 'Status', dataIndex: 'status', render: (val) => {
                    if(val === "Approved") {
                      return <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
                    }else if(val === "Rejected") {
                      return <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
                    } else {
                      return <Tag icon={<SyncOutlined spin />} color="processing">Pending</Tag>
                    }
                  }
                },
              ]}
              dataSource={[
                {from: new Date(), to: new Date(), days: 4, status: 'Pending', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Pending', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Approved', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Approved', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Rejected', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Rejected', type: 'Vacation Type'},
                {from: new Date(), to: new Date(), days: 4, status: 'Approved', type: 'Vacation Type'},
              ]}
              pagination={false}
            />
          </Card>
        </Col>



        <Col sm={24} md={24} lg={16} xxl={12}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.4rem'}}><AreaChartOutlined /> Performance</Text>} >
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