import React, { useContext, useState } from 'react';
import './manageNews.css';
import { DeleteOutlined, DownOutlined, EditOutlined, FileTextOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AppCtx } from '../App';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { Dropdown, Menu, Modal, notification, Popconfirm, Switch } from 'antd';
import UserColumnInTable from '../Global/UserColumnInTable/UserColumnInTable';
import { useNavigate } from 'react-router-dom';
import RequestsTable from '../Global/RequestsComponents/RequestsTable';
import NewsForm from './NewsForm';
import pnp from 'sp-pnp-js';



function ManageNewsContent() {
  const { news_list, setNewsList, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [item, setItem] = useState({});
  

  const HandleDelete = ({ id }) => (
    <Popconfirm
      title="Are you sure to delete this News?"
      onConfirm={async () => {
        await pnp.sp.web.lists.getByTitle('News').items.getById(id).delete()
        .then(() => setNewsList(prev => prev.filter(row => row.Id != id)))
      }}
      okText="Delete"
      okButtonProps={{danger: true}}
      cancelText="Cancel"
    >
      <a>Delete</a>
    </Popconfirm>
  )
  const HandleUpdateStatus = async (id, value) => (
    await pnp.sp.web.lists.getByTitle('News').items.getById(id).update({IsDraft: value})
    .then(() => {
      setNewsList(prev => {
        const newData = prev.map(row => {
          if(row.Id === id) {
            row.IsDraft = value;
          }
          return row
        });
        return [...newData]
      });
      notification.destroy();
      notification.success({message: 'Status Changed Successfully'});
    })
    .catch(_ => {
      notification.destroy();
      notification.error({message: "Failed"});
    })
  )

  const menu = (id) => (
    <Menu items={[
        { key: '1', label: <a onClick={() => navigate(defualt_route + `/community-news/${id}`)}>Open</a>  , icon: <FileTextOutlined /> },
        { key: '2', label: ( <a onClick={async  () => {
            await pnp.sp.web.lists.getByTitle('News').items.select('AttachmentFiles,Author,*').expand('AttachmentFiles,Author').getById(id).get()
            .then((response) => {
              console.log(response);
              setItem(response); 
              setIsEditMode(true); 
              setOpenModal(true);
            })
          }}>Edit</a> ), icon: <EditOutlined /> },
        { key: '3', label: ( <HandleDelete id={id} /> )  , icon: <DeleteOutlined />, danger: true },
      ]}
    />
  );
  
  const columns = [
    {
      title: '#',
      dataIndex: 'TableNumber',
      width: '3%',
      render: (_, record) => `${news_list.indexOf(record)+1}`
    },{
      title: 'Date & Time',
      dataIndex: 'Created',
      width: '15%',
      render: (val) => val ? new Date(val).toLocaleString() : ' - '
    },{
      title: 'Title',
      dataIndex: 'Subject',
      width: '45%',
      render: (val, record) => (
        <Dropdown overlay={menu(record.Id)} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <span>{val}</span> <DownOutlined />
          </a>
        </Dropdown>
      )
    },{
      title: 'Published',
      dataIndex: 'IsDraft',
      width: '12%',
      render: (val, record) => <Switch defaultChecked={!val} onChange={value => HandleUpdateStatus(record.Id, !value)} /> 
      // <Checkbox style={{display: 'flex', justifyContent: 'center'}} defaultChecked={true} ></Checkbox>
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

      <div>
        <RequestsTable
          Title="SALIC Community News"
          HeaderControlPanel={<h1 onClick={(() => {setIsEditMode(false); setOpenModal(true)})} style={{cursor: 'pointer'}}><PlusCircleOutlined /> <span>Add New</span></h1>}
          Columns={columns}
          DataTable={news_list}
        />
        <Modal
          title={<><FileTextOutlined /> Add New</>}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          className='more-width-antd-modal'
          destroyOnClose
          footer={false}
        >
          <NewsForm 
            openModal={v => setOpenModal(v)} 
            isEditMode={isEditMode}
            item={item}
            setOpenModal={setOpenModal}
          />
        </Modal>
      </div>
    </>
  )
}

export default ManageNewsContent