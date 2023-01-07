import React, { useContext } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import './Information.css';
import { AreaChartOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { BiUserCheck, BiWorld } from 'react-icons/bi';
import { CgHashtag } from 'react-icons/cg';
import { RiUser6Line, RiUserStarLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaMobileAlt, FaRegIdCard } from 'react-icons/fa';
import { RxIdCard } from 'react-icons/rx';
import { TiFlowChildren } from 'react-icons/ti';
import { TbChartArcs, TbUserCircle } from 'react-icons/tb';
import { FiMail } from 'react-icons/fi';
import { MdOutlineGrade } from 'react-icons/md';
import { Bar } from '@ant-design/plots';
import { AppCtx } from '../../../App';
import moment from 'moment';
import { calcDate } from './datesCalc'
import AttendanceChart from '../../../Global/AttendanceChart/AttendanceChart'

const { Text } = Typography;




const Information = ({ userData, yearsPerformanceData, latestLeavesData, performanceData }) => {
  const { user_data } = useContext(AppCtx);

  let workingYears = {};
  if(userData && Object.keys(userData).length > 0) {
    var dateParts = userData?.HireDate?.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    workingYears = calcDate(moment(dateObject).format('MM-DD-YYYY'), moment(new Date()).format('MM-DD-YYYY'))
    workingYears = calcDate(moment(dateObject).format('MM-DD-YYYY'), moment(new Date()).format('MM-DD-YYYY'))
  }

  const mappingChartData = yearsPerformanceData?.map(row => {
    row.performance = Number(row.performance)?.toFixed(2)?.replace(/\.?0*$/,'');
    return row;
  });
  const config = {
    data: mappingChartData,
    xField: 'performance',
    yField: 'Year',
    seriesField: 'Year',
    label: {
      formatter: (obj) => obj.performance != 0 ? obj.performance : '',
      position: 'right',
    },
    barWidthRatio: 0.75,
    height: 320,
    legend: {
      position: 'top-right'
    },
    xAxis: {
      label: false
    },
    theme: {
      colors10: [
        '#99bbdd',
        '#44aa88',
        '#8888FF',
        '#ffcc00',
        '#0C508C',
        '#ff5555',
        '#44ff88',
        '#ff77aa',
        '#4098FF',
      ]
    },
    animation: {
      appear: {
        animation: 'none',
      },
    },
  }

  const totalBalance = ((12-(new Date().getMonth()+1))*2.5)+performanceData?.leaves?.total;
  const attendancChartData = [
    { name: "Consumed This Year", value: performanceData?.leaves?.consumedThisYear, type: "Consumed" },
    { name: "Leave Balance", value: totalBalance, type: `Total balance till end of the year.` },
  ];



  const attendanceTableColumns = [
    { title: 'Name', render: _ => <div style={{minWidth: 150}}>{userData.DisplayName}</div> || ' - '},
    { title: 'Date', dataIndex: 'Date', render: (val) => new Date(val).toLocaleDateString() || ' - '},
    { 
      title: 'Status', 
      dataIndex: 'Status',
      render: (val) => {
        const v = typeof val == "string" ? val?.toLowerCase() : "";
        switch(v) {
          case "pending":
            return <Tag icon={<SyncOutlined />} color="warning">Pending</Tag>
          case "approved":
            return <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
          case "rejected":
            return <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
          default:
            return <Tag color="default">{val}</Tag>;
        }
      }
    },
    { title: 'Reason', dataIndex: 'Reason' },
  ];

  return (
    <div className='profile-container'>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><UserOutlined /> Summary</Text>}>
            <div className='card-content'>
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Full Name" groupSeparator="" value={userData?.DisplayName || ' - '} prefix={<TbUserCircle />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Job Title" groupSeparator="" value={userData?.Title || ' - '} prefix={<RxIdCard />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Department" groupSeparator="" value={userData?.Department || ' - '} prefix={<TiFlowChildren />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Nationality" groupSeparator="" value={userData?.Nationality || ' - '} prefix={<BiWorld />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Ext" groupSeparator="" value={userData?.Ext || ' - '} prefix={<CgHashtag />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Employee Id" groupSeparator="" value={parseInt(userData?.PIN, 10) || ' - '} prefix={<FaRegIdCard />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Manager" groupSeparator="" value={userData?.DirectManager?.DisplayName || user_data?.Data?.DisplayName || ' - '} prefix={<RiUser6Line />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Hire Date" groupSeparator="" value={userData?.HireDate || ' - '} prefix={<AiOutlineCalendar />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Mobile" groupSeparator="" value={userData?.Mobile || ' - '} prefix={<FaMobileAlt />} />
              <a className='email-part ticket' href={`mailto:${userData?.Mail}`} title={`Click to contact with ${userData?.DisplayName}`}>
                <Statistic valueStyle={{fontSize: '1.2rem', display: 'flex'}} title="Mail" groupSeparator="" value={userData?.Mail || ' - '} prefix={<FiMail />} />
              </a>
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Grade" groupSeparator="" value={userData?.OfficeLocation || ' - '} prefix={<MdOutlineGrade />} />
              <Statistic className='ticket' valueStyle={{fontSize: '1.2rem'}} title="Working Years" groupSeparator="" value={workingYears?.result || ' - '} prefix={<RiUserStarLine />} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><AreaChartOutlined /> Performance</Text>} >
            <Bar {...config} />
          </Card>
        </Col>


        {
          !["999999999", "000000000"].includes(userData?.PIN)
          ? (
            <>
              <Col xs={24} sm={24} md={24} lg={8}>
                <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><TbChartArcs /> Attendance Overview</Text>}>
                  <div>
                    <AttendanceChart 
                      data={attendancChartData}
                      totalBalance={totalBalance}
                      total={performanceData?.leaves?.total}
                      width={220}
                      height={170}
                    />
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Card style={{height: '100%'}} title={<Text style={{fontSize: '1.2rem'}}><BiUserCheck /> Latest Leaves</Text>} bodyStyle={{padding: 0}}>
                  <div style={{overflowX: 'auto'}}>
                    <Table 
                      columns={attendanceTableColumns} 
                      dataSource={latestLeavesData} 
                      pagination={false} 
                      size="small"
                    />
                  </div>
                </Card>
              </Col>
            </>
          ) : (
            null
          )
        }
      </Row>

    </div>
  )
}

export default Information
