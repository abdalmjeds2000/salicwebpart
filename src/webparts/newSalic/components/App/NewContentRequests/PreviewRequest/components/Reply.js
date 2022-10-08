import React from "react";


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
                {props.Content}
            </div>
        </div>
    )
}

export default Reply