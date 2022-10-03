import React from 'react';


const UserColumnInTable = (props) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
            <img 
                src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=S&username=${props.Mail || ' - '}`} 
                alt='' 
                style={{borderRadius: '50%', width: '40px', border: '2px solid rgb(255, 255, 255)'}}
            />

            <a 
                href={`https://salic.sharepoint.com/_layouts/15/me.aspx/?p=${props.Mail}&v=work`} 
                target='_blank'
            >
                {props.DisplayName || ' - '}
            </a>
        </div>
    )
}

export default UserColumnInTable