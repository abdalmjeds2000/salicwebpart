import React, { useContext } from 'react'
import './FormPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { AppCtx } from '../../../App'



function FormPageTemplate(props) {
  const { user_data } = useContext(AppCtx);
  return (
    <div>
      <div className="content-services-request">
        <div className="header">
          <h1>{props.pageTitle}</h1>
        </div>
        
        <div className="content">
          <div className="form">{props.children}</div>
          <div className="tips">
            <div className="tips_user-info">
              <div className="tips_user-info_text">
                <div>
                  <p><b>{props.UserName || user_data.Data?.DisplayName}</b></p>
                  <p>{props.UserDept || user_data.Data?.Title}</p>
                </div>
                <div>
                  <p><b>Nationality</b></p>
                  <p>{props.UserNationality || user_data.Data?.Nationality || ' - '}</p>
                </div>
                <div>
                  <p><b>ID #</b></p>
                  <p>{parseInt(props.UserId, 10) || parseInt(user_data.Data?.PIN, 10) || ' - '}</p>
                </div>
              </div>
              <div className="tips_user-info_img">
                <img 
                  src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${props.Email || user_data.Data.Mail}`} 
                  alt="" 
                />
              </div>
            </div>

            <div className="tips_tips-container">
              <div className="tips_header">
                <FontAwesomeIcon icon={faLightbulb} /> Tips
              </div>
              <ul>
                {
                  props.tipsList?.map((t, i) => {
                    return (
                      <li key={i}>{t}</li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FormPageTemplate