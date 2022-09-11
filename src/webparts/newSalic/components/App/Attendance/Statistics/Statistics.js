import React, { useContext, useEffect, useState } from 'react';
import './Statistics.css';
import { RadialBar, Area, Column } from '@ant-design/plots';
import CustomSelect from '../components/CustomSelect';
import axios from 'axios';
import { AppCtx } from '../../App';


function Statistics() {
  const { user_data } = useContext(AppCtx)




  // Start Monthly Attendance Code
  const [monthlyAttendanceLoader, setMonthlyAttendanceLoader] = useState(true);
  const [monthlyYear, setMonthlyYear] = useState(new Date().toString().slice(4, 7) + ' ' + new Date().toString().slice(11, 15));
  const [monthlyAttendanceDates, setMonthlyAttendanceDates] = useState([]);
  useEffect(() => {
    const getDatesInRange = (startDate, endDate) => {
      const date = new Date(startDate.getTime());
      date.setDate(date.getDate() + 1);
      const dates = [];
      while (date < endDate) {
        dates.push(new Date(date).toString());
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }
    var datesInRange = getDatesInRange(new Date('2018-01-01'), new Date()).map(d => {
      const month = d.slice(4, 7)
      const year = d.slice(11, 15)
      return month + ' ' + year
    })
    setMonthlyAttendanceDates(Array.from(new Set(datesInRange)))
  }, [])
  const returnNumberOfMonth = (month) => {
    if(month === 'Jan') return 1
    else if(month === 'Feb') return 2
    else if(month === 'Mar') return 3
    else if(month === 'Apr') return 4
    else if(month === 'May') return 5
    else if(month === 'Jun') return 6
    else if(month === 'Jul') return 7
    else if(month === 'Aug') return 8
    else if(month === 'Sep') return 9
    else if(month === 'Oct') return 10
    else if(month === 'Nov') return 11
    else if(month === 'Dec') return 12
  }
  useEffect(() => {
    fetchData();
  }, [monthlyYear, user_data, monthlyAttendanceDates])
  let [dataRadialBar, setDataRadialBar] = useState([
    {name: 'Annual Leave', star: 10,},
    {name: 'Working Days', star: 10,},
  ])
  const fetchData = () => {
    setMonthlyAttendanceLoader(true);
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/attendance/GetStatistics?email=${user_data.Data?.PIN}&Year=${monthlyYear.split(' ')[1]}&Month=${returnNumberOfMonth(monthlyYear.split(' ')[0])}`
    }).then((res) => {
        setDataRadialBar([
          {name: 'Annual Leave', star: res.data?.Data[0]?.AnnualLeave},
          {name: 'Working Days', star: res.data?.Data[0]?.WorkingDays},
        ])
    }).then(() =>{
      setMonthlyAttendanceLoader(false);
    }).catch(err => console.log(err))
  }
  const configRadialBar = {
    data: dataRadialBar,
    xField: 'name',
    yField: 'star',
    radius: 1,
    innerRadius: 0.5,
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.name,
          value: datum.star,
        };
      },
    },
    colorField: 'name',
    color: ({ name }) => {
      if (name === 'Working Days') {
        return '#43A2CC';
      } else if (name === 'Annual Leave') {
        return '#FD96A6';
      }
      return '#43A2CC';
    },
  };
  // End Monthly Attendance Code




  // Start Annual Attendance Code
  const [annualAttendanceLoader, setAnnualAttendanceLoader] = useState(true);
  const [annualYear, setAnnualYear] = useState('2022');
  const [data, setData] = useState([]);
  useEffect(() => {
    setAnnualAttendanceLoader(true)
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/attendance/GetStatistics1?email=${user_data.Data?.PIN}&Year=${annualYear}&Month=1`
    }).then(res => {
      let NormalChartData = res.data?.Data?.map(e =>  {return{"Month": e.Month, "type": "Normal", "value": e.Status1}})
      let AbsentChartData = res.data?.Data?.map(e =>  {return{"Month": e.Month, "type": "Absent", "value": e.Status2}})
      let DelayLeaveChartData = res.data?.Data?.map(e =>  {return{"Month": e.Month, "type": "Delay & Early Leave", "value": e.Status3}})
      let BusinessTripChartData = res.data?.Data?.map(e =>  {return{"Month": e.Month, "type": "Leaves & Business Trip", "value": e.Status4}})
      setData([...NormalChartData, ...AbsentChartData, ...DelayLeaveChartData, ...BusinessTripChartData])
      setAnnualAttendanceLoader(false)
    }).catch(err => console.log(err))
  }, [annualYear])
  const config = {
    data,
    xField: 'Month',
    yField: 'value',
    seriesField: 'type',
    isGroup: 'true',
    colorField: 'type',
    color: ({ type }) => {
      if (type === 'Normal') {
        return '#0C508C';
      } else if (type === 'Absent') {
        return 'rgb(255, 39, 43)';
      } else if (type === 'Delay & Early Leave') {
        return 'rgb(233 155 77)';
      } else if (type === 'Leaves & Business Trip') {
        return 'rgb(39, 124, 98)';
      }
      return '#0C508C';
    },
  };
  // End Annual Attendance Code


  return (
    <div className='statistics-container'>
      <div className='monthly-attendance'>
        <div className="head">
          <h3>Monthly Attendance</h3>
          <select name="monthlyYear" onChange={(e) => setMonthlyYear(e.target.value)}>
            {
              monthlyAttendanceDates.map((date, i) => {
                return <option selected={i === monthlyAttendanceDates.length-1 ? true : false} value={date} key={i}>{date}</option>
              })
            }
          </select>
        </div>
        <div className="body">
          <div className='index'>
            <span>Working Days</span>
            <span>Annual Leave</span>
          </div>
          {
            !monthlyAttendanceLoader
            ? <div className='radialBar'>
                <RadialBar 
                  {...configRadialBar}
                  style={{
                    width: '100%',
                    margin: '20px 0 40px 0',
                  }} 
                />
              </div>
            : <div className="loader small"><div></div></div>
          }
        </div>
      </div>

      <div className='annual-attendance'>
        <div className="head">
          <h3>Annual Attendance</h3>
          <select name="date" onChange={(e) => setAnnualYear(e.target.value)}>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option selected value="2022">2022</option>
          </select>
        </div>
        {!annualAttendanceLoader ? <Column {...config} /> : <div className="loader small"><div></div></div>}
      </div>

      <div className='employees-availability-attendance'>
        <div className="head">
          <h3>Employees Availability Attendance</h3>
          <p>SALIC Employees Ava.</p>
        </div>
        {/* <div className="body">
          <div className="buttons">
            <CustomSelect 
              name='by-organization' 
              options={[
                {value: 'Organization 1', name: 'Organization 1'},
                {value: 'Organization 2', name: 'Organization 2'},
              ]}
              onChange={(e) => alert(e.target.value)}
            />
            <CustomSelect 
              name='by-organization' 
              options={[
                {value: 'Organization 1', name: 'Organization 1'},
                {value: 'Organization 2', name: 'Organization 2'},
              ]}
              onChange={(e) => alert(e.target.value)}
            />
            <CustomSelect 
              name='by-organization' 
              options={[
                {value: 'Organization 1', name: 'Organization 1'},
                {value: 'Organization 2', name: 'Organization 2'},
              ]}
              onChange={(e) => alert(e.target.value)}
            />
          </div>
          <div className='column-chart-container'>
            <Column {...config} />
            <div className="index">
              <ul>
                <li><p>Sick Leave</p></li>
                <li><p>Leave</p></li>
                <li><p>Trips</p></li>
                <li><p>Shortages</p></li>
                <li><p>Availabilities</p></li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Statistics