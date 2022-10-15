import { Avatar, Image } from 'antd';
import React from 'react';


const UserColumnInTable = (props) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
            <Avatar
                src={
                <Image
                    src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${props.Mail}`}
                    style={{minWidth: 32}}
                />
                }
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