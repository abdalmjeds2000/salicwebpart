import React, { useContext, useEffect, useRef, useState } from 'react';
import './NotificationCenter.css';
import { Button, Checkbox, Input, Modal, Space, Table } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import Highlighter from 'react-highlight-words';
import { AppCtx } from '../App';
import axios from 'axios';
import AntdLoader from '../Global/AntdLoader/AntdLoader';


function getWindowSize() {
  const {innerWidth, innerHeight} = typeof window !== "undefined" && window;
  return {innerWidth, innerHeight};
}



function NotificationCenter() {
  const { user_data } = useContext(AppCtx);
  const [notificationCenterData, setNotificationCenterData] = useState([]);
  const [allData, setAllData] = useState(notificationCenterData)
  const [filteredData, setFilteredData] = useState([])
  const [selectedType, setSelectedType] = useState(['Oracle']);
  const [selectedStatus, setSelectedStatus] = useState(['Pending']);
  const [typeToSearchText, setTypeToSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  

  // Get Notification Center Data
  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      setLoading(true);
      axios({ 
        method: 'GET', 
        url: `https://salicapi.com/api/notificationcenter/Get?Email=${user_data?.Data?.Mail}&draw=9&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false&%24orderby=Created+desc&%24top=1&Type=${selectedType[0]}&Status=Approved%2CPending%2CRejected&_=1666821907437`
      }).then((res) => { 
        const notifi_data = res.data?.Data?.map((n, i) => {
          const ViewDocumentUrl = n.From === "eSign" ? `https://salicapi.com/eSign/sign.html?key=${n.Body}` : n.From === "Oracle" ? n.Body : null;
          const newRow = {
            key: i,
            id: `${i+1}`,
            subject: <><h3>{n.Title}</h3>{n.BodyPreview}</>,
            dateTime: n.Created.slice(0, -3).replace('T', ' '),
            status: n.Status,
            From: n.From,
            action: ViewDocumentUrl
          }
          return newRow
        })
        setNotificationCenterData(notifi_data);
        console.log('notifi_data', notifi_data);
      }).catch(err => console.log(err))
      setLoading(false);
    }
  }, [user_data, selectedType])


  
  // Get Window Size
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {setWindowSize(getWindowSize());}
    window.addEventListener('resize', handleWindowResize);
  }, []);
  // Filter By Input Search Field
  let typeToSearch = (value) => {
    setTypeToSearchText(value)
    const searchFiltered = allData?.filter(n => {
      return (
        (
          n.subject.props.children[0].props.children.toLowerCase().includes(value.trim().toLowerCase()) ||
          n.subject.props.children[1].toLowerCase().includes(value.trim().toLowerCase()) ||
          n.dateTime.includes(value.trim()) ||
          n.id.includes(value) ||
          n.status.toLowerCase().includes(value.toLowerCase())
        ) && 
        selectedStatus.includes(n.status) && 
        selectedType.includes(n.From)
      )
    });
    setFilteredData(searchFiltered);
  }
  // Filter by Status && Type
  useEffect(() => {
    setAllData(notificationCenterData)
    setFilteredData(notificationCenterData)
  }, [notificationCenterData])
  const filterByStatus = (checkedValues) => {
    setSelectedStatus(checkedValues)
    const filteredData = allData?.filter(g => checkedValues.includes(g.status) && selectedType.includes(g.From))
    setFilteredData(filteredData)
  }

  // Filter by Type && Status
  useEffect(() => {
    setFilteredData(allData?.filter(g => selectedType.includes(g.From) && selectedStatus.includes(g.status)))
    setTypeToSearchText('')
  }, [selectedType])


  // Search By Columns
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState("");
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

