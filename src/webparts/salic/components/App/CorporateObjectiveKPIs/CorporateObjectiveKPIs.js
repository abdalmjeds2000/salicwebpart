import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditableForm.css";
import { Button, Checkbox, Collapse, Dropdown, Form, InputNumber, message, Select, Spin, Table } from "antd";
import GetObjectivesData from "./API/GetObjectivesData";
import UpdateItem from "./API/UpdateItem";

import HistoryNavigation from "../Global/HistoryNavigation/HistoryNavigation";
import { CaretDownOutlined, CaretUpOutlined, FilterOutlined, LoadingOutlined } from "@ant-design/icons";

import KpiComment from './KpiComment';


const EditableContext = React.createContext(null);
const EditableCell = ({
  title,
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
          : <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} step={0.01} min={0} max={100000000} />
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








const CarouselData = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div>Perspective :: {props.CarouselTitle}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.9rem",
        }}
      >
        <div>
          <label htmlFor="ObjectiveProgress">{props.ObjectiveProgress && 'Objective Progress: '}</label>{" "}
          <b id="ObjectiveProgress">{props.ObjectiveProgress}</b>
        </div>
        <div>
          <label htmlFor="ProspectiveProgress">{props.ProspectiveProgress && 'Prospective Progress: '}</label>{" "}
          <b id="ProspectiveProgress">{props.ProspectiveProgress}</b>
        </div>
        <div>
          <label htmlFor="SALICProgress">{props.SALICProgress && 'SALIC Progress: '}</label>{" "}
          <b id="SALICProgress">{props.SALICProgress}</b>
        </div>
      </div>
    </div>
  );
};


