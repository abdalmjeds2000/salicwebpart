import React, { useContext, useEffect, useState } from 'react';
import { Table, Row, Col, Pagination, Typography, Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import { AppCtx } from '../../../../../../App';
import moment from 'moment';
import UserColumnInTable from '../../../../../../Global/UserColumnInTable/UserColumnInTable';
import DropdownSelectUser from '../../../../../../Global/DropdownSelectUser/DropdownSelectUser';
import { FilterOutlined } from '@ant-design/icons';
import Preview from './Preview';
import NewDeliveryLetter from './NewDeliveryLetter';


const initialFilter = { email: '', Number: '', Department: 'All', Status: 'All', AssetName: '' };

const DeliveryLetters = () => {
  const { user_data, salic_departments } = useContext(AppCtx);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(true);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const _pageSize = 20;
  const [defualtFilterData, setDefualtFilterData] = useState(initialFilter);
  const [showFilterPanel, setShowFilterPanel] = useState(false);


  const FetchData = async (filterData, page, pageSize) => {
    setLoading(true);
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    const response = await axios.get(`https://salicapi.com/api/Asset/GetDeliveryNotes?draw=8&order=CreatedAt+desc&start=${skipItems}&length=${takeItems}&search[value]=&search[regex]=false&email=${filterData.email}&Number=${filterData.Number}&Department=${filterData.Department}&Status=${filterData.Status}&AssetName=${filterData.AssetName}&_=1669282863275`)
    setData(response.data);
    setCurrentPage(page)
    setLoading(false);
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0 && salic_departments.length > 0) {
      FetchData(defualtFilterData, 1, _pageSize)
      console.log('salic_departments', salic_departments);
    }
  }, [user_data, salic_departments]);

  const ApplyFilter = async (formData, page, pageSize) => {
    Object.keys(formData).forEach(key => {if(formData[key] === undefined || formData[key] === null) formData[key] = ''})
    FetchData(formData, page, pageSize);
  }

  const columns = [
    {
      title: 'DN#',
      dataIndex: 'Number',
      width: '7%',
      render: (tagNumber) => (
        <Typography.Link href={`https://salic.sharepoint.com/sites/newsalic/SitePages/Assets/ManageAsset.aspx?Id=${tagNumber}`} target="_blank" >
          {tagNumber}
        </Typography.Link>
      )
    },{
      title: 'Date',
      dataIndex: 'CreatedAt',
      width: '10%',
      render: (date) => date ? moment(date).format('MM/DD/YYYY hh:mm') : ''
    },{
      title: 'Delivered To',
      dataIndex: 'DeliveredTo',
      width: '22%',
      render: (val) => <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} />
    },{
      title: 'Delivered By',
      dataIndex: 'Requester',
      width: '22%',
      render: (val) => <UserColumnInTable Mail={val?.Mail} DisplayName={val?.DisplayName} />
    },{
      title: 'Status',
      dataIndex: 'Status',
      width: '10%',
      render: (val) => val == "Submitted_By_IT" ? "Pending" : "Acknowleged"
    },{
      title: 'Assets Count',
      dataIndex: 'DeliveryNoteDetailCount',
      width: '10%',
    },{
      title: 'Preview',
      dataIndex: 'Id',
      width: '10%',
      render: (id) => <Preview id={id} />
    }
  ];

  let departments = [];
  if(salic_departments.length > 0) {
    departments = salic_departments?.map(row => {
        return { value: row, label: row }
    })
  }
  
  return (
    <Row gutter={[25, 25]}>
      <Col span={24}>
        <Form 
          form={form} 
          onFinish={(values) => {
            if(showFilterPanel) {
              ApplyFilter(values, 1, _pageSize); 
              setDefualtFilterData(values);
            }
          }} 
          layout="vertical" 
          onReset={() => {FetchData(initialFilter, 1, _pageSize); showFilterPanel ? setShowFilterPanel(false) : null}}
        >
          <Row gutter={[15, 0]}>
            {
              showFilterPanel && 
              <>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Number" label="Delivery Letter Number">
                    <Input placeholder="write here" size='large' />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Department" label="Department" initialValue="All">
                    <Select 
                      defaultValue="All" 
                      size='large' 
                      options={[{value: 'All', label: 'All'}, ...departments]} />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Status" label="Status" initialValue="All">
                    <Select 
                      defaultValue="All" 
                      size='large' 
                      options={[
                        {value: 'All', label: 'All'}, 
                        {value: 'Submitted_By_IT', label: 'Pending'}, 
                        {value: 'Acknowledged_By_User', label: 'Acknowledged'}, 
                      ]} />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="AssetName" label="Asset Name">
                    <Input placeholder="write here" size='large' />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item label="Email Address">
                    <DropdownSelectUser
                      name="email"
                      placeholder="employee name"
                    />
                  </Form.Item>
                </Col>
              </>
            }
            
            <Col span={24}>
              <Row align="middle" justify="end">
                  <Button type="primary" onClick={() => !showFilterPanel ? setShowFilterPanel(true) : null} icon={<FilterOutlined />} loading={loading} htmlType={showFilterPanel ? "submit" : "button"} style={{marginRight: 10}}>
                    Filter
                  </Button>
                  {showFilterPanel && <Button htmlType="reset" danger style={{marginRight: 25}}>
                    Reset
                  </Button>}
                <NewDeliveryLetter />
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>

      <Col span={24} style={{overflow: 'auto'}}>
        <Table columns={columns} size="large" dataSource={data.data} pagination={false} />
      </Col>

      <Row justify="center" align="middle" style={{width: '100%', marginTop: 25}}>
        <Pagination 
          size="small" 
          current={currentPage}
          total={data.recordsTotal / 2} 
          onChange={(page) => ApplyFilter(defualtFilterData, page, _pageSize)}
          hideOnSinglePage
        />
      </Row>
    </Row>
  )
}

export default DeliveryLetters