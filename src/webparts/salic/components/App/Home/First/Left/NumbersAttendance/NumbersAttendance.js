import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import GetPerformance from './API/GetPerformance'
import { Bullet, RadialBar } from '@ant-design/plots';
import moment from 'moment';
import { Tooltip, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';


const performaceGrade = (grade) => {
  if(grade >= 0 && grade <= 75) {
    return {Grade: "Below Expectation", Color: '#EF9494'}
  } else if(grade >= 75.1 && grade <= 89.99) {
    return {Grade: "Partially Meets Expectations", Color: '#FABD81'}
  } else if(grade >= 99 && grade <= 100) {
    return {Grade: "Meets Expectations", Color: '#55ACEE'}
  } else if(grade >= 100.1 ) {
    return {Grade: "Exceeds Expectations", Color: '#277C62'}
  } else {
    return "?"
  }
}

function NumbersAttendance() {
  const { latest_attendance, user_data, performance, all_events } = useContext(AppCtx);
  const [nextEvents, setNextEvents] = useState([]);
  

  useEffect(() => {
    setNextEvents( all_events?.filter(e => new Date(e.Date).toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10)).reverse() )
  }, [user_data, all_events])


  const totalBalance = ((12-(new Date().getMonth()+1))*2.5)+performance?.leaves?.total;

  const configRadialBar = {
    data: [
      { name: "Consumed This Year", value: performance?.leaves?.consumedThisYear, type: "Consumed" },
      { name: "Leave Balance", value: totalBalance, type: `Total balance till end of the year.` },
    ],
    xField: 'name',
    yField: 'value',
    radius: 1,
    innerRadius: 0.5,
    colorField: 'name',
    tooltip: {
      formatter: (label) => {
        if(label.name === "Leave Balance") {
          return { name: `Total balance is ${totalBalance} days till end of the year, ${totalBalance-15} days of them must consumed this year`, value: `` };
        }
        return label
      },
    },
    color: ({ name }) => {
      if (name === 'Consumed This Year') {
        return '#F9A654'; 
      } else if (name === 'Available Balance This Year') {
        return '#E7F0FE';
      } else if (name === 'Leave Balance') {
        return '#43A2CC';
      }
      return '#FD96A6';
    },
    isStack: true,
    maxAngle: 270,
    animation: {appear: {animation: 'none'}},
    onReady: (plot) => {
      // Axis-label adds click events
      // plot.on('axis-label:click', (...args) => {
      //   const ClickedName = args[0].gEvent.target.attrs.text;
      //   if(ClickedName === "Total Balance") {
      //     window.open("https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=ABSENCE_BALANCE&action=NONE", "_blank");
      //   } else if(ClickedName === "Consumed This Year") {
      //     window.open("https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=EXISTING_ABSENCES&action=NONE", "_blank");
      //   }
      // })
    },
  };


  const colorByRate = (number) => {
    let num = +number;
    if(num > 0 && num < 50) return "#ff4477"
    else if(num >= 50 && num < 70) return "#ffb864"
    else if(num >= 70) return "#05d17c"
    else return "#74c4ff"
  }

  const PerformanceColumns = [
    { 
      title: 'Objective / KPI', 
      dataIndex: 'KPI_NAME', 
      width: '55%', 
      render: (v, r) => {
        if(r.groupBy === "KPI") { 
          return <div style={{marginLeft: '15px'}}>
            <Typography.Text strong style={{fontSize: '0.9rem'}}>{v}</Typography.Text> <br />
            <Tooltip title="Start & End Dates" mouseEnterDelay={1}><Typography.Text type='secondary'>{new Date(r.START_DATE).toLocaleDateString()} <ArrowRightOutlined /> {new Date(r.END_DATE).toLocaleDateString()}</Typography.Text></Tooltip>
          </div>
        } else {
          // console.log(chartValue);
          const chartValue = typeof r.Obj_MEASURE_ACHIEVE === "number" ? r.Obj_MEASURE_ACHIEVE.toFixed(1).replace(/\.?0*$/,'') : 0;
          console.log(chartValue);
          console.log(r.Obj_MEASURE_ACHIEVE);
          const dataChart = [
            {
              title: 'KPI',
              ranges: [+100+10],
              Measure: [+chartValue],
              Target: +chartValue,
            },
          ];
          const configChart = {
            data: dataChart,
            height: 30,
            width: 300,
            measureField: 'Measure',
            rangeField: 'ranges',
            targetField: 'Target',
            xField: 'title',
            color: {
              range: '#ffffff',
              measure: colorByRate(chartValue),
              target: colorByRate(chartValue),
            },
            xAxis: false,
            yAxis: false,
            legend: false,
          };
          return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Typography.Text strong style={{fontSize: '1.1rem', lineHeight: 2.5}}>{r.header}</Typography.Text>
            <Bullet {...configChart} />
          </div>
        }
      },
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return { colSpan: record.KPI_NAME ? 1 : 6 };
      },
    },
    // { title: 'Objectives', dataIndex: 'OBJECTIVES', width: '15%' },
    { title: '%', dataIndex: 'MEASURE_ACHIEVE', width: '10%', render: (val, r) => val ? <Tooltip title={`You have achieved ${val}% of target`} mouseEnterDelay={.5}><>{val}% ({r.WEIGHTAGE})</></Tooltip> : ' - ', onCell: (record, index) => { return { colSpan: record.KPI_NAME ? 1 : 0 }} },
    { title: 'Target', dataIndex: 'TARGET', width: '10%', onCell: (record, index) => { return { colSpan: record.KPI_NAME ? 1 : 0 }} },
    { 
      title: 'UOM', 
      dataIndex: 'UOM', 
      width: '10%', 
      render: (val) => (
        ["number", "#"].includes(val?.toLowerCase()) 
          ? "#" 
        : ["percentage", "%"].includes(val?.toLowerCase())
          ? "%"
        : "%"
      ),
      onCell: (record, index) => { return { colSpan: record.KPI_NAME ? 1 : 0 }}
    },
    // { title: 'Weightage', dataIndex: 'WEIGHTAGE', width: '5%'},
    { title: 'Manager KPI', dataIndex: 'Manager_KPI', width: '5%', render: (val) => val ? val : '-', onCell: (record, index) => { return { colSpan: record.KPI_NAME ? 1 : 0 }} },
    // { title: 'Start Day', dataIndex: 'START_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    // { title: 'End Day', dataIndex: 'END_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    { title: 'Achieve Date', dataIndex: 'ACHIEVE_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ', onCell: (record, index) => { return { colSpan: record.KPI_NAME ? 1 : 0 }} }
  ];
  const EventsColumns = [
    { title: 'Event', dataIndex: 'Subject', width: '40%' },
    { title: 'Date', dataIndex: 'Date', width: '40%', render: (val) => moment(val).format('MM/DD/YYYY') },
    { title: 'Remaining', dataIndex: '', width: '20%', render: (_, record) => `${Math.floor((new Date(record.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))} Days Left` },
  ];

  useEffect(() => {
    const el = document.getElementById('home-chart');
    setTimeout(() => {
      el?.style?.opacity = 1;
    }, 2000);
  }, []);



  const mappingPerfomanceData = (data) => {
    let groups = data.reduce((r, a) => {
      r[a.OBJECTIVES] = [...(r[a.OBJECTIVES] || []), a];
      return r;
    }, {});

    let result = [];
    Object.values(groups).map((row, i) => {
      let rowKPIs = Object.values(row).reduce((r, a) => {
        r[a.KPI_NAME.toLowerCase()] = [
          ...(r[a.KPI_NAME.toLowerCase()] || []),
          a,
        ];
        return r;
      }, {});


      // get average of MEASURE_ACHIEVE for each objective
      const x = data.filter(item => item?.OBJECTIVES?.toLowerCase() === Object.keys(groups)[i].toLowerCase());
      const y = x.reduce((a, b) => a + b.MEASURE_ACHIEVE, 0) / x.length;
      result.push({
        key: 'row-level-1',
        header: Object.keys(groups)[i],
        Obj_MEASURE_ACHIEVE: y,
      });
      Object.values(rowKPIs).map((k, ki) => {
        result.push({
          key: k[0].ID,
          parent: Object.keys(groups)[i],
          header: Object.keys(rowKPIs)[ki],
          groupBy: "KPI",
          ...k[0]
        });
      });
    })
    return result;
  };




  return (
    <div className="numbers-attendance-container">
      <div className="div1">
        <Number
          pathColor={performaceGrade(performance.performace?.count?.replace('%', '')).Color} 
          textColor={performaceGrade(performance.performace?.count?.replace('%', '')).Color}
          header={<Tooltip title="Click here to view your performance">% KPI Progress</Tooltip>}
          description={'Performance Management' /* performaceGrade(performance.performace?.count.replace('%', '')).Grade */}
          value={Object.keys(performance).length !== 0 ? performance.performace?.count?.replace('%', '') : '0'}
          text={Object.keys(performance).length !== 0 ? performance.performace?.count?.replace('%', '') : '?'}
          minValue='0'
          maxValue='100'
          numberType="performance"
          PerformanceDataTable={mappingPerfomanceData(performance?.performace?.data || [])}
          PerformanceColumns={PerformanceColumns}
        />
      </div>
      <div className="div2">
        {/* <Number 
          pathColor='#277C62' 
          header="Leaves Balance" 
          description={`${(isNaN(performance?.leaves - 15)) || (performance?.leaves - 15 < 0) ? '0' : performance?.leaves - 15 } expire at 1/1/${new Date().getYear() + 1901}`}
          value={performance?.leaves ? performance?.leaves : '0'}
          minValue='0'
          maxValue='30'
          text={performance?.leaves ? `${performance?.leaves}` : '?'}
          textColor='#277C62' 
        /> */}
      </div>
      <div className="div3">
        <Tooltip title="See Future Events">
          <Number
            pathColor='var(--main-color)' 
            header={<Tooltip title="Click here to see upcoming events">Next Event</Tooltip>} 
            description={nextEvents.length > 0 ? nextEvents[0]?.Subject : 'None'} 
            value={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))}`}
            minValue='0'
            maxValue={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date(nextEvents[0]?.Created).getTime())  / (1000 * 3600 * 24))}`}
            text={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))}`}
            textColor='var(--main-color)'
            numberType="events"
            EventsDataTable={nextEvents}
            EventsColumns={EventsColumns}
          />
        </Tooltip>
      </div>
      <div className="div4">
        {/* <Number 
          pathColor='#ff272b' 
          header="Employment Period" 
          description="5 Days" 
          value='5'
          minValue='0'
          maxValue='24'
          text='5'
          textColor='#ff272b'
        /> */}
        {
          // (Object.keys(performance).length !== 0) && (performance?.leaves?.consumedThisYear + performance?.leaves?.total !== 0) 
          <div id='home-chart' style={{opacity: 0, transition: '0.5s'}}>
            <Tooltip placement="top" title="Current Balance">
              <a className='mid-total' href='https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=ABSENCE_BALANCE&action=NONE' target='_blank'>{performance?.leaves?.total}</a>
            </Tooltip>
            <RadialBar 
              {...configRadialBar}
              style={{
                width: '100%',
                margin: '20px 0 40px 0',
              }} 
              
            />
          </div>
        }
      </div>
      <div className="div5">
        <Attendance latestAttendance={latest_attendance} />
      </div>  
    </div>
  )
}

export default NumbersAttendance