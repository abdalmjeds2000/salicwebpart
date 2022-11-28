import React, { useContext, useEffect, useState } from 'react';
import { Table, Row, Col, Pagination, Typography, Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import { AppCtx } from '../../../../../App';
import moment from 'moment';
import UserColumnInTable from '../../../../../Global/UserColumnInTable/UserColumnInTable';
import DropdownSelectUser from '../../../../../Global/DropdownSelectUser/DropdownSelectUser';
import { FilterOutlined } from '@ant-design/icons';

const initialFilter = { Name: '', CategoryType: '', Brand: '', Model: '', DeliveredTo: '', Available: 'All', Type: '', Tag: '', SN: '' };

const SalicAssets = () => {
  const { user_data } = useContext(AppCtx);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(true);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [defualtFilterData, setDefualtFilterData] = useState(initialFilter);
  const _pageSize = 20;


  const FetchData = async (filterData, page, pageSize) => {
    const skipItems = pageSize * (page - 1);
    const takeItems = pageSize;
    setLoading(true);
    const response = await axios.get(`https://salicapi.com/api/Asset/Get?draw=13&order=CreatedAt+desc&start=${skipItems}&length=${takeItems}&search[value]=&search[regex]=false&email=${user_data.Data?.Mail}&Name=${filterData.Name}&CategoryType=${filterData.CategoryType}&Brand=${filterData.Brand}&Model=${filterData.Model}&DeliveredTo=${filterData.DeliveredTo}&Available=${filterData.Available}&Type=${filterData.Type}&Tag=${filterData.Tag}&SN=${filterData.SN}&_=1669266638774`)
    setData(response.data);
    setCurrentPage(page)
    setLoading(false);
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      FetchData(defualtFilterData, 1, _pageSize)
    }
  }, [user_data]);

  const ApplyFilter = async (formData, page, pageSize) => {
    Object.keys(formData).forEach(key => {if(formData[key] === undefined || formData[key] === null) formData[key] = ''})
    FetchData(formData, page, pageSize);
  }

  const columns = [
    {
      title: 'Tag#',
      dataIndex: 'TagNumber',
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
      title: 'Name',
      dataIndex: 'Name',
      width: '25%',
    },{
      title: 'Category',
      dataIndex: 'CategoryType',
      width: '10%',
    },{
      title: 'Model',
      dataIndex: 'Model',
      width: '10%',
    },{
      title: 'Assign To',
      dataIndex: 'DeliveryNote',
      width: '15%',
      render: (_, record) => {
        if(record.DeliveryNote != null && record.DeliveryNote.Returned == null) {
          return <UserColumnInTable Mail={record.DeliveryNote?.ToUser?.Mail} DisplayName={record.DeliveryNote?.ToUser?.DisplayName} />
        }
        return 'IT Store';
      }
    },{
      title: '#Delivery Letters',
      dataIndex: 'DeliveryNotesCount',
      width: '10%',
      render: (val) => <b>{val}</b>
    }
  ];


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
                  <Form.Item name="Name" label="Asset Name">
                    <Input placeholder="write here" size='large' />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="CategoryType" label="Category">
                    <Input placeholder="write here" size='large'/>
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Brand" label="Brand">
                    <Input placeholder="write here" size='large'/>
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Model" label="Model">
                    <Input placeholder="write here" size='large'/>
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item label="Delivered To">
                    <DropdownSelectUser
                      name="DeliveredTo"
                      placeholder="employee name"
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Available" label="Available" initialValue="All">
                    <Select defaultValue="All" size='large' options={[{value: 'All'}, {value: 'Yes'}, {value: 'No'}]} />
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Type" label="Type">
                    <Input placeholder="write here" size='large'/>
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="Tag" label="Tag Number">
                    <Input placeholder="write here" size='large'/>
                  </Form.Item>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <Form.Item name="SN" label="Serial Number">
                    <Input placeholder="write here" size='large'/>
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
                <Button type='primary' href='https://salicapi.com/api/asset/export' target='_blank'>
                  Export Assets
                </Button>
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

export default SalicAssets