function CorporateObjectiveKPIs() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  async function GetData() {
    const response = await GetObjectivesData();
    return response;
  }
  // Get Data Table
  const setArraySData = (data) => {
    let groups = data.reduce((r, a) => {
      r[a.field_1] = [...(r[a.field_1] || []), a];
      return r;
    }, {});

    let wwe = [];
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
        wwe.push({
          key: 'row-level-1',
          parent: Object.keys(groups)[i],
          header: `${index + 1}- ${Object.keys(rowEnabler)[index]}`,
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
          wwe.push({
            key: 'row-level-2',
            parent: Object.keys(groups)[i],
            header: Object.keys(rowObjectives)[ii],
            groupBy: "Objective",
          });
          Object.values(rowKPIs).map((k, ki) => {
            wwe.push({
              key: k[0].ID,
              parent: Object.keys(groups)[i],
              header: Object.keys(rowKPIs)[ki],
              groupBy: "KPI",
              ...k[0]
            });
          });
        });
      });
    });
    console.log("........CustomData........", wwe);
    setData(wwe);
  };

  
  useEffect(() => {
    GetData().then((res) => {
      setArraySData(res);
    });
  }, []);

  let Titles = data?.map((r) => r.parent)
  .filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });


  const handleSave = async (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row, });
    if(
        newData[index].Q1Target == data[index].Q1Target && 
        newData[index].Q2Target == data[index].Q2Target &&
        newData[index].Q3Target == data[index].Q3Target &&
        newData[index].Q4Target == data[index].Q4Target && 
        newData[index].field_22 == data[index].field_22 
      ) {
        console.log('No Changes')
      } else {
        const newUpdateData = {
          Q1Target: newData[index].Q1Target,
          Q2Target: newData[index].Q2Target,
          Q3Target: newData[index].Q3Target,
          Q4Target: newData[index].Q4Target,
          field_22: newData[index].field_22,
        };

        const updateResponse = await UpdateItem(newData[index].key, newUpdateData);
        message.success("The item has been modified successfully", 1);
        setData(newData);
        console.log('newUpdateData', newUpdateData)
      }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const [defaultColumns, setDefaultColumns] = useState([
    {
      title: "KPI Information",
      key: "1",
      dataIndex: "header",
      showColumn: true,
      render: (val, record) =>
        record.field_1 ? (
          <span
            style={{
              paddingLeft: "40px",
              lineHeight: "1.2",
              textAlign: 'left'
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
              textAlign: 'left'
            }}
          >
            {val}
          </span>
        ),
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return { colSpan: record.field_1 ? 1 : defaultColumns.filter(c=>c.showColumn).length };
      },
      width: "45%",
    },
    {
      key: "2",
      title: "KPI Weights",
      dataIndex: "field_6",
      width: "10%",
      editable: true,
      showColumn: false,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "4",
      title: "Owner",
      dataIndex: "field_16",
      width: "7%",
      showColumn: false,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "5",
      title: "Target Q1",
      dataIndex: "Q1Target",
      width: "7%",
      showColumn: true,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "6",
      title: "Target Q2",
      dataIndex: "Q2Target",
      width: "7%",
      showColumn: true,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "7",
      title: "Target Q3",
      dataIndex: "Q3Target",
      width: "7%",
      showColumn: true,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "8",
      title: "Target Q4",
      dataIndex: "Q4Target",
      width: "7%",
      showColumn: true,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "10",
      title: "Actual Full Year",
      dataIndex: "field_22",
      width: "10%",
      showColumn: true,
      editable: true,
      render: (val) => <span style={{textAlign: 'center'}}>{val}</span>
    },
    {
      key: "12",
      title: "",
      width: "3%",
      showColumn: true,
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
    /* {
      key: "13",
      title: "",
      width: "5%",
      showColumn: true,
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return {colSpan: record.field_4 ? 1 : 0} 
      },
      render: (_, record) => <a onClick={() => navigate(defualt_route+`/corporate-objective/${record.header.slice(2).replace(/ /g, '')}-${record.key}`)} style={{textAlign: 'center', display: 'block'}}>Details</a>
    } */
  ]);
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        inputType: col.dataIndex === 'field_16' ? 'select' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        colSpan: !record.field_1 ? 0 : 1,
      }),
    };
  });

  const onChange = (e, column) => {
    setDefaultColumns(prev => {
      prev.filter(c => c.dataIndex === column)[0]
      .showColumn = e.target.checked;
      return [... prev]
    })
  };






  return (
    <div className="corporate-page-container">
      <Form form={form} component={false}>
        <HistoryNavigation>
          <p>Corporate Objective KPIs</p>
        </HistoryNavigation>

        <div className="table-page-container">
          <div className="content">
            <div className="header">
              <h1>Corporate Objective KPIs</h1>
              <Dropdown 
                trigger={['click']}
                dropdownRender={(menu) => (
                  <div className="custom-dropdown-render">
                    <Checkbox onChange={e => onChange(e, "field_6")}>KPI Weights</Checkbox>
                    <Checkbox onChange={e => onChange(e, "field_16")}>Owner</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => onChange(e, "Q1Target")}>Target Q1</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => onChange(e, "Q2Target")}>Target Q2</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => onChange(e, "Q3Target")}>Target Q3</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => onChange(e, "Q4Target")}>Target Q4</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => onChange(e, "field_22")}>Actual Full Year</Checkbox>
                  </div>
                )}
              >
                <Button size="small"><FilterOutlined /> Filter Columns</Button>
              </Dropdown>
            </div>

            <div className="form">
              {data.length > 0 ? (
                <Collapse defaultActiveKey={["1"]}>
                  {Titles.map((row, i) => {
                    return (
                      <Collapse.Panel
                        key={i + 1}
                        header={
                          <CarouselData
                            CarouselTitle={row}
                          />
                        }
                      >
                        <div style={{ overflowX: "auto" }}>
                          <Table
                            columns={columns.filter(c => c.showColumn)}
                            dataSource={data?.filter((r) => r.parent === row && !r.ParentKPIId)}
                            pagination={false}
                            size="small"
                            components={components}
                            rowClassName="editable-row"
                          />
                        </div>
                      </Collapse.Panel>
                    );
                  })}
                </Collapse>
              ) : (
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CorporateObjectiveKPIs;
