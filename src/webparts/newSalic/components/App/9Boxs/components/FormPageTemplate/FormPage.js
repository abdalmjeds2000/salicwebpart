import React from 'react'
import './FormPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'



function FormPageTemplate(props) {

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
                {
                  props.tips_userInfo?.map((a, i) => {
                    return (
                      <div key={i}>
                        <p><b>{a.title}</b></p>
                        <p>{a.text}</p>
                      </div>
                    )
                  })
                
                }
              </div>
              <div className="tips_user-info_img">
                <img 
                  src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${props.user_data.Data?.Mail}`} 
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