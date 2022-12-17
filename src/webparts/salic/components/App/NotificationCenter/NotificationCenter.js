import React, { useContext, useEffect, useState } from 'react';
import './NotificationCenter.css';
import { Checkbox, Modal, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App';
import axios from 'axios';
import AntdLoader from '../Global/AntdLoader/AntdLoader';
import moment from 'moment';

const oracleFrom = ['saas', 'paas'];



function NotificationCenter() {
  const { user_data } = useContext(AppCtx);
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedType, setSelectedType] = useState(['Oracle', 'eSign', 'SharedServices']);
  const [selectedStatus, setSelectedStatus] = useState(['Pending,Submitted_By_IT,Submitted']);
  const [loading, setLoading] = useState(true);


  const fetchRowsCount = async (status) => {
    const _status = status.join(',');
    const url = `https://salicapi.com/api/NotificationCenter/Summary?Email=${user_data?.Data?.Mail}&Status=${_status.replace(/[,]/g, '%2C')}`
    const response = await axios.get(url);
    if(response.data?.Status == 200 && response.data?.Data) {
      setDataCount(response.data.Data);
    }
  }
  const fetchData = async (types, status) => {
    setLoading(true);
    const _types = types.join(',');
    const _status = status.join(',');
    let url = `https://salicapi.com/api/notificationcenter/Get?Email=${user_data?.Data?.Mail}&draw=1&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false&%24orderby=Created+desc&%24top=1&Type=${_types.replace(/[,]/g, '%2C')}&Status=${_status.replace(/[,]/g, '%2C')}&_=1671286356550`;
    const response = await axios.get(
      // `https://salicapi.com/api/notificationcenter/Get?Email=${user_data?.Data?.Mail}&draw=9&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false&%24orderby=Created+desc&%24top=1&Type=${_types}&Status=${_status}&_=1666821907437`
      // encodeURIComponent(url)
      url
    )
    if(response.data.Status == 200 && response.data.Data) {
      const _data = response.data?.Data?.map((n, i) => {
        const ViewDocumentUrl = n.From === "eSign" ? `https://salicapi.com/eSign/sign.html?key=${n.Body}` : oracleFrom.includes(n.From?.toLowerCase()) ? n.Body : null;
        const newRow = { key: i, id: `${i+1}`, subject: <><h3>{n.Title}</h3>{n.BodyPreview}</>, dateTime: moment(n.Created).format('MM/DD/YYYY hh:mm'), status: n.Status, From: n.From, action: ViewDocumentUrl };
        return newRow;
      })
      setData(_data);
    } else setData([]);
    setLoading(false);
  }

  // Get Notification Center Data
  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      fetchData(selectedType, selectedStatus);
    }
  }, [user_data, selectedType, selectedStatus]);


  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      fetchRowsCount(selectedStatus);
    }
  }, [user_data, selectedStatus]);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },{
      title: 'Date Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },{
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },{
      title: 'Action',
      dataIndex: 'action',
      render: (val, record) => (
        oracleFrom.includes(record.From?.toLowerCase())
          ? <div>
              <a onClick={() => {setOpenModal(true); setModalData(val);}}>Details</a>
            </div>
        : record.From === 'eSign'
          ? <a href={val} target='_blank'>View Document</a>
        : null
      )
    }
  ];




  return (
    <>
      <HistoryNavigation>
        <p>Notification Center</p>
      </HistoryNavigation>
      
      <div className='notification-center-container'>
        
        <div className='notification-center_content'>
          <div className="notification_type-container">
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('Oracle') ? 'var(--link-text-color)' : 'var(--brand-orange-color)'}}
              onClick={() => setSelectedType(prev => {
                if(prev.includes('Oracle')) {
                  return prev.filter(t => t !== 'Oracle')
                } else {
                  return [...prev, 'Oracle']
                }
              })}
            >
              <div className='text'>
                {/* <h1>{selectedType.includes('Oracle') ? data.filter(r => oracleFrom.includes(r.From?.toLowerCase())).length : ' - '}</h1> */}
                <h1>{dataCount.Oracle}</h1>
                <h2>Oracle</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('eSign') ? 'var(--link-text-color)' : 'var(--brand-orange-color)'}}
              onClick={() => setSelectedType(prev => {
                if(prev.includes('eSign')) {
                  return prev.filter(t => t !== 'eSign')
                } else {
                  return [...prev, 'eSign']
                }
              })}
            >
              <div className='text'>
                {/* <h1>{selectedType.includes('eSign') ? data.filter(r => r.From == "eSign").length : ' - '}</h1> */}
                <h1>{dataCount.eSign}</h1>
                <h2>eSign Tool</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('SharedServices') ? 'var(--link-text-color)' : 'var(--brand-orange-color)'}}
              onClick={() => setSelectedType(prev => {
                if(prev.includes('SharedServices')) {
                  return prev.filter(t => t !== 'SharedServices')
                } else {
                  return [...prev, 'SharedServices']
                }
              })}
            >
              <div className='text'>
                {/* <h1>{selectedType.includes('SharedServices') ? data.filter(r => r.From == "SharedServices").length : ' - '}</h1> */}
                <h1>{dataCount.SharedService}</h1>
                <h2>Shared Services</h2>
              </div>
              <DownOutlined />
            </div>
          </div>
          


          <div className="table">
            <div className="table-header">
              <h1>All Requests</h1>
              <div className='status-bar'>
                <b>Status:</b>
                <Checkbox.Group 
                  // options={['Pending', 'Approved', 'Rejected', 'Submitted By IT']} 
                  defaultValue={['Pending,Submitted_By_IT,Submitted']} 
                  onChange={checkedValues => setSelectedStatus(checkedValues)} 
                >
                  <Checkbox value="Pending,Submitted_By_IT,Submitted">Pending</Checkbox>
                  <Checkbox value="Approved">Approved</Checkbox>
                  <Checkbox value="Rejected">Rejected</Checkbox>
                  {/* <Checkbox value="Submitted_By_IT">Submitted By IT</Checkbox> */}
                  {/* <Checkbox value="Submitted">Submitted</Checkbox> */}
                </Checkbox.Group>
              </div>
            </div>
            <div>
              {loading ? <AntdLoader customStyle={{margin: '0 0 15px 0'}} /> : null}
            </div>
            <div style={{overflowX: 'auto'}}>
              <Table 
                columns={columns} 
                dataSource={data} 
                pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
              />
            </div>
          </div>
        </div>

        <Modal
          title="Oracle Notification"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          okButtonProps={{ style: {display: 'none'}}}
          className="performance-antd-modal"
        >
          <div><div dangerouslySetInnerHTML={{__html: modalData}}></div></div>
        </Modal>
      </div>
    </>
  )
}

export default NotificationCenter