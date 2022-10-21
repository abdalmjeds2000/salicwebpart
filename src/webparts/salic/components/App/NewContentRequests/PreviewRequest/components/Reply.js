import { FileOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";
import FileIcon from "./FileIcon";


function Reply(props) {
    const contentStyle = {
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        margin: '10px 0',
        fontWeight: 400,
        fontSize: '1.1rem',
        whiteSpace: "pre-line"
    }
    return (
        <div className="reply-container">
            <h3 style={{fontSize: '1.2rem'}}>{props.Title}</h3>
            <time style={{fontSize: '0.9rem'}}>{props.Description}</time>
            <div className="reply-content" style={contentStyle}>
                {
                    props.IsReason && props.RequestStatus === "Rejected"
                    ? <div style={{display: 'block'}}><Tag color="rgb(255, 39, 43)">Rejection Reason</Tag></div>
                    : props.IsReason && props.RequestStatus === "Approved"
                    ? <div style={{display: 'block'}}><Tag color="#277c62">Approved Note</Tag></div>
                    : null
                }
                {props.children}
                <div style={{marginTop: '10px'}}>
                    {
                        props.Files
                        ?   props.Files.map((file,i) => {
                                return (
                                    <FileIcon
                                        key={i} 
                                        FileType={file.fileType}
                                        FileName={file.fileName}
                                        FilePath={file.path}
                                        IconWidth='30px'
                                    />
                                )
                            })
                        :   null
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Reply