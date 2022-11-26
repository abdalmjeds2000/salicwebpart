import { Avatar, Image } from 'antd';
import React from 'react';


const UserColumnInTable = (props) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '7px'}}>
            {props.Mail && props.Mail.length > 0 && <Avatar
                src={
                <Image
                    src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${props.Mail}`}
                    preview={{src: `https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=L&username=${props.Mail}`,}}
                    style={{minWidth: 32}}
                />
                }
            />}
            {props.DisplayName && props.DisplayName.length > 0 && <a 
                href={`https://salic.sharepoint.com/_layouts/15/me.aspx/?p=${props.Mail}&v=work`} 
                target='_blank'
            >
                {props.DisplayName || ' - '}
            </a>}
        </div>
    )
}

export default UserColumnInTable