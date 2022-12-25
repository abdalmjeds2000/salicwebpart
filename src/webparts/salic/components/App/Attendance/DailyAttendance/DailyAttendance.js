import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppCtx } from '../../App'; 
import CustomSelect from '../components/CustomSelect';
import './DailyAttendance.css';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';

function DailyAttendance() {
  const { user_data } = useContext(AppCtx)

  const [departmentName, setDepartmentName] = useState(user_data?.Data?.Department);
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('-1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  
  

  const [employeesOptions, setEmployeesOptions] = useState([]);
  useEffect(() => {
    const users = user_data?.Data?.DirectUsers?.map(u => {
      let subUsers = [{value: u.Mail, name: u.DisplayName}];
      if(u.DirectUsers.length > 0) {
        u.DirectUsers.map(s => {
          subUsers.push({value: s.Mail, name: s.DisplayName})
        })
      }
      return subUsers
    }).flat()

    const empOpt = [
      {value: '-1', name: 'All'}, 
      {value: user_data?.Data?.Mail, name: user_data?.Data?.DisplayName}, 
      ...users
    ];
    setEmployeesOptions(empOpt);
    setDepartmentName(user_data?.Data?.Department);
    setEmployees(empOpt.map(u => u.value !== '-1' ? u.value : null).filter(n => n))
  }, [user_data])



  let filterResultsHandler = async (email) => {
    setLoader(true);
    console.log(employees);
    await axios({
      method: 'GET',
      url: `https://salicapi.com/api/attendance/GetByEmail?Email=-1,${email.join() || employees.join()}&startDate=${startDate}&EndDate=${endDate}&month=${startDate !== '' || endDate !== '' ? 0 : (new Date().getMonth() + 1)}&year=${startDate !== '' || endDate !== '' ? 0 : (new Date().getFullYear())}`
    }).then((res) => {
      setTableData(res.data.Data);
    }).catch((err) => {
      console.log(err); 
    })
    setLoader(false);
  }




  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      filterResultsHandler([user_data?.Data?.Mail])
    }
  }, [user_data])


  return (
    <div className='daily-attendance-container'>
      <div className="content">
        <div className="form">
          <div className='inputs'>
          <CustomSelect 
              name='department' 
              label='Department'
              options={[{value: departmentName, name: departmentName}]}
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
              options={employeesOptions} 
              onChange={(e) => setEmployees(e.target.value === '-1' ? employeesOptions.map(u => u.value !== '-1' ? u.value : null).filter(n => n) : [e.target.value])} 
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
            <button onClick={() => filterResultsHandler([])} disabled={loader}>Filter Results</button>
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
                loader
                ? <tr><td colSpan={14} style={{padding: '25px 0'}}>
                    <AntdLoader />
                  </td></tr>
                : tableData.map((row, i) => {
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