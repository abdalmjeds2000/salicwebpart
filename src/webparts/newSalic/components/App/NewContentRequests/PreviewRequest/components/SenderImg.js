const SenderImg = (props) => {
    return (
        <img 
            src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${props.Email}`}
            title={props.Name || ''}
            style={{borderRadius: '50%'}}
            alt='' 
        />
    )
}

export default SenderImg