import { FileOutlined } from "@ant-design/icons";
import React from "react";
import FileIcon from "./FileIcon";


function Reply(props) {
    const contentStyle = {
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        margin: '10px 0',
        fontWeight: 400,
        fontSize: '1.1rem'
    }
    return (
        <div className="reply-container">
            <h3 style={{fontSize: '1.2rem'}}>{props.Title}</h3>
            <time style={{fontSize: '0.9rem'}}>{props.Description}</time>
            <div className="reply-content" style={contentStyle}>
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