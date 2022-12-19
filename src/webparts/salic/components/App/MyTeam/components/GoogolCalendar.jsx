import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'antd';
import { AppCtx } from '../../App';


const GoogolCalendar = () => {
  const { user_data, sp_context } = useContext(AppCtx);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    setLoading(true);
    await sp_context.msGraphClientFactory
      .getClient('3')
      .then((client) => {
        client
          .api(`/users/${user_data.Data.Mail}/events`)
          .get()
          // .then((response) => setData(response.value))
          .then((response) => console.log('users events', response))
          .then(() => setLoading(false))
          .catch(err => console.log(err))
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    if(Object.keys(user_data).length > 0) {
      fetchData();
    }
  }, [user_data]);


  return (
    <div style={{overflowX: 'auto'}}>
      <Calendar />
    </div>
  )
}

export default GoogolCalendar