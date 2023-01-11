import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Form, Input, InputNumber, message, Modal, Popconfirm, Radio, Select, Spin, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppCtx } from "../App";
import HistoryNavigation from "../Global/HistoryNavigation/HistoryNavigation";
import GetKPIsByParent from './API/GetKPIsByParent';
import UpdateItem from "./API/UpdateItem";
import DeleteKpiItem from './API/DeleteKpiItem';
import GetKpiItem from './API/GetKpiItem';
import AddNewKPI from './API/AddKpi';
import KpiComment from "./KpiComment";
import "./EditableForm.css";




const EditableContext = React.createContext(null);
const EditableCell = ({
  editable,
  inputType,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: false
          },
        ]}
      >
        {
          inputType === 'select' 
          ? <Select ref={inputRef} onPressEnter={save} onBlur={save}>
              <Select.Option value="Investment">Investment</Select.Option>
              <Select.Option value="Commercial">Commercial</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
              <Select.Option value="Corporate Communication">Corporate Communication</Select.Option>
              <Select.Option value="Shared Services">Shared Services</Select.Option>
              <Select.Option value="Strategy & Risk">Strategy & Risk</Select.Option>
              <Select.Option value="Legal & Corporate G&C">Legal & Corporate G&C</Select.Option>
            </Select>
          : <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        }
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};






