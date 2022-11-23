import React from 'react';
import './MeetingCenter.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import ServicesSection from '../Global/ServicesSection/ServicesSection';


function MeetingCenter() {

  const Icons = {
    NewMeeting: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" fill="#fff"><g><g xmlns="http://www.w3.org/2000/svg">  <g>    <path d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341    c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z    " fill="#FFFFFF"></path>  </g></g><g xmlns="http://www.w3.org/2000/svg">  <g>    <path d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318    c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83    s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z" fill="#FFFFFF"></path>  </g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>,
    MyMeetings: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32" fill="fff"><g><g xmlns="http://www.w3.org/2000/svg"><path d="m14 8.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m5.5 22.5c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm0-3c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z" fill="#FFFFFF" data-original="#000000"></path><path d="m6.5 13.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m24.5 20.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m29.867 23.544c-.121-.426-.43-.769-.846-.94-.429-.176-.905-.148-1.309.078-.744.417-1.683.417-2.425 0-.711-.4-1.619-.158-1.997.505l-.033.048-2.257-4.065v-1.67c0-.234.031-.463.094-.682.051-.178.188-.258.266-.29.144-.059.305-.049.439.025 1.039.584 2.362.584 3.403 0 .132-.076.295-.085.438-.025.077.032.215.112.266.29.063.219.094.448.094.682 0 .276.224.5.5.5s.5-.224.5-.5c0-.327-.045-.648-.133-.956-.121-.426-.43-.769-.846-.94-.429-.176-.905-.148-1.309.078-.744.417-1.683.417-2.425 0-.404-.226-.88-.254-1.31-.078-.416.171-.725.514-.846.94-.077.271-.115.554-.125.84l-.07-.127c-.087-.158-.254-.257-.436-.257v-4.5c0-.326-.045-.648-.133-.956-.121-.426-.43-.769-.845-.94-.429-.176-.906-.147-1.31.078-.744.417-1.682.417-2.426 0-.402-.226-.88-.254-1.31-.078-.415.171-.724.514-.845.94-.088.308-.133.63-.133.956v4.5c-.167 0-.323.083-.416.223l-.093.14c-.011-.279-.048-.554-.123-.819-.121-.426-.43-.769-.845-.94-.429-.176-.907-.148-1.31.078-.744.417-1.682.417-2.426 0-.403-.226-.88-.254-1.31-.078-.415.171-.724.514-.845.94-.085.308-.13.63-.13.956 0 .276.224.5.5.5s.5-.224.5-.5c0-.233.031-.463.094-.682.051-.178.188-.258.265-.29.146-.06.305-.05.44.025 1.039.584 2.363.584 3.402 0 .134-.076.294-.085.44-.025.076.032.214.112.265.29.063.219.094.449.094.682v1.349l-2.636 3.954c-.459-.356-1.11-.426-1.651-.121-.744.417-1.683.417-2.425 0-.403-.227-.881-.254-1.31-.078-.416.171-.725.514-.846.94-.087.308-.132.629-.132.956v5c0 .276.224.5.5.5h2c.646 0 .647-1 0-1h-1.5v-4.5c0-.234.031-.463.094-.682.051-.178.188-.258.266-.29.144-.059.305-.05.439.025 1.039.584 2.362.584 3.403 0 .201-.114.45-.064.598.095l-1.712 2.568c-.028.041-.051.086-.065.134-.016.052-.024.105-.023.157v2.993c0 .276.224.5.5.5h18c.276 0 .5-.224.5-.5 0 0 0-2.999 0-3.014-.003-.086-.026-.167-.067-.236l-1.135-2.043.337-.486c.128-.222.429-.298.664-.167 1.039.584 2.362.584 3.403 0 .133-.076.295-.085.438-.025.077.032.215.112.266.29.063.218.094.447.094.681v4.5s-2.486 0-2.5 0c-.641 0-.65 1 0 1h3c.276 0 .5-.224.5-.5v-5c0-.327-.045-.648-.133-.956zm-13.425-8.522-.436.338-.406-.332.417-1.36zm-2.942-2.522c0-.233.031-.463.094-.682.084-.294.45-.408.705-.265.373.21.786.317 1.207.376l-.96 3.128c-.061.194.004.406.162.534l.977.796c.179.145.44.149.622.007l1.023-.796c.165-.128.233-.345.17-.544l-.982-3.127c.412-.061.817-.168 1.184-.373.256-.144.621-.028.705.265.063.219.094.448.094.682v4.499h-5v-4.5zm-.732 5.5h6.438l4.444 8h-16.215zm11.232 11h-17v-2h17z" fill="#FFFFFF" data-original="#000000"></path><path d="m21.5 13.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m4.5 15h1c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-1c-.275 0-.5-.224-.5-.5v-.5h1.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-1.5v-8.5c0-.276.225-.5.5-.5h23c.275 0 .5.224.5.5v8.5h-1.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v.5c0 .276-.225.5-.5.5h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.827 0 1.5-.673 1.5-1.5v-10c0-.827-.673-1.5-1.5-1.5h-23c-.827 0-1.5.673-1.5 1.5v10c0 .827.673 1.5 1.5 1.5z" fill="#FFFFFF" data-original="#000000"></path><path d="m26 10.5c0 .276.224.5.5.5s.5-.224.5-.5v-6c0-.276-.224-.5-.5-.5h-21c-.276 0-.5.224-.5.5v6c0 .276.224.5.5.5s.5-.224.5-.5v-5.5h20z" fill="#FFFFFF" data-original="#000000"></path><path d="m21.538 24.257-2.777-5c-.089-.158-.256-.257-.438-.257h-4.753c-.167 0-.323.083-.416.223 0 0-3.317 4.976-3.333 5-.215.322.031.777.416.777h10.863c.368 0 .617-.421.438-.743zm-10.366-.257 2.666-4h4.191l2.222 4z" fill="#FFFFFF"></path></g></g></svg>,
    RoomsCalender: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32" fill="fff"><g><g xmlns="http://www.w3.org/2000/svg"><path d="m14 8.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m5.5 22.5c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm0-3c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z" fill="#FFFFFF" data-original="#000000"></path><path d="m6.5 13.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m24.5 20.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m29.867 23.544c-.121-.426-.43-.769-.846-.94-.429-.176-.905-.148-1.309.078-.744.417-1.683.417-2.425 0-.711-.4-1.619-.158-1.997.505l-.033.048-2.257-4.065v-1.67c0-.234.031-.463.094-.682.051-.178.188-.258.266-.29.144-.059.305-.049.439.025 1.039.584 2.362.584 3.403 0 .132-.076.295-.085.438-.025.077.032.215.112.266.29.063.219.094.448.094.682 0 .276.224.5.5.5s.5-.224.5-.5c0-.327-.045-.648-.133-.956-.121-.426-.43-.769-.846-.94-.429-.176-.905-.148-1.309.078-.744.417-1.683.417-2.425 0-.404-.226-.88-.254-1.31-.078-.416.171-.725.514-.846.94-.077.271-.115.554-.125.84l-.07-.127c-.087-.158-.254-.257-.436-.257v-4.5c0-.326-.045-.648-.133-.956-.121-.426-.43-.769-.845-.94-.429-.176-.906-.147-1.31.078-.744.417-1.682.417-2.426 0-.402-.226-.88-.254-1.31-.078-.415.171-.724.514-.845.94-.088.308-.133.63-.133.956v4.5c-.167 0-.323.083-.416.223l-.093.14c-.011-.279-.048-.554-.123-.819-.121-.426-.43-.769-.845-.94-.429-.176-.907-.148-1.31.078-.744.417-1.682.417-2.426 0-.403-.226-.88-.254-1.31-.078-.415.171-.724.514-.845.94-.085.308-.13.63-.13.956 0 .276.224.5.5.5s.5-.224.5-.5c0-.233.031-.463.094-.682.051-.178.188-.258.265-.29.146-.06.305-.05.44.025 1.039.584 2.363.584 3.402 0 .134-.076.294-.085.44-.025.076.032.214.112.265.29.063.219.094.449.094.682v1.349l-2.636 3.954c-.459-.356-1.11-.426-1.651-.121-.744.417-1.683.417-2.425 0-.403-.227-.881-.254-1.31-.078-.416.171-.725.514-.846.94-.087.308-.132.629-.132.956v5c0 .276.224.5.5.5h2c.646 0 .647-1 0-1h-1.5v-4.5c0-.234.031-.463.094-.682.051-.178.188-.258.266-.29.144-.059.305-.05.439.025 1.039.584 2.362.584 3.403 0 .201-.114.45-.064.598.095l-1.712 2.568c-.028.041-.051.086-.065.134-.016.052-.024.105-.023.157v2.993c0 .276.224.5.5.5h18c.276 0 .5-.224.5-.5 0 0 0-2.999 0-3.014-.003-.086-.026-.167-.067-.236l-1.135-2.043.337-.486c.128-.222.429-.298.664-.167 1.039.584 2.362.584 3.403 0 .133-.076.295-.085.438-.025.077.032.215.112.266.29.063.218.094.447.094.681v4.5s-2.486 0-2.5 0c-.641 0-.65 1 0 1h3c.276 0 .5-.224.5-.5v-5c0-.327-.045-.648-.133-.956zm-13.425-8.522-.436.338-.406-.332.417-1.36zm-2.942-2.522c0-.233.031-.463.094-.682.084-.294.45-.408.705-.265.373.21.786.317 1.207.376l-.96 3.128c-.061.194.004.406.162.534l.977.796c.179.145.44.149.622.007l1.023-.796c.165-.128.233-.345.17-.544l-.982-3.127c.412-.061.817-.168 1.184-.373.256-.144.621-.028.705.265.063.219.094.448.094.682v4.499h-5v-4.5zm-.732 5.5h6.438l4.444 8h-16.215zm11.232 11h-17v-2h17z" fill="#FFFFFF" data-original="#000000"></path><path d="m21.5 13.5c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm3 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1z" fill="#FFFFFF" data-original="#000000"></path><path d="m4.5 15h1c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-1c-.275 0-.5-.224-.5-.5v-.5h1.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-1.5v-8.5c0-.276.225-.5.5-.5h23c.275 0 .5.224.5.5v8.5h-1.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v.5c0 .276-.225.5-.5.5h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.827 0 1.5-.673 1.5-1.5v-10c0-.827-.673-1.5-1.5-1.5h-23c-.827 0-1.5.673-1.5 1.5v10c0 .827.673 1.5 1.5 1.5z" fill="#FFFFFF" data-original="#000000"></path><path d="m26 10.5c0 .276.224.5.5.5s.5-.224.5-.5v-6c0-.276-.224-.5-.5-.5h-21c-.276 0-.5.224-.5.5v6c0 .276.224.5.5.5s.5-.224.5-.5v-5.5h20z" fill="#FFFFFF" data-original="#000000"></path><path d="m21.538 24.257-2.777-5c-.089-.158-.256-.257-.438-.257h-4.753c-.167 0-.323.083-.416.223 0 0-3.317 4.976-3.333 5-.215.322.031.777.416.777h10.863c.368 0 .617-.421.438-.743zm-10.366-.257 2.666-4h4.191l2.222 4z" fill="#FFFFFF"></path></g></g></svg>,
  }

  return (
    <>
      <HistoryNavigation>
        <p>Meetings Services Center</p>
      </HistoryNavigation>
      <div className='standard-page'>
        <ServicesSection
          title="Send Meeting Request"
          items={[{icon: Icons.NewMeeting, isLink: false, to: '/book-meeting-room/new-meeting', bgColor: '#6edb72', text: 'New Meeting'},]}
        />
        <ServicesSection
          title="Meetings Center"
          items={[
            {icon: Icons.MyMeetings, isLink: false, to: '/book-meeting-room/my-meetings', bgColor: '#b340c7', text: 'My Meetings'},
            {icon: Icons.RoomsCalender, isLink: false, to: '/book-meeting-room/rooms-calender', bgColor: '#42aada', text: 'Rooms Calender'},
          ]}
        />
      </div>
    </>
  )
}

export default MeetingCenter