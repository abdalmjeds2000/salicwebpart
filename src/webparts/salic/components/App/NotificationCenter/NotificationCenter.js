import React, { useContext, useEffect, useState } from 'react';
import './NotificationCenter.css';
import { Badge, Button, Checkbox, Col, Dropdown, Modal, Row, Select, Spin, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DownOutlined, FileDoneOutlined, LoadingOutlined, RedoOutlined, SyncOutlined } from '@ant-design/icons';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App';
import axios from 'axios';
import AntdLoader from '../Global/AntdLoader/AntdLoader';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const oracleFrom = ['saas', 'paas'];
const defualt_types = ['Oracle', 'eSign', 'SharedServices'];

function NotificationCenter() {
  const { user_data, defualt_route, notifications_data, setNotificationsData } = useContext(AppCtx);
  let navigate = useNavigate();

  const [dataCount, setDataCount] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedType, setSelectedType] = useState(defualt_types);
  const [selectedStatus, setSelectedStatus] = useState(['Pending']);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);


  const redirectAction = (from, id) => {
    switch(from) {
      case "VISA":
        navigate(defualt_route + '/admin-services/issuing-VISA/' + id, {preventScrollReset: true});
        break;
      case "Business Gate":
        navigate(defualt_route + '/admin-services/business-gate/' + id, {preventScrollReset: true});
        break;
      case "Shipment":
        navigate(defualt_route + '/admin-services/shipment/' + id, {preventScrollReset: true});
        break;
      case "Office Supply":
        navigate(defualt_route + '/admin-services/office-supply/' + id, {preventScrollReset: true});
        break;
      case "Maintenance":
        navigate(defualt_route + '/admin-services/maintenance/' + id, {preventScrollReset: true});
        break;
      case "Transportation":
        navigate(defualt_route + '/admin-services/transportation/' + id, {preventScrollReset: true});
        break;
      case "Visitor":
        navigate(defualt_route + '/admin-services/visitor/' + id, {preventScrollReset: true});
        break;
      default:
        return null;
    }
  }





  const fetchRowsCount = async (status) => {
    const _status = status.join(',');
    const url = `https://salicapi.com/api/NotificationCenter/Summary?Email=${user_data?.Data?.Mail}&Status=${_status.replace(/[,]/g, '%2C')}`
    const response = await axios.get(url);
    if(response.data?.Status == 200 && response.data?.Data) {
      setDataCount(response.data.Data);
    }
  }
  const fetchData = async (types, status, signal) => {
    setLoading(true);
    const _types = types.join(',');
    const _status = status.join(',');
    let url = `https://salicapi.com/api/notificationcenter/Get?Email=${user_data?.Data?.Mail}&draw=1&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false&%24orderby=Created+desc&%24top=1&Type=${_types.replace(/[,]/g, '%2C')}&Status=${_status.replace(/[,]/g, '%2C')}&_=1671286356550`;
    const response = await axios.get(url, {signal: signal})
    if(response.data.Status == 200 && response.data.Data) {
      setNotificationsData(response.data?.Data);
    } else setNotificationsData([]);
    setLoading(false);
  }

  // Get Notification Center Data
  useEffect(() => {
    if(Object.keys(user_data).length > 0 && notifications_data.length == 0) {
      fetchData(selectedType, selectedStatus);
    }
  }, [user_data]);

  useEffect(() => {
    if(Object.keys(user_data).length > 0 && notifications_data.length == 0) {
      fetchRowsCount(selectedStatus);
    }
  }, [user_data]);

  // Get Notification Center Data
  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      const controller = new AbortController();
      const signal = controller.signal;
      fetchData(selectedType, selectedStatus, signal);
      //cleanup function
      return () => {controller.abort();};
    }
  }, [user_data, selectedType, selectedStatus, count]);

  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      fetchRowsCount(selectedStatus);
    }
  }, [user_data, count]);




  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      render: (_, record) => `${notifications_data.indexOf(record) + 1}`
    },{
      title: 'Subject',
      key: 'subject',
      width: '62%',
      render: (_, record) => {
        return <div className='notification-subject'><Badge.Ribbon color='#eee' text={record.From}><h3>{record.Title}</h3>{record.BodyPreview}</Badge.Ribbon></div>
      }
    },{
      title: 'Date Time',
      dataIndex: 'Created',
      key: 'dateTime',
      width: '15%',
      render: (val) => <div style={{minWidth: 120}}>{moment(val.Created).format('MM/DD/YYYY hh:mm')}</div>
    },{
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: '10%',
      render: (val) => {
        const v = typeof val == "string" ? val?.toLowerCase() : "";
        switch(v) {
          case "pending":
            return <Tag icon={<SyncOutlined />} color="warning">Pending</Tag>
          case "approved":
            return <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
          case "rejected":
            return <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
          case "closed":
            return <Tag icon={<FileDoneOutlined />} color="default">Closed</Tag>
          case "submitted":
            return <Tag icon={<SyncOutlined />} color="processing">Submitted</Tag>
          default:
            return <Tag color="default">{val}</Tag>;
        }
      }
    },{
      title: 'Action',
      dataIndex: 'Body',
      width: '10%',
      render: (val, record) => (
        <div style={{minWidth: 120}}>
          {
            oracleFrom.includes(record.From?.toLowerCase())
              ? <div><a onClick={() => {setOpenModal(true); setModalData(val);}}>Details</a></div>
            : record.From === 'eSign'
              ? <a href={`https://salicapi.com/eSign/sign.html?key=${val}`} target='_blank'>View Document</a>
            : record.From === 'ServiceRequest'
              ? <a onClick={() => {setOpenModal(true); setModalData(val);}}>View</a>
            : record.From === 'DeliveryNote'
              ? <a onClick={() => {setOpenModal(true); setModalData(val);}}>View Document</a>
            : <a onClick={() => redirectAction(record.From, record.Id)}>Open Request</a>
          }
        </div>
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
          {
            loading ? (
              <div className='notification-loader'>
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
            ) : (
              null
            )
          }

          <div className="notification_type-container">
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('Oracle') ? 'var(--main-color)' : 'var(--brand-orange-color)'}}
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
                <h1>{dataCount.Oracle || '0'}</h1>
                <h2>Oracle</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('eSign') ? 'var(--main-color)' : 'var(--brand-orange-color)'}}
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
                <h1>{dataCount.eSign || '0'}</h1>
                <h2>eSign Tool</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('SharedServices') ? 'var(--main-color)' : 'var(--brand-orange-color)'}}
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
                <h1>{dataCount.SharedService || '0'}</h1>
                <h2>Shared Services</h2>
              </div>
              <DownOutlined />
            </div>
          </div>
          

          
          <div className='status-bar-mobile'>
            <Select
              mode="tags"
              placeholder="Select Status"
              defaultValue={['Pending']}
              onChange={checkedValues => setSelectedStatus(checkedValues)}
              style={{width: '100%'}}
              options={[{value: "Pending", label: "Pending"}, {value: "Approved", label: "Approved"}, {value: "Rejected", label: "Rejected"}]}
            />
            <Button type='primary' onClick={() => setCount(prev => prev += 1)}><RedoOutlined /></Button>
          </div>

          <div className="table">
            <div className="table-header">
              <h1>{selectedType.length != 0 ? selectedType.map(r => {if(r=="SharedServices"){r = "Shared Services"} return r}).join(', ') + " Requests" : null}</h1>
              <div className='status-bar-desktop'>
                <b className='status-title'>Status:</b>
                <Checkbox.Group 
                  defaultValue={['Pending']} 
                  onChange={checkedValues => setSelectedStatus(checkedValues)} 
                >
                  {/* <Checkbox value="Pending,Submitted_By_IT">Pending</Checkbox>
                  <Checkbox value="Submitted">Submitted By Me</Checkbox> */}
                  <Checkbox value="Pending">Pending</Checkbox>
                  <Checkbox value="Approved">Approved</Checkbox>
                  <Checkbox value="Rejected">Rejected</Checkbox>
                </Checkbox.Group>
              </div>
            </div>

            <div className='notifications-table'>
              <Table 
                columns={columns} 
                dataSource={notifications_data} 
                pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true, style: {paddingTop: '25px'} }} 
              />
            </div>
          </div>
        </div>

        <Modal
          title="Oracle Notification"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          okButtonProps={{ style: {display: 'none'}}}
          className="more-width-antd-modal"
        >
          <div><div dangerouslySetInnerHTML={{__html: modalData}}></div></div>
        </Modal>
      </div>
    </>
  )
}

export default NotificationCenter