import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppCtx } from '../../App'; 
import CustomSelect from '../components/CustomSelect';
import './DailyAttendance.css';


function DailyAttendance() {
  const { departments_info, user_data } = useContext(AppCtx)

  const [departmentName, setDepartmentName] = useState(user_data?.Data?.Department);
  const [status, setStatus] = useState('-1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const departmentsNames = Array.from(new Set(departments_info.filter(e => e.Department !== "").map(r => r.Department)))
  const employeesNames = departments_info.filter(d => d.Department === departmentName ).filter(e => {if(status === '-1') { return e } else if(status === 'true') { return e.Enabled === true } else if(status === 'false') { return e.Enabled === false }}).map(e => {return {value: e.Mail, name: e.DisplayName}})
  const [employees, setEmployees] = useState(employeesNames.map(e => e.value));


  useEffect(() => {
    setEmployees(employeesNames.map(e => e.value))
  }, [departmentName, status])
  const [tableData, setTableData] = useState([])
  let filterResultsHandler = () => {
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/attendance/GetByEmail?Email=-1,${employees.join()}&startDate=${startDate}&EndDate=${endDate}&month=${startDate !== '' || endDate !== '' ? 0 : (new Date().getMonth() + 1)}&year=${startDate !== '' || endDate !== '' ? 0 : (new Date().getFullYear())}`
    }).then((res) => {
      setTableData(res.data.Data);
    }).catch((err) => console.log(err))
  }





  return (
    <div className='daily-attendance-container'>
      <div className="content">
        <div className="form">
          <div className='inputs'>
            <CustomSelect 
              name='department' 
              label='Department'
              options={departmentsNames.map(d => {return {value: d, name: d}})}
              onChange={(e) => setDepartmentName(e.target.value)}
              selectedBy={user_data?.Data?.Department}
            />
            <CustomSelect 
              name='status' 
              label='Status'
              options={[
                {value: '-1', name: 'All'},
                {value: 'true', name: 'Active'},
                {value: 'false', name: 'In-Active'},
              ]}
              onChange={(e) => setStatus(e.target.value)}
            />
            <CustomSelect 
              name='employee' 
              label='Employee' 
              options={[{value: '-1', name: 'All'}, ...employeesNames]} 
              onChange={(e) => setEmployees(e.target.value === '-1' ? employeesNames.map(e => e.value) : [e.target.value])} 
            />
            <div className='custom-select-container'>
              <label htmlFor="start-date">Start Date</label>
              <input type="date" name="start-date" id="start-date" onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className='custom-select-container'>
              <label htmlFor="end-date">End Date</label>
              <input type="date" name="end-date" id="end-date" onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="btns">
            <button>Export Data</button>
            <button onClick={filterResultsHandler}>Filter Results</button>
          </div>
        </div>
        <div className="table">
          <table width='100%'>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Day</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>W. Time</th>
              <th>W. Time (8-16)</th>
              <th>Late</th>
              <th>Early Leave</th>
              <th>Overtime</th>
              <th>Attendance Status</th>
              <th>Emp. Justification</th>
              <th>Manager Feedback</th>
              <th>Approval Status</th>
            </tr>
            <tbody>
              {
                tableData.map((row, i) => {
                  return <tr key={i}>
                    <td>{row.Name}</td>
                    <td>{row.Date || ' - '}</td>
                    <td>{row.Day  || ' - '}</td>
                    <td>{row.CheckInTime || ' - '}</td>
                    <td>{row.CheckOutTime || ' - '}</td>
                    <td>{row.ActualHours || ' - '}</td>
                    <td>{row.Working8_16 || ' - '}</td>
                    <td>{row.Late}</td>
                    <td>{row.EarlyLeave || ' - '}</td>
                    <td>{row.OverTime}</td>
                    <td>{row.IsAbsent ? 'Absent' : 'Delayed or Early Leave'}</td>
                    <td>{row.Justification || ' - '}</td>
                    <td>{row.ManagerFeedback || ' - '}</td>
                    <td>{row.JustificationStatus || ' - '}</td>
                  </tr>
                })
              }
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default DailyAttendance