const KPIChildrens = () => {
  const { kpi } = useParams();
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false)
  const [parentKpiData, setParentKpiData] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [btnLoader, setBtnLoader] = useState(0);
  
  const [form] = Form.useForm();


  const FetchDate = async () => {
    setLoading(true);
    const id = kpi.split('-')[kpi.split('-').length-1]; // get kpi key from link (e.g."globalinvestment(forfscoverage)-1")
    const response = await GetKPIsByParent(id);
    const getParentKpi = await GetKpiItem(id);
    setParentKpiData(getParentKpi);
    setLoading(false);
    return response
    
  }

  // Get Data Table
  const setArrayData = (data) => {
    let groups = data.reduce((r, a) => {
      r[a.field_1] = [...(r[a.field_1] || []), a];
      return r;
    }, {});

    let newData = [];
    Object.values(groups).map((row, i) => {
      let rowEnabler = Object.values(row).reduce((r, a) => {
        r[a.field_2.toLowerCase()] = [...(r[a.field_2.toLowerCase()] || []), a];
        return r;
      }, {});
      Object.values(rowEnabler).map((a, index) => {
        let rowObjectives = Object.values(a).reduce((r, a) => {
          r[a.field_3.toLowerCase()] = [
            ...(r[a.field_3.toLowerCase()] || []),
            a,
          ];
          return r;
        }, {});
        newData.push({
          key: 'row-level-1',
          parent: Object.keys(groups)[i],
          header: `${Object.keys(rowEnabler)[index]}`,
          groupBy: "Enabler",
        });

        Object.values(rowObjectives).map((obj, ii) => {
          let rowKPIs = Object.values(obj).reduce((r, a) => {
            r[a.field_4.toLowerCase()] = [
              ...(r[a.field_4.toLowerCase()] || []),
              a,
            ];
            return r;
          }, {});
          newData.push({
            key: 'row-level-2',
            parent: Object.keys(groups)[i],
            header: Object.keys(rowObjectives)[ii],
            groupBy: "Objective",
          });
          Object.values(rowKPIs).map((k, ki) => {
            newData.push({
              key: k[0].ID,
              parent: Object.keys(groups)[i],
              header: Object.keys(rowKPIs)[ki],
              groupBy: "KPI",
              ParentKPI: k[0].ParentKPIId,
              ...k[0]
            });
          });
        });
      });
    });
    console.log("........newData........", newData);
    setData(newData);
  };
  useEffect(() => {
    if(kpi.length > 0) {
      FetchDate()
      .then(res => setArrayData(res))
    } else {
      navigate(defualt_route+'/corporate-objective');
      message.info("Not Fount KPI")
    }
  }, [refresh])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleSave = async (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    if(
      newData[index].field_6 == data[index].field_6 &&
      newData[index].field_19 == data[index].field_19 &&
      newData[index].Annual_x0020_2022_x0020_Target_x == data[index].Annual_x0020_2022_x0020_Target_x &&
      newData[index].KPI_x0020_Performance_x0020_Prog == data[index].KPI_x0020_Performance_x0020_Prog &&
      newData[index].field_25 == data[index].field_25 
    ) {
      console.log('No Changes')
    } else {
      setData(newData);
      const KPIs = newData.filter(k => k.field_1);
      const KPIsByProspective = newData.filter(k => k.field_1 === newData[index].field_1)
      const KPIsByEnabler = newData.filter(k => k.field_2 === newData[index].field_2)
      
      const KPIProspectiveWeights = newData[index].field_6 / KPIsByProspective.reduce((a, b) => a + Number(b["field_6"]), 0);
      const ObjectiveTotal = KPIsByEnabler.reduce((a, b) => a + Number(b["field_6"]), 0);
      const ObjectiveActual = KPIsByEnabler.reduce((a, b) => a + (Number(b["KPI_x0020_Performance_x0020_Prog"]) * Number(b["field_6"])), 0);
      const ProspectiveScore = KPIsByProspective.reduce((a, b) => a + (Number(b["KPIPerformanceScore_x0028_1_x002"]) * Number(b["field_7"])), 0);
      const SALICScore = KPIs.reduce((a, b) => a + (Number(b["KPIPerformanceScore_x0028_1_x002"]) * Number(b["field_6"])), 0);
      const ProspectiveProgress = KPIsByProspective.reduce((a, b) => a + (Number(b["KPI_x0020_Performance_x0020_Prog"]) * Number(b["field_7"])), 0);
      const SALICProgress = KPIs.reduce((a, b) => a + (Number(b["KPI_x0020_Performance_x0020_Prog"]) * Number(b["field_6"])), 0);
      const newUpdateData = {
        field_6: newData[index].field_6,
        field_19: newData[index].field_19,
        Annual_x0020_2022_x0020_Target_x: newData[index].Annual_x0020_2022_x0020_Target_x.toString(),
        KPI_x0020_Performance_x0020_Prog: newData[index].KPI_x0020_Performance_x0020_Prog.toString(),
        field_25: newData[index].field_25,

        // Calculated Columns
        field_7: KPIProspectiveWeights,
        field_29: ObjectiveTotal,
        Objective_x0020_Actual_x0020_CAL: ObjectiveActual.toString(),
        field_31: ProspectiveScore,
        field_32: SALICScore,
        field_33: ProspectiveProgress,
        field_34: SALICProgress,
      };
      const updateResponse = await UpdateItem(
        newData[index].key,
        newUpdateData
      ).then(() => message.success("The item has been modified successfully", 1))
      console.log("updateResponse", updateResponse);
    }
  };

  const DeleteKpi = async (id) => {
    
    const response = await DeleteKpiItem(id);
    if(response) {
      message.success("KPI has been Deleted!");
      if(data.length > 3) {
        const newData = data.filter(kpi => kpi.Id != id);
        setData(newData);
      } else {
        setRefresh(prev => prev += 1);
      }
    }
  }
  const defaultColumns = [
    {
      title: "KPI Information",
      key: "1",
      dataIndex: "header",
      render: (val, record) =>
        record.field_4 ? (
          <span
            style={{
              paddingLeft: "40px",
              lineHeight: "1.2",
            }}
          >
            {record.field_22 === "Ascend" ? <><CaretUpOutlined style={{color: 'green'}} /> {val}</> : <><CaretDownOutlined style={{color: 'red'}} /> {val}</>}
          </span>
        ) : (
          <span
            style={{
              paddingLeft: record.groupBy === "Enabler" ? "0px" : "20px",
              lineHeight: record.groupBy === "Enabler" ? "1.7" : "1.4",
              textTransform: "capitalize",
              fontSize: "1rem",
              fontWeight: record.groupBy === "Enabler" ? "500" : "400",
            }}
          >
            {val}
          </span>
        ),
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return { colSpan: record.field_4 ? 1 : 7 };
      },
      width: "55%",
    },
    {
      key: "2",
      title: "KPI Weights",
      dataIndex: "field_6",
      width: "8%",
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "3",
      title: "Owner",
      dataIndex: "field_19",
      width: "8%",
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "4",
      title: "Annual Target",
      dataIndex: "Annual_x0020_2022_x0020_Target_x",
      width: "8%",
      // editable: true,
      render: (val) => <span style={{textAlign: 'center', display: 'block'}}>{val ? Number(val).toFixed(3).replace(/\.?0*$/,'') : ""}</span>
    },
    {
      key: "5",
      title: "KPI Performance Progress",
      dataIndex: "KPI_x0020_Performance_x0020_Prog",
      width: "8%",
      render: (val) => <span style={{textAlign: 'center', display: 'block'}}>{val ? `${(Number(val)*100).toFixed(1).replace(/\.?0*$/,'')}%` : ""}</span>
    },
    {
      key: "6",
      title: "Actual Full Year",
      dataIndex: "field_25",
      width: "8%",
      editable: true,
    },
    {
      key: "7",
      title: "",
      width: "3%",
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return {colSpan: record.field_4 ? 1 : 0} 
      },
      render: (_, record) => (
        <KpiComment 
          getNewCommentValue={(newComment) => setData(prev => {prev.filter(row => row.Id===record.Id)[0].Comment = newComment; return [...prev]})} 
          KpiTitle={record.field_4} 
          KpiId={record.Id} 
          CurrentComment={record.Comment} 
        />
      )
    },
    {
      key: "8",
      title: "",
      dataIndex: "Id",
      width: "5%",
      render: (id) => (
        <Popconfirm
          title="Are you sure delete this KPI?"
          onConfirm={() => DeleteKpi(id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{color: 'red'}} />
        </Popconfirm>
      ),
      onCell: record => ({colSpan: !record.field_4 ? 0 : {}}),
    }
  ];
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        inputType: col.dataIndex === 'field_19' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        colSpan: !record.field_4 ? 0 : {},
      }),
    };
  });

  const AddKPI = async (values) => {
    setBtnLoader(true);
    values.field_1 = parentKpiData.field_1;
    values.field_2 = parentKpiData.field_2;
    values.field_3 = parentKpiData.field_3;
    // values.field_4 = parentKpiData.field_4;
    // values.field_5 = parentKpiData.field_5;
    // values.field_6 = parentKpiData.field_6;
    values.field_7 = parentKpiData.field_7;
    values.field_8 = parentKpiData.field_8;
    values.field_9 = parentKpiData.field_9;
    values.field_10 = parentKpiData.field_10;
    values.field_11 = parentKpiData.field_11;
    values.field_12 = parentKpiData.field_12;
    values.field_13 = parentKpiData.field_13;
    values.field_14 = parentKpiData.field_14;
    values.field_15 = parentKpiData.field_15;
    values.field_16 = parentKpiData.field_16;
    values.field_17 = parentKpiData.field_17;
    values.Annual_x0020_2022_x0020_Target_x = values.Annual_x0020_2022_x0020_Target_x.toString();
    // values.field_19 = parentKpiData.field_19;
    values.field_20 = parentKpiData.field_20;
    values.field_21 = parentKpiData.field_21;
    // values.field_22 = parentKpiData.field_22;
    // values.field_23 = parentKpiData.field_23;
    values.field_24 = parentKpiData.field_24;
    // values.field_25 = parentKpiData.field_25;
    values.KPIPerformanceScore_x0028_1_x002 = parentKpiData.KPIPerformanceScore_x0028_1_x002.toString();
    values.KPI_x0020_Performance_x0020_Prog = values.KPI_x0020_Performance_x0020_Prog.toString();
    values.Objective_x0020_Actual_x0020_CAL = parentKpiData.Objective_x0020_Actual_x0020_CAL;
    values.field_29 = parentKpiData.field_29;
    values.Objective_x0020_Progress_x0020_C = parentKpiData.Objective_x0020_Progress_x0020_C;
    values.field_31 = parentKpiData.field_31;
    values.field_32 = parentKpiData.field_32;
    values.field_33 = parentKpiData.field_33;
    values.field_34 = parentKpiData.field_34;
    values.ParentKPIId = parentKpiData.Id;

    values.field_4 = values.field_5 + ' ' + values.field_4.trim()

    console.log(values)
    const addRequest = await AddNewKPI(values)
    .then(() => setRefresh(prev => prev += 1))
    if(addRequest?.data) {
      message.success("KPI has been created successfully");
    }
    setOpenModal(false);
    setBtnLoader(false);
    onReset();
  }
  const onReset = () => form.resetFields();

  
  return (
    <div className="corporate-page-container">
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/corporate-objective')}>Corporate Objective KPIs</a>
        <p>KPIs</p>
      </HistoryNavigation>

      <div className="table-page-container">
        <div className="content">
          <div className="header">
            <h1>Corporate Objective KPIs</h1>
            <h1 style={{cursor: 'pointer'}} onClick={() => setOpenModal(true)}>
              <PlusCircleOutlined /> Add New KPI
            </h1>
          </div>

          <div className="form">
            {
              !loading
              ? (
                  data.length > 0
                  ? <div style={{ overflowX: "auto" }}>
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="small"
                        components={components}
                        rowClassName="editable-row"
                      />
                    </div>
                  : <div style={{display: 'flex', justifyContent: 'center'}}>
                      <Empty />
                    </div>
                )
              : <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
            }
          </div>
        </div>
        <Modal
          title="Add New KPI"
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          okButtonProps={{ style: {display: 'none'}}}
        >
          <Form name="new-kpi" form={form} onFinish={AddKPI} layout="vertical" onFinishFailed={() => message.error("Fill Form Correctly!")}>
            <Form.Item
              label="KPI Title"
              name="field_4"
              rules={[{required: true, message: false}]}
            >
              <Input 
                placeholder="Enter KPI Title" 
                addonBefore={
                  <Form.Item name="field_5" initialValue="#" noStyle>
                    <Select style={{ width: 80 }} >
                      <Select.Option value="#">#</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                    </Select>
                  </Form.Item>
                } 
              />
            </Form.Item>

            <Form.Item
              label="Actual Full Year"
              name="field_25"
              rules={[{required: true, message: false}]}
            >
              <InputNumber min={1} max={100000} placeholder="Enter Number" />
            </Form.Item>
            <Form.Item
              label="Trend"
              name="field_22"
              rules={[{required: true, message: false}]}
              initialValue="Ascend"
            >
              <Radio.Group style={{ width: "100%" }}>
                <Radio.Button value="Ascend">Ascend</Radio.Button>
                <Radio.Button value="Descend">Descend</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="KPI Type"
              name="field_23"
              rules={[{required: true, message: false}]}
              initialValue="Sector"
            >
              <Radio.Group style={{ width: "100%" }}>
                <Radio.Button value="Sector">Sector</Radio.Button>
                <Radio.Button value="Sector Common">Sector Common</Radio.Button>
              </Radio.Group>
            </Form.Item>


            <Form.Item
              label="KPI Weights"
              name="field_6"
              rules={[{required: true, message: false}]}
            >
              <InputNumber step={0.1} min={0} max={100000} placeholder="Enter KPI Weights" />
            </Form.Item>

            <Form.Item
              label="Owner"
              name="field_19"
              rules={[{required: true, message: false}]}
              initialValue="Investment"
            >
              <Select>
                <Select.Option value="Investment">Investment</Select.Option>
                <Select.Option value="Commercial">Commercial</Select.Option>
                <Select.Option value="Finance">Finance</Select.Option>
                <Select.Option value="Corporate Communication">Corporate Communication</Select.Option>
                <Select.Option value="Shared Services">Shared Services</Select.Option>
                <Select.Option value="Strategy & Risk">Strategy & Risk</Select.Option>
                <Select.Option value="Legal & Corporate G&C">Legal & Corporate G&C</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label="Annual Target"
              name="Annual_x0020_2022_x0020_Target_x"
              rules={[{required: true, message: false}]}
            >
              <InputNumber step={0.1} min={0} max={100000} placeholder="Enter Annual Target" />
            </Form.Item>

            <Form.Item
              label="KPI Performance Progress"
              name="KPI_x0020_Performance_x0020_Prog"
              rules={[{required: true, message: false}]}
            >
              <InputNumber step={0.1} min={0} max={100000} placeholder="Enter KPI Performance Progress" />
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}} disabled={btnLoader}>
                Add KPI
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default KPIChildrens