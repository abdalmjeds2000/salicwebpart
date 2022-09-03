import * as React from 'react';
import './SidebarNav.scss';
import { SidebarNavProps } from './SidebarNavProps';
import { NavLink } from 'react-router-dom';
import { AppCtx } from '../App';


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
const SidebarNav: React.FunctionComponent<SidebarNavProps> = () => {
  const svgIcons = {
    home: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="35px" viewBox="0 0 512.004 512.004"><g><path xmlns="http://www.w3.org/2000/svg" d="m448.897 312.242c-37.286-19.766-88.483-33.248-144.693-38.162l1.297-15.564c11.991-3.931 20.675-15.229 20.675-28.517v-80c0-26.888-15.239-50.284-37.533-62.005 34.966-29.6 13.916-87.993-32.467-87.994-46.383.002-67.433 58.402-32.466 87.995-22.294 11.721-37.533 35.116-37.533 62.005v80c0 13.288 8.684 24.586 20.674 28.517l1.297 15.564c-80.408 7.485-202.675 37.704-207.974 117.919 6.84 92.453 165.16 120.206 256.001 120.003 67.087-.001 130.313-11.753 178.032-33.091 95.279-40.586 105.959-119.348 14.69-166.67zm-232.686 58.588c1.385 16.629 14.267 29.17 29.965 29.17h20.001c15.698 0 28.58-12.541 29.965-29.169l2.578-30.938c60.94 6.996 97.082 27.482 97.082 44.045-5.768 34.915-99.486 47.389-139.625 46.437-40.054.985-133.959-11.579-139.627-46.437.001-16.563 36.143-37.049 97.083-44.045zm9.966-320.83c0-16.542 13.458-30 30-30 39.744 1.508 39.734 58.498 0 60-16.542 0-30-13.458-30-30zm-20 180v-80c2.504-66.216 97.487-66.245 100 .001 0-.001 0 80 0 80 0 5.514-4.486 10-10 10-5.201 0-9.534 3.987-9.965 9.169l-10 120c-.449 5.382-4.039 10.83-10.034 10.83h-20.001c-5.995 0-9.586-5.448-10.034-10.831l-10-120c-.432-5.183-4.765-9.169-9.965-9.169-5.516 0-10.001-4.486-10.001-10zm219.866 230.655c-88.556 41.486-251.179 41.487-339.733-.002-42.029-18.792-66.134-43.815-66.134-68.651 5.507-64.896 121.706-92.119 189.634-97.99l2.162 25.941c-30.857 3.483-57.694 10.423-77.968 20.195-60.106 29.975-42.822 72.629 12.843 93.054 57.627 22.727 161.036 22.728 218.662 0 55.724-20.444 72.902-63.098 12.843-93.055-20.275-9.771-47.112-16.71-77.968-20.194l2.162-25.941c53.558 4.687 102.025 17.369 136.986 35.902 76.978 40.215 65.919 95.851-13.489 130.741z" fill="#FFFFFF"    ></path></g></svg>,
    communication: <svg id="Iconly_Light_Calling" data-name="Iconly/Light/Calling" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
                      <g id="Calling" transform="translate(3.646 3.646)">
                        <path id="Stroke_1" data-name="Stroke 1" d="M.715,3.461C1.176,2.7,3.719-.082,5.531,0A2.4,2.4,0,0,1,6.942.755h0c.893.875,3.454,4.175,3.6,4.87.355,1.7-1.677,2.687-1.056,4.4A14.4,14.4,0,0,0,17.68,18.22c1.716.623,2.7-1.408,4.4-1.054.695.145,4,2.7,4.871,3.6h0a2.39,2.39,0,0,1,.753,1.411c.067,1.909-2.883,4.487-3.458,4.816-1.357.972-3.127.954-5.286-.049C12.941,24.437,3.316,14.995.764,8.745-.213,6.6-.279,4.817.715,3.461Z" transform="translate(0 0)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                        <path id="Path" d="M0,0A11.624,11.624,0,0,1,10.268,10.255" transform="translate(17.595 0.365)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                        <path id="Path-2" data-name="Path" d="M0,0A6.454,6.454,0,0,1,5.1,5.1" transform="translate(17.595 5.531)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                      </g>
                    </svg>,
    news: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="35px" viewBox="0 0 442 442" fill="#FFFFFF">
            <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="M171,336H70c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.523,0,10-4.477,10-10S176.523,336,171,336z" fill="#FFFFFF"    ></path>
              <path d="M322,336H221c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.522,0,10-4.477,10-10S327.522,336,322,336z" fill="#FFFFFF"    ></path>
              <path d="M322,86H70c-5.523,0-10,4.477-10,10s4.477,10,10,10h252c5.522,0,10-4.477,10-10S327.522,86,322,86z" fill="#FFFFFF"    ></path>
              <path d="M322,136H221c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.522,0,10-4.477,10-10S327.522,136,322,136z" fill="#FFFFFF"    ></path>
              <path d="M322,186H221c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.522,0,10-4.477,10-10S327.522,186,322,186z" fill="#FFFFFF"    ></path>
              <path d="M322,236H221c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.522,0,10-4.477,10-10S327.522,236,322,236z" fill="#FFFFFF"    ></path>
              <path d="M322,286H221c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.522,0,10-4.477,10-10S327.522,286,322,286z" fill="#FFFFFF"    ></path>
              <path d="M171,286H70c-5.523,0-10,4.477-10,10s4.477,10,10,10h101c5.523,0,10-4.477,10-10S176.523,286,171,286z" fill="#FFFFFF"    ></path>
              <path d="M422,76h-30V46c0-11.028-8.972-20-20-20H20C8.972,26,0,34.972,0,46v320c0,27.57,22.43,50,50,50h342c27.57,0,50-22.43,50-50   V96C442,84.972,433.028,76,422,76z M422,366c0,16.542-13.458,30-30,30H50c-16.542,0-30-13.458-30-30V46h352v305   c0,13.785,11.215,25,25,25c5.522,0,10-4.477,10-10s-4.478-10-10-10c-2.757,0-5-2.243-5-5V96h30V366z" fill="#FFFFFF"    ></path>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            </g>
          </svg>,
    almira: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="35px"  viewBox="0 0 511.999 511.999" fill="#fff"><g><g xmlns="http://www.w3.org/2000/svg"><path d="m312.506 174.017c-8.057 1.93-13.023 10.025-11.094 18.081 1.93 8.057 10.027 13.024 18.081 11.094 19.481-4.666 38.661-7.032 57.006-7.032 18.346 0 37.525 2.366 57.005 7.032 1.175.281 2.35.416 3.506.416 6.779 0 12.927-4.628 14.575-11.509 1.93-8.057-3.037-16.152-11.093-18.082-21.767-5.213-43.297-7.857-63.994-7.857-20.694 0-42.225 2.644-63.992 7.857z" fill="#FFFFFF" data-original="#000000"></path><path d="m440.493 234.02c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.643-63.994 7.856c-8.056 1.929-13.023 10.024-11.094 18.081 1.929 8.056 10.025 13.025 18.081 11.094 19.482-4.665 38.662-7.031 57.006-7.031 18.345 0 37.524 2.366 57.006 7.031 1.174.281 2.349.416 3.506.416 6.779 0 12.927-4.627 14.575-11.51 1.93-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m440.493 294.023c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.643-63.994 7.856c-8.056 1.929-13.023 10.024-11.094 18.081 1.929 8.056 10.025 13.026 18.081 11.094 19.482-4.665 38.662-7.031 57.006-7.031 18.345 0 37.524 2.366 57.006 7.031 1.174.281 2.349.416 3.506.416 6.779 0 12.927-4.627 14.575-11.51 1.93-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m440.493 354.026c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.644-63.994 7.856c-8.056 1.929-13.023 10.025-11.094 18.081s10.025 13.022 18.081 11.094c19.482-4.665 38.662-7.031 57.006-7.031 18.345 0 37.524 2.366 57.006 7.031 1.174.281 2.349.416 3.506.416 6.779 0 12.927-4.628 14.575-11.51 1.93-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m71.506 174.017c-8.057 1.93-13.023 10.025-11.094 18.081 1.93 8.057 10.029 13.024 18.081 11.094 19.481-4.666 38.661-7.032 57.006-7.032 18.346 0 37.525 2.366 57.005 7.032 1.175.281 2.35.416 3.506.416 6.779 0 12.927-4.628 14.575-11.509 1.93-8.057-3.037-16.152-11.093-18.082-21.767-5.213-43.297-7.857-63.994-7.857-20.694 0-42.225 2.644-63.992 7.857z" fill="#FFFFFF" data-original="#000000"></path><path d="m199.493 234.02c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.643-63.994 7.856c-8.056 1.929-13.023 10.024-11.094 18.081 1.929 8.056 10.021 13.025 18.081 11.094 19.482-4.665 38.662-7.031 57.006-7.031s37.524 2.366 57.006 7.031c1.174.281 2.35.416 3.506.416 6.779 0 12.927-4.627 14.575-11.51 1.931-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m199.493 294.023c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.643-63.994 7.856c-8.056 1.929-13.023 10.024-11.094 18.081 1.929 8.055 10.021 13.026 18.081 11.094 19.482-4.665 38.662-7.031 57.006-7.031s37.524 2.366 57.006 7.031c1.174.281 2.35.416 3.506.416 6.779 0 12.927-4.627 14.575-11.51 1.931-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m199.493 354.026c-21.768-5.213-43.298-7.856-63.993-7.856s-42.226 2.644-63.994 7.856c-8.056 1.929-13.023 10.025-11.094 18.081s10.021 13.025 18.081 11.094c19.482-4.665 38.662-7.031 57.006-7.031s37.524 2.366 57.006 7.031c1.174.281 2.35.416 3.506.416 6.779 0 12.927-4.628 14.575-11.51 1.931-8.057-3.037-16.152-11.093-18.081z" fill="#FFFFFF" data-original="#000000"></path><path d="m504.101 131.945c-.857-.46-8.877-4.711-22.104-9.915v-51.207c0-5.974-3.545-11.378-9.025-13.758-1.433-.623-35.789-15.241-96.473-15.241-60.613 0-94.207 27.211-111.714 50.038-3.371 4.396-6.275 8.796-8.786 13.071-2.51-4.275-5.414-8.676-8.785-13.071-17.507-22.827-51.101-50.038-111.714-50.038-60.684 0-95.041 14.619-96.473 15.241-5.479 2.38-9.024 7.784-9.024 13.758v51.207c-13.228 5.203-21.248 9.455-22.104 9.915-4.865 2.615-7.899 7.69-7.899 13.212v310.015c0 5.27 2.775 10.149 7.295 12.859 4.519 2.71 10.14 2.845 14.789.362.51-.272 51.693-27.222 113.416-27.222s112.906 26.95 113.397 27.212c2.26 1.214 4.692 1.791 7.089 1.791h.013v-.017c2.432.001 4.868-.581 7.084-1.764.51-.272 51.693-27.222 113.416-27.222 61.516 0 112.562 26.769 113.409 27.218 2.218 1.189 4.655 1.782 7.09 1.782 2.667 0 5.331-.711 7.697-2.125 4.53-2.708 7.304-7.597 7.304-12.875v-310.014c0-5.522-3.034-10.597-7.898-13.212zm-127.601-60.121c36.881 0 62.761 5.93 75.498 9.704v30.444c-21.082-5.902-47.142-10.815-75.498-10.815-36.835 0-69.793 8.287-92.994 16.268 1.521-2.41 3.207-4.859 5.084-7.306 19.49-25.411 49.067-38.295 87.91-38.295zm-316.498 9.706c12.76-3.782 38.633-9.706 75.498-9.706 52.768 0 79.698 24.482 93.121 45.646-23.208-7.995-56.218-16.313-93.121-16.313-28.356 0-54.416 4.912-75.498 10.815zm180.998 350.517c-22.898-9.009-61.419-20.875-105.499-20.875-44.07 0-82.598 11.864-105.5 20.873v-277.439c16.713-7.477 57.983-23.448 105.5-23.448 47.522 0 88.79 15.974 105.499 23.449zm240.999-.002c-22.902-9.008-61.43-20.873-105.499-20.873-44.07 0-82.598 11.864-105.5 20.873v-277.44c16.713-7.476 57.983-23.448 105.5-23.448 47.524 0 88.8 15.977 105.499 23.447z" fill="#FFFFFF" data-original="#000000"></path></g></g></svg>,
    
  }
  let listItems = [
    {to: '/home', icon: svgIcons.home, text: <p>Home</p>}, 
    {to: '/community-news', icon: svgIcons.news, text: <p>Salic News</p>},
  ];
  let activeStyle = {
    borderLeft: "4px solid var(--second-color)",
    padding: '7px'
  };

  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [isNavBarLarge, setIsNavBarLarge] = React.useState(false);
  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const appContext = React.useContext(AppCtx);

  return (
    <nav 
      className={isNavBarLarge? "nav-container nav-container-large" : "nav-container nav-container-small"} 
      style={(windowSize.innerWidth < 800 && !isNavBarLarge) ? {padding: 0} : {}}
    >
      <div onClick={() => setIsNavBarLarge(!isNavBarLarge)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25">
          <g id="Group_763" data-name="Group 763" transform="translate(-25 -35)">
            <g id="Rectangle_448" data-name="Rectangle 448" transform="translate(25 57)" fill="#fff" stroke="#0c508c" stroke-width="0.5">
              <rect width="26" height="3" rx="1.5" stroke="none"/>
              <rect x="0.25" y="0.25" width="25.5" height="2.5" rx="1.25" fill="none"/>
            </g>
            <g id="Rectangle_449" data-name="Rectangle 449" transform="translate(25 46)" fill="#fff" stroke="#0c508c" stroke-width="0.5">
              <rect width="26" height="3" rx="1.5" stroke="none"/>
              <rect x="0.25" y="0.25" width="25.5" height="2.5" rx="1.25" fill="none"/>
            </g>
            <g id="Rectangle_450" data-name="Rectangle 450" transform="translate(25 35)" fill="#fff" stroke="#0c508c" stroke-width="0.5">
              <rect width="26" height="3" rx="1.5" stroke="none"/>
              <rect x="0.25" y="0.25" width="25.5" height="2.5" rx="1.25" fill="none"/>
            </g>
          </g>
        </svg>
      </div>

      <ul style={(windowSize.innerWidth < 800 && !isNavBarLarge) ? {display: 'none'} : {}}>

        {listItems.map((item, i) => {
          return <li key={i}>
            <NavLink
              to={item.to} 
              className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
              style={({ isActive }) => isActive ? activeStyle : {opacity: "0.7"} }
            >
              {item.icon}
              {isNavBarLarge && item.text}
            </NavLink>
          </li>
        })}



        <li>
          <a 
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={{fontSize: '1.05rem', opacity: '0.7'}} 
            href="https://www.salic.com"
            target='_blank'
          >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill='#fff' width='35px' viewBox="0 0 97.385 97.385"><g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M97.265,71.261c-0.093-0.108-0.23-0.172-0.374-0.172H0.494c-0.144,0-0.28,0.063-0.374,0.172    c-0.094,0.108-0.136,0.253-0.115,0.396c0.014,0.09,1.468,9.016,12.753,9.016h71.869c11.284,0,12.738-8.926,12.753-9.016    C97.4,71.514,97.358,71.369,97.265,71.261z M55.942,77.547h-14.5v-3.334h14.5V77.547z" fill="#FFFFFF"    ></path>
                    <path d="M10.507,67.619h76.37c1.104,0,2-0.896,2-2V18.713c0-1.104-0.896-2-2-2h-76.37c-1.104,0-2,0.896-2,2v46.906    C8.507,66.723,9.403,67.619,10.507,67.619z M15.507,23.713h66.37v36.906h-66.37V23.713z" fill="#FFFFFF"    ></path>
                  </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
              </g>
            </svg>
            {isNavBarLarge && 'SALIC Website'}
          </a>
        </li>

        <li>
          <a 
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={{fontSize: '1.05rem', opacity: '0.7'}} 
            href="https://hen.fa.em2.oraclecloud.com/fscmUI/adfAuthentication?level=FORM&success_url=%2FfscmUI%2FadfAuthentication"
            target='_blank'
          >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill='#fff' width='35px' viewBox="0 0 511.999 511.999">
              <g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M437.019,74.981C388.667,26.628,324.38,0,256,0C187.62,0,123.332,26.628,74.981,74.98C26.628,123.332,0,187.62,0,256    s26.628,132.667,74.981,181.019C123.332,485.371,187.62,511.999,256,511.999c68.381,0,132.667-26.628,181.02-74.981    c48.351-48.351,74.98-112.639,74.98-181.019S485.371,123.332,437.019,74.981z M96.216,96.216    c22.511-22.511,48.938-39.681,77.742-50.888c-7.672,9.578-14.851,20.587-21.43,32.969c-7.641,14.38-14.234,30.173-19.725,47.042    c-19.022-3.157-36.647-7.039-52.393-11.595C85.345,107.678,90.61,101.822,96.216,96.216z M62.229,139.585    c18.417,5.897,39.479,10.87,62.461,14.809c-6.4,27.166-10.167,56.399-11.066,86.591H30.536    C32.896,204.752,43.778,170.172,62.229,139.585z M60.594,369.638c-17.455-29.899-27.769-63.481-30.059-98.623h83.146    c0.982,29.329,4.674,57.731,10.858,84.186C101.085,359.003,79.494,363.85,60.594,369.638z M96.216,415.784    c-6.38-6.381-12.322-13.081-17.831-20.055c16.323-4.526,34.571-8.359,54.214-11.433c5.53,17.103,12.194,33.105,19.928,47.662    c7.17,13.493,15.053,25.349,23.51,35.505C146.427,456.28,119.268,438.834,96.216,415.784z M240.984,478.115    c-22.808-6.389-44.384-27.217-61.936-60.249c-6.139-11.552-11.531-24.155-16.15-37.587c24.73-2.722,51.045-4.331,78.086-4.709    V478.115z M240.984,345.537c-29.988,0.409-59.217,2.292-86.59,5.507c-6.038-24.961-9.671-51.978-10.668-80.028h97.259V345.537z     M240.984,240.984h-97.315c0.911-28.834,4.602-56.605,10.828-82.201c27.198,3.4,56.366,5.468,86.487,6.06V240.984z     M240.984,134.808c-27.146-0.547-53.403-2.317-77.958-5.205c4.591-13.292,9.941-25.768,16.022-37.215    c17.551-33.032,39.128-53.86,61.936-60.249V134.808z M450.717,141.18c17.874,30.193,28.427,64.199,30.749,99.804h-83.088    c-0.889-29.844-4.584-58.749-10.85-85.647C410.661,151.601,431.984,146.848,450.717,141.18z M415.783,96.216    c6.029,6.029,11.661,12.349,16.914,18.91c-16.073,4.389-33.972,8.114-53.204,11.112c-5.548-17.208-12.243-33.305-20.02-47.941    c-6.579-12.382-13.758-23.391-21.43-32.969C366.845,56.535,393.273,73.705,415.783,96.216z M271.016,271.016h97.259    c-1.004,28.268-4.686,55.49-10.81,80.612c-27.194-3.381-56.349-5.43-86.449-6.006V271.016z M271.016,240.984v-76.041    c30.005-0.394,59.257-2.261,86.656-5.464c6.125,25.403,9.756,52.932,10.659,81.505H271.016z M271.014,32.139h0.001    c22.808,6.389,44.384,27.217,61.936,60.249c6.178,11.627,11.601,24.318,16.24,37.848c-24.763,2.712-51.108,4.309-78.177,4.674    V32.139z M271.016,478.115V375.657c27.12,0.532,53.357,2.286,77.903,5.156c-4.579,13.232-9.911,25.654-15.967,37.053    C315.4,450.898,293.824,471.726,271.016,478.115z M415.783,415.784c-23.051,23.051-50.21,40.496-79.821,51.678    c8.457-10.156,16.34-22.011,23.51-35.504c7.62-14.341,14.198-30.088,19.68-46.906c19.465,3.213,37.473,7.186,53.515,11.859    C427.424,403.457,421.801,409.765,415.783,415.784z M450.606,371.009c-18.635-5.991-40-11.032-63.326-15.01    c6.296-26.68,10.048-55.36,11.041-84.983h83.146C479.139,306.694,468.549,340.769,450.606,371.009z" fill="#FFFFFF"></path>
                  </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
              </g>
            </svg>
            {isNavBarLarge && 'Oracle ERP'}
          </a>
        </li>

        <li>
          <NavLink 
            to='/oracle-reports'
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={({ isActive }) => isActive ? activeStyle : {opacity: "0.7"} }
          >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="35px" viewBox="0 0 512 512">
              <g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M414,28.055h-56.325C342.812,10.889,320.908,0,296.5,0h-81c-24.408,0-46.312,10.889-61.175,28.055H98   c-24.813,0-45,20.227-45,45.088v393.769C53,491.773,73.187,512,98,512h316c24.813,0,45-20.227,45-45.088V73.143   C459,48.281,438.813,28.055,414,28.055z M215.5,30.059h81c23.177,0,42.425,15.515,48.75,36.07H166.75   C173.064,45.61,192.287,30.059,215.5,30.059z M429,466.912c0,8.287-6.729,15.029-15,15.029H98c-8.271,0-15-6.742-15-15.029V73.143   c0-8.287,6.729-15.029,15-15.029h39.846c-2.165,7.31-3.346,15.04-3.346,23.045c0,8.3,6.716,15.029,15,15.029h213   c8.284,0,15-6.729,15-15.029c0-8.005-1.181-15.735-3.346-23.045H414c8.271,0,15,6.742,15,15.029V466.912z" fill="#FFFFFF"  ></path>
                  <path d="M182.06,298.644L160,320.746l-5.394-5.404c-5.857-5.87-15.355-5.87-21.213,0c-5.858,5.869-5.858,15.385,0,21.254l16,16.031   c5.857,5.869,15.355,5.87,21.213,0l32.666-32.73c5.858-5.869,5.858-15.385,0-21.254   C197.415,292.774,187.917,292.774,182.06,298.644z" fill="#FFFFFF"  ></path>
                  <path d="M367,310.607H246c-8.284,0-15,6.729-15,15.029c0,8.3,6.716,15.029,15,15.029h121c8.284,0,15-6.729,15-15.029   C382,317.336,375.284,310.607,367,310.607z" fill="#FFFFFF"  ></path>
                  <path d="M182.06,384.812L160,406.914l-5.394-5.404c-5.857-5.87-15.355-5.87-21.213,0c-5.858,5.869-5.858,15.385,0,21.254l16,16.031   c5.857,5.869,15.355,5.87,21.213,0l32.666-32.73c5.858-5.869,5.858-15.385,0-21.254   C197.415,378.942,187.917,378.942,182.06,384.812z" fill="#FFFFFF"  ></path>
                  <path d="M367,396.775H246c-8.284,0-15,6.729-15,15.029c0,8.3,6.716,15.029,15,15.029h121c8.284,0,15-6.729,15-15.029   C382,403.504,375.284,396.775,367,396.775z" fill="#FFFFFF"  ></path>
                  <path d="M284.606,241.077L331,194.593v1.791c0,8.3,6.716,15.029,15,15.029s15-6.729,15-15.029c0-42.513,0.07-38.555-0.172-40.234   c-1.061-7.353-7.353-12.872-14.833-12.87H308c-8.284,0-15,6.729-15,15.029c0,8.3,6.716,15.029,15,15.029h1.787L274,209.195   l-45.394-45.482c-5.857-5.87-15.355-5.87-21.213,0l-54,54.106c-5.858,5.869-5.858,15.385,0,21.254c5.857,5.87,15.355,5.87,21.213,0   L218,195.595l45.394,45.482C269.25,246.946,278.749,246.947,284.606,241.077z" fill="#FFFFFF"  ></path>
                </g>
              </g>
            </svg>
            {isNavBarLarge && 'Oracle Reports'}
          </NavLink>
        </li>


        <li>
          <a 
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={{fontSize: '1.05rem', opacity: '0.7'}} 
            href="https://hen.fa.em2.oraclecloud.com/fscmUI/adfAuthentication?level=FORM&success_url=%2FfscmUI%2FadfAuthentication"
            target='_blank'
          >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill='#fff' width='35px' viewBox="0 0 512 512">
              <g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <g>
                      <path d="M116,256c0-37.42,14.562-72.6,41.005-99.059c7.811-7.816,7.811-20.488,0-28.303c-7.81-7.817-20.473-7.817-28.284-0.001     C94.723,162.657,76,207.888,76,256s18.723,93.343,52.721,127.363c7.81,7.815,20.473,7.815,28.284-0.001     c7.811-7.815,7.811-20.487,0-28.303C130.562,328.6,116,293.42,116,256z" fill="#FFFFFF"    ></path>
                      <path d="M40,256c0-57.734,22.468-112.012,63.264-152.835c7.811-7.816,7.811-20.488,0-28.304c-7.811-7.815-20.474-7.815-28.284,0     C26.628,123.246,0,187.575,0,256s26.628,132.754,74.981,181.139c7.809,7.814,20.473,7.816,28.284,0     c7.811-7.816,7.811-20.488,0-28.304C62.468,368.012,40,313.734,40,256z" fill="#FFFFFF"    ></path>
                      <path d="M256,151.932c-57.346,0-104,46.685-104,104.068s46.654,104.068,104,104.068S360,313.383,360,256     S313.346,151.932,256,151.932z M256,320.042c-35.29,0-64-28.729-64-64.042s28.71-64.042,64-64.042c35.29,0,64,28.729,64,64.042     S291.29,320.042,256,320.042z" fill="#FFFFFF"    ></path>
                      <path d="M437.018,74.861c-7.81-7.816-20.473-7.815-28.284,0.001c-7.811,7.816-7.81,20.487,0.001,28.303     C449.532,143.988,472,198.266,472,256s-22.468,112.012-63.264,152.835c-7.811,7.816-7.812,20.487-0.001,28.303     c7.808,7.814,20.471,7.819,28.284,0.001C485.371,388.754,512,324.425,512,256S485.371,123.246,437.018,74.861z" fill="#FFFFFF"    ></path>
                      <path d="M383.278,128.637c-7.81-7.816-20.473-7.815-28.284,0.001c-7.811,7.816-7.81,20.487,0.001,28.303     C381.437,183.4,396,218.58,396,256c0,37.42-14.562,72.6-41.005,99.059c-7.811,7.816-7.812,20.487-0.001,28.303     c7.808,7.814,20.471,7.819,28.284,0.001C417.276,349.343,436,304.112,436,256S417.276,162.657,383.278,128.637z" fill="#FFFFFF"    ></path>
                    </g>
                  </g>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                </g>
              </g>
            </svg>
            {isNavBarLarge && 'Power Bi'}
          </a>
        </li>

        <li>
          <NavLink
            to='/almira-magazine'
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={({ isActive }) => isActive ? activeStyle : {opacity: "0.7"} }
          >
            {svgIcons.almira}
            {isNavBarLarge && <p>Almira</p>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/communication'
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={({ isActive }) => isActive ? activeStyle : {opacity: "0.7"} }
          >
            {svgIcons.communication}
            {isNavBarLarge && <p>Communication</p>}
          </NavLink>
        </li>


        <li>
          <a 
            className={!isNavBarLarge? 'centered-icons-mobile': 'centered-icons-disktop'} 
            style={{fontSize: '1.05rem', opacity: '0.7'}} 
            href="https://salic.sharepoint.com/sites/newsalic/_layouts/closeConnection.aspx?loginasanotheruser=true&Source=https://salic.sharepoint.com/sites/dev"
          >
            <svg fill='#fff' width='35px' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M554.666667 128l-85.333333 0 0 426.666667 85.333333 0L554.666667 128zM760.746667 220.586667l-60.586667 60.586667C767.573333 335.36 810.666667 418.56 810.666667 512c0 165.12-133.546667 298.666667-298.666667 298.666667s-298.666667-133.546667-298.666667-298.666667c0-93.44 43.093333-176.64 110.08-231.253333L263.253333 220.586667C180.48 290.986667 128 395.093333 128 512c0 212.053333 171.946667 384 384 384 212.053333 0 384-171.946667 384-384C896 395.093333 843.52 290.986667 760.746667 220.586667z"  /></svg>
            {isNavBarLarge && 'Sign Out'}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;

