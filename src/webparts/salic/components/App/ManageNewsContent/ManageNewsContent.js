import React, { useContext, useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { AppCtx } from '../App';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { Checkbox, Table } from 'antd';
import UserColumnInTable from '../Global/UserColumnInTable/UserColumnInTable';
import { useNavigate } from 'react-router-dom';

function ManageNewsContent() {
  const { news_list, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  const [allNews, setAllNews] = useState([]);
  useEffect(() => {
    if(news_list.length > 0) {
      const news = news_list?.map((n, i) => {
        n.TableNumber = i+1
        return {...n}
      })
      setAllNews(news);
    }
    
  }, [news_list]);

  const columns = [
    {
      title: '#',
      dataIndex: 'TableNumber',
      width: '3%',
      render: (val) => `${val}`
    },{
      title: 'Date & Time',
      dataIndex: 'Created',
      width: '15%',
      render: (val) => val ? new Date(val).toLocaleString() : ' - '
    },{
      title: 'Title',
      dataIndex: 'Subject',
      width: '45%',
      render: (val) => <a>{val}</a>
    },{
      title: 'Published',
      dataIndex: 'IsDraft',
      width: '12%',
      render: (val, record) =>  <Checkbox 
                                  style={{display: 'flex', justifyContent: 'center'}}
                                  defaultChecked={true} 
                                  /* onChange={e => {
                                    record.IsDraft = e.target.checked;
                                    console.log(record, e.target.checked);
                                  }} */>
                                </Checkbox>
    },{
      title: 'Author',
      dataIndex: 'Author',
      width: '25%',
      render: (val) => <UserColumnInTable Mail={val?.EMail} DisplayName={val?.Title}  />
    }
  ];

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/community-news`)}>SALIC Community News</a>
        <p>Manage SALIC News</p>
      </HistoryNavigation>

      <div className='table-page-container'>
        <div className='content'>
          <div className="header">
            <h1>SALIC Community News</h1>
            <h1 style={{cursor: 'pointer'}}>
              <PlusCircleOutlined /> Add New
            </h1>
          </div>

          <div className='form'>
            <Table 
              columns={columns} 
              dataSource={allNews} 
              pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageNewsContent