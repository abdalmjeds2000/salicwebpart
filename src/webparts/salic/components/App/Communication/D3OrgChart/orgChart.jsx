import React, { useState, useRef, useLayoutEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";

import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./customNodeContent";
import CustomExpandButton from "./customExpandButton";
import EmployeeDetailsCard from "./employeeDetailsCard";
import { AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineNodeCollapse } from "react-icons/ai";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { SlOrganization } from "react-icons/sl";

const styles = {
  orgChart: {
    height: "calc(100vh - 85px)",
    backgroundColor: "#eaeaea",
  },
  orgChartToolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    position: 'absolute',
    right: '25px',
    bottom: '25px',
  }
};

const OrganizationalChart = (props) => {
  const d3Container = useRef(null);
  const chart = useMemo(() => {
    return new OrgChart()
  }, []);
  const [cardShow, setCardShow] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  
  const handleShow = () => setCardShow(true);
  const handleClose = () => setCardShow(false);

  useLayoutEffect(() => {
    const toggleDetailsCard = (nodeId) => {
      handleShow();
      setEmployeeId(nodeId);
    };
    if (props.data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 300)
        .nodeHeight((d) => 150)
        .compactMarginBetween((d) => 80)
        .layout('top')
        .onNodeClick((d) => {
          toggleDetailsCard(d);
        })
        .initialZoom(0.5)
        .buttonContent((node, state) => {
          return renderToStaticMarkup(
            <CustomExpandButton {...node.node} />
          );
        })
        .nodeContent((d) => {
          return renderToStaticMarkup(
            <CustomNodeContent {...d} />
          );
        })
        .render();
    }
  }, [props, props.data, chart]);

  return (
    <div style={styles.orgChart} ref={d3Container}>
      <div style={styles.orgChartToolbar}>
        <button type="button" onClick={() => chart.zoomIn()}><AiOutlineZoomIn /></button>
        <button type="button" onClick={() => chart.zoomOut()}><AiOutlineZoomOut /></button>
        <button type="button" onClick={() => chart.fullscreen()}><MdOutlineZoomOutMap /></button>
        <button type="button" onClick={() => chart.expandAll()}><SlOrganization /></button>
        <button type="button" onClick={() => chart.collapseAll()}><AiOutlineNodeCollapse /></button>
      </div>
      {cardShow && (
        <EmployeeDetailsCard
          employees={props.data}
          employee={props.data.find((employee) => employee.id === employeeId)}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default OrganizationalChart;
