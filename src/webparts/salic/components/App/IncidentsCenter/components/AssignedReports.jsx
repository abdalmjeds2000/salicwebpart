import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";
import RequestsTable from '../../Global/RequestsComponents/RequestsTable';
import moment from 'moment';
import UserColumnInTable from '../../Global/UserColumnInTable/UserColumnInTable';
import axios from 'axios';
import AntdLoader from '../../Global/AntdLoader/AntdLoader';
import { riskType } from '../risksTypes'
import { PlusCircleOutlined } from '@ant-design/icons';




const AssignedReports = () => {
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const FetchData = async () => {
    const response = await axios.get('https://salicapi.com/api/Incidents/AssignedToMe?Email=Akmal.Eldahdouh@salic.com&draw=1&order[0][column]=0&order[0][dir]=asc&start=0&length=-1&search[value]=&search[regex]=false&SortBy=CreatedAt&Method=desc&query=&_=1669561303011');
    setData(response.data.Data);
    setLoading(false);
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      FetchData();
    }
  }, [user_data])
  const ControlPanel = (
    <Button 
      type='primary'
      size='small'
      onClick={() => navigate(defualt_route + '/incidents-center/new-report')}
    >
      <PlusCircleOutlined /> Add Incident Report
    </Button>
  );

  const columns = [
    {
      title: 'Operational #',
      dataIndex: 'Number',
      width: '7%',
      render: (val, record) => <a onClick={() => window.open(`https://salic.sharepoint.com/sites/newsalic/SitePages/Risk/IncidentReport.aspx?id=${record.Id}`)}>
        {val}
        </a>
    },{
      title: 'Incident Date',
      dataIndex: 'IncidentDate',
      width: '10%',
      render: (val) => moment(val).format('MM/DD/YYYY')
    },{
      title: 'Incident Date',
      dataIndex: 'DiscoveryDate',
      width: '10%',
      render: (val) => moment(val).format('MM/DD/YYYY')
    },{
      title: 'Risk Type',
      dataIndex: 'RiskType',
      width: '20%',
      render: (val) => riskType.filter(row => row.Type == val)[0]?.Name
    },{
      title: 'Incident Type',
      dataIndex: 'IncidentType',
      width: '20%',
      render: (val, record) => riskType.filter(row => row.Type == record.RiskType)[0]?.Incident.filter(x=> x.id == record.IncidentType)[0].name
    },{
      title: 'Submitter',
      dataIndex: 'Requester',
      width: '15%',
      render: (val) => <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} />
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '10%',
      render: (val) => <>{val?.replace(/[_]/g,' ')}</>
    }
  ];


  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/incidents-center`)}>Risk Center</a>
        <p>Requests For Review</p>
      </HistoryNavigation>

      {
        !loading
        ? (
          <div>
            <RequestsTable
              Title="Operational Risk Management"
              HeaderControlPanel={ControlPanel}
              IsLoading={loading}
              Columns={columns}
              DataTable={data}
            />
          </div>
        )
        : <AntdLoader />
      }
      

    </>
  )
}



export default AssignedReports