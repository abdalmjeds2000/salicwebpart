import React from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';

const icons = {
  PMSEmployee: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#fff" viewBox="0 0 60 70"><g><g xmlns="http://www.w3.org/2000/svg"><path d="m23 16c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5zm-8 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z" fill="#FFFFFF"  ></path><path d="m27 16c0-4.963-4.037-9-9-9s-9 4.037-9 9 4.037 9 9 9 9-4.037 9-9zm-16 0c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" fill="#FFFFFF"  ></path><path d="m59 35h-6v26h-2v-20h-6v20h-2v-14h-6v14h-2v-11.631c0-1.507-.204-2.974-.58-4.375l12.58-12.58 3 3 8-8 2.438 2.438 3.144-9.433-9.433 3.144 2.437 2.437-6.586 6.586-3-3-13.303 13.303c-1.923-4.618-5.853-8.238-10.865-9.684l-.756-3.021.228-1.827c.479-.166.943-.357 1.392-.573l2.173 1.689 5.604-5.604-1.689-2.173c.216-.448.407-.913.573-1.392l2.734-.342v-7.926l-2.734-.342c-.166-.479-.357-.943-.573-1.392l1.689-2.173-5.604-5.604-2.173 1.689c-.448-.216-.913-.407-1.392-.573l-.342-2.734h-7.926l-.342 2.734c-.479.166-.943.357-1.392.573l-2.173-1.689-5.602 5.606 1.689 2.173c-.216.448-.407.913-.573 1.392l-2.734.342v7.926l2.734.342c.166.479.357.943.573 1.392l-1.689 2.173 5.604 5.604 2.173-1.689c.448.216.913.407 1.392.573l.228 1.827-.756 3.021c-7.191 2.073-12.168 8.626-12.168 16.162v13.631h62v-2h-4zm1.419-11.419-.856 2.567-1.711-1.711zm-5.419 13.419h2v24h-2zm-8 6h2v18h-2zm-8 6h2v12h-2zm-6 .369v11.631h-3.969v-16h-2.063v16h-6.555l3.687-3.687-4.063-17.267.46-1.381 3.204 1.922.914-4.571c5.051 2.437 8.385 7.565 8.385 13.353zm-19.097-14.299 2.02 1.01-2.221 1.332-.431-2.155c.208-.068.419-.129.632-.187zm6.339-3.979.593 2.373-2.835 1.418-2.835-1.418.593-2.373zm2.487 4.166-.431 2.155-2.221-1.332 2.02-1.01c.213.058.424.119.632.187zm-4.729 1.909.742.445-.462 1.389h-.56l-.463-1.388zm-.208 3.834h.417l3.691 15.687-3.9 3.899-3.899-3.899zm-5.078-15.46-.63-.35-1.771 1.378-2.881-2.881 1.378-1.771-.35-.63c-.392-.705-.707-1.472-.938-2.278l-.199-.692-2.231-.278v-4.074l2.231-.278.199-.692c.231-.807.547-1.573.938-2.278l.35-.63-1.378-1.773 2.881-2.881 1.771 1.378.63-.35c.705-.392 1.472-.707 2.278-.938l.692-.199.278-2.231h4.074l.278 2.231.692.199c.807.231 1.573.547 2.278.938l.63.35 1.771-1.378 2.881 2.881-1.378 1.771.35.63c.392.705.707 1.472.938 2.278l.199.692 2.231.278v4.074l-2.231.278-.199.692c-.231.807-.547 1.573-.938 2.278l-.35.63 1.378 1.771-2.881 2.881-1.771-1.378-.63.35c-.705.392-1.472.707-2.278.938l-.692.199-.278 2.231h-4.074l-.278-2.231-.692-.199c-.806-.229-1.573-.544-2.278-.936zm-9.714 23.829c0-5.788 3.334-10.916 8.384-13.353l.914 4.571 3.204-1.922.46 1.381-4.063 17.267 3.687 3.687h-6.555v-16h-2.062v16h-3.969z" fill="#FFFFFF"  ></path><path d="m41 1h-6v6h6zm-2 4h-2v-2h2z" fill="#FFFFFF"  ></path><path d="m43 3.074h12v1.852h-12z" fill="#FFFFFF"  ></path><path d="m41 9h-6v6h6zm-2 4h-2v-2h2z" fill="#FFFFFF"  ></path><path d="m43 11.074h12v1.852h-12z" fill="#FFFFFF"  ></path><path d="m41 17h-6v6h6zm-2 4h-2v-2h2z" fill="#FFFFFF"  ></path><path d="m43 19.074h12v1.852h-12z" fill="#FFFFFF"  ></path></g></g></svg>,
  PMSManagers: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 511.611 511.611"><g><path xmlns="http://www.w3.org/2000/svg" d="m478.934 411.108h-3.164v-239.74c0-9.583-7.796-17.379-17.379-17.379h-11.093c13.18-14.438 25.602-29.569 37.163-45.34l4.947 3.665c3.889 2.881 9.007 3.358 13.36 1.243 4.353-2.113 7.144-6.432 7.284-11.268l1.553-53.57c.122-4.229-1.835-8.258-5.235-10.776s-7.823-3.214-11.832-1.865l-50.792 17.092c-4.585 1.542-7.903 5.469-8.658 10.248s1.191 9.538 5.08 12.42l8.13 6.022c-7.34 10.022-15.119 19.862-23.186 29.326-2.688 3.152-2.31 7.886.842 10.573 3.151 2.686 7.885 2.31 10.573-.843 9.947-11.669 19.469-23.894 28.301-36.334 2.363-3.33 1.629-7.938-1.651-10.368l-10.914-8.085 44.262-14.894-1.354 46.681-7.882-5.839c-1.618-1.199-3.651-1.701-5.64-1.381-1.989.315-3.768 1.418-4.936 3.059-49.2 69.144-115.076 126.264-190.508 165.188-75.489 38.953-160.287 59.542-245.227 59.542h-18.478c-4.136 0-7.5-3.364-7.5-7.5s3.364-7.5 7.5-7.5h18.48c70.416 0 138.957-13.992 203.719-41.589 64.271-27.387 121.461-66.722 169.981-116.91 2.879-2.979 2.799-7.726-.179-10.605-2.979-2.879-7.727-2.798-10.605.18-18.8 19.447-38.946 37.21-60.329 53.234-.036 0-.07-.005-.106-.005h-59.836c-9.583 0-17.379 7.796-17.379 17.378v30.269c-6.692 3.331-13.471 6.521-20.336 9.569v-10.646c0-9.583-7.796-17.379-17.378-17.379h-59.836c-9.583 0-17.378 7.796-17.378 17.379v41.966c-6.75 1.513-13.529 2.889-20.337 4.121v-22.295c0-9.583-7.796-17.379-17.378-17.379h-59.838c-9.583 0-17.378 7.796-17.378 17.379v30.333h-13.887c-12.407 0-22.5 10.094-22.5 22.5s10.093 22.5 22.5 22.5h13.886v77.623h-4.036c-17.463 0-31.67 14.207-31.67 31.669v20.552c0 7.102 5.778 12.88 12.88 12.88h484.164c7.102 0 12.88-5.778 12.88-12.88v-20.552c0-17.462-14.208-31.669-31.67-31.669zm-197.688-205.941c0-1.312 1.067-2.378 2.379-2.378h38.817c-13.302 8.93-27.044 17.219-41.196 24.863zm-114.93 29.193c0-1.312 1.067-2.379 2.378-2.379h59.836c1.312 0 2.378 1.067 2.378 2.379v17.02c-21.152 8.6-42.705 15.726-64.593 21.348v-38.368zm-112.551 21.413h59.836c1.312 0 2.378 1.067 2.378 2.379v24.775c-21.296 3.187-42.848 5.003-64.593 5.443v-30.219c0-1.311 1.067-2.378 2.379-2.378zm379.335-86.784h25.291c1.312 0 2.379 1.067 2.379 2.379v239.74h-64.594v-207.873c12.816-10.852 25.147-22.276 36.924-34.246zm-140.015 103.284c18.157-9.369 35.768-19.773 52.754-31.113v79.87c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-90.232c6.897-4.941 13.674-10.048 20.336-15.301v195.611h-20.335v-58.096c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v58.096h-64.594v-132.924c3.968-1.927 7.919-3.888 11.839-5.911zm-126.769 46.647c21.897-5.13 43.481-11.589 64.593-19.343v111.531h-64.593zm79.594-25.103c6.836-2.74 13.616-5.617 20.336-8.631v125.922h-20.336zm-194.524 39.556c21.611-.416 43.189-2.12 64.593-5.084v24.859c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-27.14c6.803-1.133 13.581-2.405 20.337-3.792v88.892h-20.337v-25.977c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v25.977h-64.593zm444.218 127.836h-479.924v-18.432c0-9.191 7.478-16.669 16.67-16.669h446.584c9.192 0 16.67 7.478 16.67 16.669z" fill="#FFFFFF"></path></g></svg>,
}
const services = [
  {icon: icons.PMSEmployee, bgColor: '#e91e63', text: 'Performance Management System (PMS)- Employee', href: 'https://hen.fa.em2.oraclecloud.com/fndSetup/faces/FuseOverview?fndGlobalItemNodeId=EXT_EXTN1521037485862_MENU_1558973037870'},
  {icon: icons.PMSManagers, bgColor: '#009688', text: 'Performance Management System (PMS)- Managers', href: 'https://hen.fa.em2.oraclecloud.com/fndSetup/faces/FuseOverview?fndGlobalItemNodeId=EXT_EXTN1521037485862_MENU_1558972767621'},
];


function Performance() {

  return (
    <>
      <HistoryNavigation>
        <p>Performance Management</p>
      </HistoryNavigation>
      <div className='services-page-container'>

        <div className="header">
          <h2>Performance Management</h2>
        </div>
        <div className='services-body-container'>
          <div className="services-boxs-container">
            {services.map((service, i) => {
              return ( 
                <a 
                  data-application-name={service.dataApplicationName}
                  target='_blank' 
                  className='box' 
                  key={i}
                  href={service.href} 
                >
                  <div style={{backgroundColor: service.bgColor}}>
                    {service.icon}
                  </div>
                  <h3>{service.text}</h3>
                </a>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default Performance