//   const DetailsModal = (data) => (
//     <Modal
//         title={'Oracle'}
//         open={openModal}
//         onCancel={() => setOpenModal(false)}
//         okButtonProps={{ style: {display: 'none'}}}
//     >
//       <div><div dangerouslySetInnerHTML={{__html: data}}></div>sdsdsdsdsd</div>
//     </Modal>
// )
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id')
    },{
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      // ...getColumnSearchProps('subject')
    },{
      title: 'Date Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      ...getColumnSearchProps('dateTime')
    },{
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status')
    },{
      title: 'Action',
      dataIndex: 'action',
      render: (val, record) => (
        record.From === 'Oracle'
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
              style={{backgroundColor: selectedType.includes('Oracle') ? 'var(--link-text-color)' : 'var(--main-color)'}}
              onClick={() => setSelectedType(["Oracle"])}
              // onClick={() => setSelectedType(prev => {
              //   if(prev.includes('Oracle')) {
              //     return prev.filter(t => t !== 'Oracle')
              //   } else {
              //     return [...prev, 'Oracle']
              //   }
              // })}
            >
              <div className='text'>
                <h1>{notificationCenterData.filter(n => n.From === "Oracle").length}</h1>
                <h2>Oracle</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('eSign') ? 'var(--link-text-color)' : 'var(--main-color)'}}
              onClick={() => setSelectedType(["eSign"])}
              // onClick={() => setSelectedType(prev => {
              //   if(prev.includes('eSign')) {
              //     return prev.filter(t => t !== 'eSign')
              //   } else {
              //     return [...prev, 'eSign']
              //   }
              // })}
            >
              <div className='text'>
                <h1>{notificationCenterData.filter(n => n.From === "eSign").length}</h1>
                <h2>eSign Tool</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('SharedServices') ? 'var(--link-text-color)' : 'var(--main-color)'}}
              onClick={() => setSelectedType(["SharedServices"])}
              // onClick={() => setSelectedType(prev => {
              //   if(prev.includes('SharedServices')) {
              //     return prev.filter(t => t !== 'SharedServices')
              //   } else {
              //     return [...prev, 'SharedServices']
              //   }
              // })}
            >
              <div className='text'>
                <h1>{notificationCenterData.filter(n => n.From === "SharedServices").length}</h1>
                <h2>Shared Services</h2>
              </div>
              <DownOutlined />
            </div>
            <div className="notification_type"
              style={{backgroundColor: selectedType.includes('CS') ? 'var(--link-text-color)' : 'var(--main-color)'}}
              onClick={() => setSelectedType(["CS"])}
              // onClick={() => setSelectedType(prev => {
              //   if(prev.includes('CS')) {
              //     return prev.filter(t => t !== 'CS')
              //   } else {
              //     return [...prev, 'CS']
              //   }
              // })}
            >
              <div className='text'>
                <h1>{notificationCenterData.filter(n => n.From === "CS").length}</h1>
                <h2>Correponding System</h2>
              </div>
              <DownOutlined />
            </div>
          </div>
          


          <div className="table">
            <div className="table-header">
              <h1>All Requests</h1>
              {/* <Input placeholder="type to search" value={typeToSearchText} onChange={e => typeToSearch(e.target.value)} prefix={<SearchOutlined />} style={{width: '100%', maxWidth: '400px'}} /> */}
              <div className='status-bar'>
                {windowSize.innerWidth > 600 ? <b>Status:</b> : ''}
                <Checkbox.Group 
                  options={['Pending', 'Approved', 'Rejected']} 
                  defaultValue={['Pending']} 
                  onChange={checkedValues => filterByStatus(checkedValues)} 
                />
              </div>
            </div>
            <div style={{overflowX: 'auto'}}>
              {
                !loading ? (
                  windowSize.innerWidth > 600 
                  ? <Table 
                      columns={columns} 
                      dataSource={filteredData} 
                      pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                    />
                  : <Table 
                      columns={columns?.filter(r => r.dataIndex === 'id' || r.dataIndex === 'subject')} 
                      dataSource={filteredData} 
                      pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
                      expandable={{
                        expandedRowRender: (record) => (
                          <div style={{paddingLeft: '10px'}}>
                            <><b>Date Time: </b>{record.dateTime}</><br/>
                            <><b>Status: </b>{record.status}</><br/>
                            <><b>Action: </b>{record.action}</>
                          </div>
                        ),
                      }}
                    />
                  )
                : <AntdLoader />
              }
              
            </div>
          </div>
        </div>
        {/* {DetailsModal(modalData)} */}

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