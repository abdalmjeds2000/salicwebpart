import React, { useContext } from "react";
import HistoryNavigation from "../../../../Global/HistoryNavigation/HistoryNavigation";
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../App'
import ServicesSection from "../../../../Global/ServicesSection/ServicesSection";
import ProtectRouteResearch from "../../../../../Routers/ProtectRoutes/ProtectRouteResearch";


function ManageDashboardData() {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();
  const srvsIcons = {
    servicesRequest: <svg id="Group_315" data-name="Group 315" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path id="Path_5000" data-name="Path 5000" d="M39.355,10.968H37.108a10.811,10.811,0,0,0-1.293-3.132L37.4,6.249a.645.645,0,0,0,0-.912L34.663,2.6a.664.664,0,0,0-.912,0L32.165,4.186a10.843,10.843,0,0,0-3.132-1.293V.645A.645.645,0,0,0,28.387,0H24.516a.645.645,0,0,0-.645.645V2.892a10.814,10.814,0,0,0-3.132,1.293L19.153,2.6a.645.645,0,0,0-.912,0L15.5,5.337a.645.645,0,0,0,0,.912L17.09,7.835A10.811,10.811,0,0,0,15.8,10.968H13.548a.645.645,0,0,0-.645.645V12.9H3.226A1.938,1.938,0,0,0,1.29,14.839v18.71H.645A.645.645,0,0,0,0,34.194v2.581A3.23,3.23,0,0,0,3.226,40H31.613a3.23,3.23,0,0,0,3.226-3.226V34.194a.645.645,0,0,0-.645-.645h-.645V24.295l.2.2a.645.645,0,0,0,.912,0L37.4,21.76a.645.645,0,0,0,0-.912l-1.586-1.586a10.811,10.811,0,0,0,1.293-3.132h2.248A.645.645,0,0,0,40,15.484V11.613A.645.645,0,0,0,39.355,10.968ZM33.548,36.774a1.938,1.938,0,0,1-1.935,1.935H3.226A1.938,1.938,0,0,1,1.29,36.774V34.839H9.032v.645a1.938,1.938,0,0,0,1.935,1.935h12.9a1.938,1.938,0,0,0,1.935-1.935v-.645h7.742ZM10.323,34.839H24.516v.645a.646.646,0,0,1-.645.645h-12.9a.646.646,0,0,1-.645-.645Zm21.935-1.29H2.581V14.839a.646.646,0,0,1,.645-.645H12.9v1.29a.645.645,0,0,0,.645.645H15.8a10.811,10.811,0,0,0,1.293,3.132L15.5,20.848a.645.645,0,0,0,0,.912L18.24,24.5a.664.664,0,0,0,.912,0l1.586-1.586A10.811,10.811,0,0,0,23.87,24.2v2.247a.645.645,0,0,0,.645.645h3.871a.645.645,0,0,0,.645-.645V24.2a10.814,10.814,0,0,0,3.132-1.293l.095.094Zm6.452-18.71H36.586a.645.645,0,0,0-.634.525,9.578,9.578,0,0,1-1.5,3.623.644.644,0,0,0,.077.819l1.5,1.5-1.825,1.825-1.5-1.5a.647.647,0,0,0-.819-.077,9.577,9.577,0,0,1-3.623,1.5.645.645,0,0,0-.525.634v2.123H25.161V23.683a.645.645,0,0,0-.525-.634,9.579,9.579,0,0,1-3.623-1.5.646.646,0,0,0-.819.077l-1.5,1.5L16.872,21.3l1.5-1.5a.644.644,0,0,0,.077-.819,9.569,9.569,0,0,1-1.5-3.623.646.646,0,0,0-.634-.525H14.194V12.258h2.123a.645.645,0,0,0,.634-.525,9.578,9.578,0,0,1,1.5-3.623.644.644,0,0,0-.077-.819l-1.5-1.5L18.7,3.968l1.5,1.5a.645.645,0,0,0,.819.077,9.577,9.577,0,0,1,3.623-1.5.645.645,0,0,0,.525-.634V1.29h2.581V3.414a.645.645,0,0,0,.525.634,9.579,9.579,0,0,1,3.623,1.5.644.644,0,0,0,.819-.077l1.5-1.5,1.825,1.825-1.5,1.5a.644.644,0,0,0-.077.819,9.569,9.569,0,0,1,1.5,3.623.646.646,0,0,0,.634.525H38.71Z" fill="#fff"/><path id="Path_5001" data-name="Path 5001" d="M232.387,64a8.387,8.387,0,1,0,8.387,8.387A8.4,8.4,0,0,0,232.387,64Zm-.645,15.451V76.115a.645.645,0,0,0-.422-.605,3.383,3.383,0,0,1-2.159-3.191,3.452,3.452,0,0,1,1.29-2.71v2.71a.65.65,0,0,0,.179.447l1.29,1.344a.665.665,0,0,0,.931,0l1.29-1.344a.648.648,0,0,0,.18-.447v-2.71a3.452,3.452,0,0,1,1.29,2.71,3.383,3.383,0,0,1-2.159,3.191.645.645,0,0,0-.422.605v3.336c-.213.019-.427.033-.645.033S231.955,79.47,231.742,79.451Zm2.581-.242v-2.67a4.739,4.739,0,0,0-.422-8.628.645.645,0,0,0-.869.605v3.542l-.645.671-.645-.671V68.516a.645.645,0,0,0-.869-.605,4.739,4.739,0,0,0-.422,8.628v2.67a7.1,7.1,0,1,1,3.871,0Z" transform="translate(-205.935 -58.839)" fill="#fff"/><path id="Path_5002" data-name="Path 5002" d="M73.806,207.484H49.29V193.29h6.452V192h-7.1a.645.645,0,0,0-.645.645v15.484a.645.645,0,0,0,.645.645H74.452a.645.645,0,0,0,.645-.645V204.9h-1.29Z" transform="translate(-44.129 -176.516)" fill="#fff"/></svg>,
  }
  const services = [
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/research-articles', bgColor: '#55b8a9', text: 'Research Reports'},
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/research-news', bgColor: '#ad85f3', text: 'News'},
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/research-pulse', bgColor: '#ff8084', text: 'Pulse'},
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/research-country', bgColor: '#4f6bed', text: 'Country Outlook'},
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/commodity-prices', bgColor: '#ffaa66', text: 'Commodity Prices'},
    {icon: srvsIcons.servicesRequest, isLink: false, to: '/manage-research-library/knowledge-center', bgColor: '#0088ff', text: 'Knowledge Center'},
  ];


  return (
    <ProtectRouteResearch>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-library')}>Research Library</a>
        <p>Manage Research Library Content</p>
      </HistoryNavigation>

      <div className='standard-page'>
        <ServicesSection
          title="Manage Research Library Content"
          headerIcon={<div style={{backgroundColor: '#897ED4'}}>{srvsIcons.servicesRequest}</div>}
          items={services}
        />
      </div>
    </ProtectRouteResearch>
  )
}

export default ManageDashboardData