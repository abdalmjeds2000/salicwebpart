import { Avatar, Image } from "antd"

const SenderImg = (props) => {
    return (
        <Avatar
            src={
                <Image
                    src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${props.Email}`}
                    style={{minWidth: 32}}
                    title={props.Name || ''}
                    alt=''
                />
            }
            />
    )
}

export default SenderImg