import React, { useContext, useEffect, useState } from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import './Communication.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AppCtx } from '../App';


function appendChild (n, all, index){
  var xx = all.filter(x=>x.pid === n.id);
  n.children = xx;
  for (var s of xx){
    index++;
    if(index > 5) {
      index = 5
    }
    appendChild(s, all, index);
  }
}




const renderNode = ({ nodeData }) => {
  const [expandIcon, setExpandIcon] = useState(<MinusOutlined />);
  useEffect(() => {
    let childNodes = document.getElementById(nodeData.id)
      .parentElement.childNodes;


    if(nodeData?.children?.length > 0) {
      childNodes[0].className = "oc-node isChildrenCollapsed";
      childNodes[1].className = "hidden";
      setExpandIcon(<PlusOutlined />);
    }
    if(nodeData?.children?.length > 0 && nodeData.id == "1") {
      childNodes[0].className = "oc-node";
      childNodes[1].className = "";
    }
  }, []);
  return (
    <div className="org-node-container">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className="org-person">
          <div>
            <img src={nodeData.img} className="headshot" alt="" />
          </div>
        </div>
        <div className="org-title">{nodeData.title}</div>
      </div>

      <div>
        <div className="org-name">{nodeData.name}</div>
      </div>

        {nodeData?.children?.length > 0 && nodeData.id != "1" && (
          <div
            className="org-node-children"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let childNodes = document.getElementById(nodeData.id)
                .parentElement.childNodes;
              if (childNodes[1].className.includes("hidden")) {
                childNodes[0].className = "oc-node";
                childNodes[1].className = "";
                setExpandIcon(<MinusOutlined />);
              } else {
                childNodes[0].className = "oc-node isChildrenCollapsed";
                childNodes[1].className = "hidden";
                setExpandIcon(<PlusOutlined />);
              }
            }}
          >
            <p>{expandIcon}</p>
          </div>
        )}
    </div>
  );
}



function Communication() {
  const { communicationList } = useContext(AppCtx);
  const [data, setData] = useState([]);
  useEffect(() => {
    if(communicationList.length > 0) {
      var root = communicationList.filter(t=> t.pid == null)[0];
      appendChild(root, communicationList);
      console.log(root);
      setData(root);
    }
  }, [communicationList]);


  useEffect(() => {
    let orgchartContainer = document.getElementsByClassName("orgchart-container ");
    if(orgchartContainer.length > 0) {
      const scrollTo = (orgchartContainer[0].scrollWidth = orgchartContainer[0].scrollWidth / 4);
      orgchartContainer[0].scrollLeft = scrollTo;
    }
  }, [])
  return (
    <>
      <HistoryNavigation>
        <p>Communication</p>
      </HistoryNavigation>
      <div style={{position: 'relative', top: '85px', minHeight: 'calc(100vh - 85px)'}}>
      {
        Object.keys(data).length > 0 
        ? (
            <OrganizationChart
              datasource={data}
              chartClass="sekure-org-chart"
              pan={true}
              zoom={false}
              NodeTemplate={renderNode}
              zoominLimit={0.1}
              zoomoutLimit={0.1}
              onClickNode={(node) => console.log(node)}
            />
          ) : (
            null
          )
        }
      </div>
    </>
  );
}

export default Communication