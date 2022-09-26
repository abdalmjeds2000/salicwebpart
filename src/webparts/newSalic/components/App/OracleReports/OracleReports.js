import React, { useContext, useState } from 'react'
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation'
import './OracleReports.css'
import { AppCtx } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { message } from 'antd'

function OracleReports() {
  const { oracle_reports } = useContext(AppCtx);
  const [showHR, setShowHR] = useState(false)
  const [currentLinks, setCurrentLinks] = useState([])
  const [activeLink, setActiveLink] = useState('')
  

  return (
    <>
      <HistoryNavigation>
        <p>Oracle Reports</p>
      </HistoryNavigation>
      
      <div className='oracle-reports-container'>
        <div className='departments-container'>
          <ul className='departments'>
            {
              oracle_reports.children?.map((level0, i) => {
                return (
                  <li key={i} className='dep-root_L0'>
                    <a>
                      {level0.Text}
                    </a>
                    <ul>
                      {level0.children?.map((level1, i1) => {
                        return(
                          <li key={i1} className='dep-root_L1'>
                            <a onClick={() => {
                              setCurrentLinks(level1.children)
                              setActiveLink(level1.Text)
                              level1.Text === 'HR' ? setShowHR(!showHR) : null}}
                              style={activeLink === level1.Text ? {backgroundColor: '#d5e4fd', fontWeight: '500'} : {}}
                            >
                              {level1.Text}
                            </a>
                            <ul>
                              {level1.children?.map((level2, i2) => {
                                return (
                                  !level2.Link && showHR && <li key={i2} className='dep-root_L2'>
                                    <a onClick={() => {
                                        setCurrentLinks(level2.children)
                                        setActiveLink(level2.Text)
                                      }}
                                      style={activeLink === level2.Text ? {backgroundColor: '#d5e4fd', fontWeight: '500'} : {}}
                                    >
                                      {level2.Text}
                                    </a>
                                  </li>
                                )
                              })}
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>




        <div className='departments-content'>
        <h1>{activeLink || 'Reports'}</h1>

          <br /><hr /><br />

          <div className='links-container'>
            {
              currentLinks.map((link, i) => {
                return (
                  link.Link && 
                  <div className='box' key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25px" viewBox="0 0 515.283 515.283"><g><g xmlns="http://www.w3.org/2000/svg"><g><g><g><path d="m372.149 515.283h-286.268c-22.941 0-44.507-8.934-60.727-25.155s-25.153-37.788-25.153-60.726v-286.268c0-22.94 8.934-44.506 25.154-60.726s37.786-25.154 60.727-25.154h114.507c15.811 0 28.627 12.816 28.627 28.627s-12.816 28.627-28.627 28.627h-114.508c-7.647 0-14.835 2.978-20.241 8.384s-8.385 12.595-8.385 20.242v286.268c0 7.647 2.978 14.835 8.385 20.243 5.406 5.405 12.594 8.384 20.241 8.384h286.267c7.647 0 14.835-2.978 20.242-8.386 5.406-5.406 8.384-12.595 8.384-20.242v-114.506c0-15.811 12.817-28.626 28.628-28.626s28.628 12.816 28.628 28.626v114.507c0 22.94-8.934 44.505-25.155 60.727-16.221 16.22-37.788 25.154-60.726 25.154zm-171.76-171.762c-7.327 0-14.653-2.794-20.242-8.384-11.179-11.179-11.179-29.306 0-40.485l237.397-237.398h-102.648c-15.811 0-28.626-12.816-28.626-28.627s12.815-28.627 28.626-28.627h171.761c3.959 0 7.73.804 11.16 2.257 3.201 1.354 6.207 3.316 8.837 5.887.001.001.001.001.002.002.019.019.038.037.056.056.005.005.012.011.017.016.014.014.03.029.044.044.01.01.019.019.029.029.011.011.023.023.032.032.02.02.042.041.062.062.02.02.042.042.062.062.011.01.023.023.031.032.011.01.019.019.029.029.016.015.03.029.044.045.005.004.012.011.016.016.019.019.038.038.056.057 0 .001.001.001.002.002 2.57 2.632 4.533 5.638 5.886 8.838 1.453 3.43 2.258 7.2 2.258 11.16v171.761c0 15.811-12.817 28.627-28.628 28.627s-28.626-12.816-28.626-28.627v-102.648l-237.4 237.399c-5.585 5.59-12.911 8.383-20.237 8.383z" fill="#0C508C"   ></path></g></g></g></g></g></svg>
                    <a href={link.Link} target="_blank">{link.Text}</a>
                    <span onClick={() => {
                      navigator.clipboard.writeText(link.Link)
                      message.success("Link copied")
                    }}>
                      <FontAwesomeIcon icon={faCopy} />
                    </span>
                  </div>
                )
              })
            }
            {
              currentLinks.length === 0 
              ? <span style={{color: '#aaa', fontStyle: 'italic'}}>
                  Please, Select Department.
                </span> 
              : ''
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default OracleReports