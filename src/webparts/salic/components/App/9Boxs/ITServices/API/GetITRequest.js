import axios from "axios";

export default async function GetMyItServiceRequests(email, id) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/Tracking/GetById?Email=${email}&Id=${id}`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}