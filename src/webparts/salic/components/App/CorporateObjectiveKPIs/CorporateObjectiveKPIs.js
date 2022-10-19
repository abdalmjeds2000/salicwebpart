import React, { useContext, useEffect, useState } from "react";
import "./EditableForm.css";
import { AppCtx } from "../App";
import {
  Collapse,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import GetObjectivesData from "./API/GetObjectivesData";
import UpdateItem from "./API/UpdateItem";

import HistoryNavigation from "../Global/HistoryNavigation/HistoryNavigation";
import { ConsoleListener } from "sp-pnp-js";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const sharedOnCell = (record, index) => {
  return {
    colSpan: !record.Unit ? 0 : {},
  };
};

function CorporateObjectiveKPIs() {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [obj, setObj] = useState([]);

  async function GetData() {
    const response = await GetObjectivesData();
    if (response) {
      setObj(response);
      console.log(response);
    }
    return response;
  }

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      Unit: "",
      Trend: "",
      KPIType: "",
      Owner: "",
      KPIWeights: "",
      KPIProspectiveWeights: "",
      Annual2022Target: "",
      ActualFullYear: "",
      KPIPerformanceProgress: "",
      ObjectiveProgress: "",
      ProspectiveProgress: "",
      SALICProgress: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");

        const newUpdateData = {
          field_5: newData[index].Unit,
          field_6: newData[index].Trend,
          field_7: newData[index].KPIType,
          field_8: newData[index].Owner,
          field_9: newData[index].KPIWeights,
          field_10: newData[index].KPIProspectiveWeights,
          field_11: newData[index].Annual2022Target,
          field_12: newData[index].ActualFullYear,
          field_13: newData[index].KPIPerformanceProgress,
          field_14: newData[index].ObjectiveProgress,
          field_15: newData[index].ProspectiveProgress,
          field_16: newData[index].SALICProgress,
        };
        const updateResponse = await UpdateItem(
          newData[index].key,
          newUpdateData
        );
        message.success("The item has been modified successfully");
        console.log("updateResponse", updateResponse);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "",
      key: "1",
      dataIndex: "header",
      render: (val, record) =>
        record.Unit ? (
          <span
            style={{
              paddingLeft: "40px",
            }}
          >
            {val}
          </span>
        ) : (
          <span
            style={{
              paddingLeft: record.groupBy === "Enabler" ? "0px" : "20px",
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
        return { colSpan: record.Unit ? 1 : 14 };
      },
      width: "41.5%",
    },
    {
      key: "2",
      title: "Unit",
      dataIndex: "Unit",
      width: "4.5%",
      editable: true,
    },
    {
      key: "3",
      title: "Trend",
      dataIndex: "Trend",
      width: "4.5%",
      editable: true,
    },
    {
      key: "4",
      title: "KPI Type",
      dataIndex: "KPIType",
      width: "4.5%",
      editable: true,
    },
    {
      key: "5",
      title: "Owner",
      dataIndex: "Owner",
      width: "4.5%",
      editable: true,
    },
    {
      key: "6",
      title: "KPI Weights",
      dataIndex: "KPIWeights",
      width: "4.5%",
      editable: true,
    },
    {
      key: "7",
      title: "KPI Prospective Weights",
      dataIndex: "KPIProspectiveWeights",
      width: "4.5%",
      editable: true,
      render: (val) => (val ? parseFloat(val).toFixed(3) : ""),
    },
    {
      key: "8",
      title: "Annual 2022 Target",
      dataIndex: "Annual2022Target",
      width: "4.5%",
      editable: true,
    },
    {
      key: "9",
      title: "Actual Full Year",
      dataIndex: "ActualFullYear",
      width: "4.5%",
      editable: true,
    },
    {
      key: "10",
      title: "KPI Performance Progress",
      dataIndex: "KPIPerformanceProgress",
      width: "4.5%",
      editable: true,
      render: (val) => (val ? parseFloat(val).toFixed(3) : ""),
    },
    {
      key: "11",
      title: "Objective Progress",
      dataIndex: "ObjectiveProgress",
      width: "4.5%",
      editable: true,
      render: (val) => (val ? parseFloat(val).toFixed(3) : ""),
    },
    {
      key: "12",
      title: "Prospective Progress",
      dataIndex: "ProspectiveProgress",
      width: "4.5%",
      editable: true,
      onCell: sharedOnCell,
      render: (val) => (val ? parseFloat(val).toFixed(3) : ""),
    },
    {
      key: "13",
      title: "SALIC Progress",
      dataIndex: "SALICProgress",
      width: "4.5%",
      editable: true,
      render: (val) => (val ? parseFloat(val).toFixed(3) : ""),
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "4.5%",
      onCell: (record, index) => {
        // record.Unit => to check if record just a title or full record
        return { colSpan: record.Unit ? 1 : 0 };
      },
      render: (_, record) => {
        const editable = isEditing(record);
        return editable && record.groupBy === "KPI" ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        colSpan: !record.Unit ? 0 : {},
      }),
    };
  });

  const setArraySData = (data) => {
    let groups = data.reduce((r, a) => {
      r[a.Title] = [...(r[a.Title] || []), a];
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
          key: Math.random(),
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
            key: Math.random(),
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
              Unit: k[0].field_5,
              Trend: k[0].field_6,
              KPIType: k[0].field_7,
              Owner: k[0].field_8,
              KPIWeights: k[0].field_9,
              KPIProspectiveWeights: k[0].field_10,
              Annual2022Target: k[0].field_11,
              ActualFullYear: k[0].field_12,
              KPIPerformanceProgress: k[0].field_13,
              ObjectiveProgress: k[0].field_14,
              ProspectiveProgress: k[0].field_15,
              SALICProgress: k[0].field_16,
            });
          });
        });
      });
    });
    console.log("........wwe........", wwe);
    setData(wwe);
  };

  useEffect(() => {
    GetData().then((res) => {
      setArraySData(res);
    });
  }, []);

  return (
    <Form form={form} component={false}>
      <HistoryNavigation>
        <p>Corporate Objective KPIs</p>
      </HistoryNavigation>

      <div className="table-page-container">
        <div className="content">
          <div className="header">
            <h1>Corporate Objective KPIs</h1>
          </div>

          <div className="form">
            {data.length > 0 ? (
              <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="Food Security" key="1">
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      columns={mergedColumns}
                      dataSource={data?.filter(
                        (r) => r.parent === "Food Security"
                      )}
                      pagination={false}
                      size="small"
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      rowClassName="editable-row"
                    />
                  </div>
                </Collapse.Panel>
                <Collapse.Panel header="Financial" key="2">
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      columns={mergedColumns}
                      dataSource={data?.filter((r) => r.parent === "Financial")}
                      pagination={false}
                      size="small"
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      rowClassName="editable-row"
                    />
                  </div>
                </Collapse.Panel>
                <Collapse.Panel header="Internal Enablers" key="3">
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      columns={mergedColumns}
                      dataSource={data?.filter(
                        (r) => r.parent === "Internal Enablers"
                      )}
                      pagination={false}
                      size="small"
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      rowClassName="editable-row"
                    />
                  </div>
                </Collapse.Panel>
              </Collapse>
            ) : (
              "LOADING...."
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default CorporateObjectiveKPIs;
