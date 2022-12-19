import React, { useContext, useEffect, useState } from 'react';
import './NotificationCenter.css';
import { Badge, Checkbox, Modal, Spin, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DownOutlined, FileDoneOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App';
import axios from 'axios';
import AntdLoader from '../Global/AntdLoader/AntdLoader';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const oracleFrom = ['saas', 'paas'];



function NotificationCenter() {
  const { user_data, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedType, setSelectedType] = useState(['Oracle', 'eSign', 'SharedServices']);
  const [selectedStatus, setSelectedStatus] = useState(['Pending,Submitted_By_IT,Submitted']);
  const [loading, setLoading] = useState(true);


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
      // const _data = response.data?.Data?.map((n, i) => {
      //   const ViewDocumentUrl = n.From === "eSign" ? `https://salicapi.com/eSign/sign.html?key=${n.Body}` : oracleFrom.includes(n.From?.toLowerCase()) ? n.Body : null;
      //   const newRow = { key: i, id: `${i+1}`, subject: <><h3>{n.Title}</h3>{n.BodyPreview}</>, dateTime: moment(n.Created).format('MM/DD/YYYY hh:mm'), status: n.Status, From: n.From, action: ViewDocumentUrl };
      //   return newRow;
      // })
      setData(response.data?.Data);
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
      width: '3%',
      render: (_, record) => `${data.indexOf(record) + 1}`
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
      render: (val) => moment(val.Created).format('MM/DD/YYYY hh:mm')
    },{
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: '10%',
      render: (val) => {
        switch(val) {
          case "Pending":
            return <Tag icon={<SyncOutlined />} color="warning">Pending</Tag>
          case "Approved":
            return <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
          case "Rejected":
            return <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
          case "CLOSED":
            return <Tag icon={<FileDoneOutlined />} color="default">Closed</Tag>
          case "Submitted":
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
        oracleFrom.includes(record.From?.toLowerCase())
          ? <div><a onClick={() => {setOpenModal(true); setModalData(val);}}>Details</a></div>
        : record.From === 'eSign'
          ? <a href={`https://salicapi.com/eSign/sign.html?key=${val}`} target='_blank'>View Document</a>
        : record.From === 'ServiceRequest'
          ? <a onClick={() => {setOpenModal(true); setModalData(val);}}>View</a>
        : record.From === 'DeliveryNote'
          ? <a onClick={() => {setOpenModal(true); setModalData(val);}}>View Document</a>
        : <a onClick={() => redirectAction(record.From, record.Id)}>Open Request</a>
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
          


          <div className="table">
            <div className="table-header">
              {/* <h1>{selectedType.map((r, i) => {
                if(selectedType.length > 1) {
                  if(i == selectedType.length-1) {
                    return `and ${r}`
                  } else {
                    return `, ${r}`
                  }
                } else return r;
              })}</h1> */}

              <h1>{selectedType.length != 0 ? selectedType.map(r => {if(r=="SharedServices"){r = "Shared Services"} return r}).join(', ') + " Requests" : null}</h1>
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

            <div className='notifications-table'>
              <Table 
                columns={columns} 
                dataSource={data} 
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
          className="performance-antd-modal"
        >
          <div><div dangerouslySetInnerHTML={{__html: modalData}}></div></div>
        </Modal>
      </div>
    </>
  )
}

export default NotificationCenter