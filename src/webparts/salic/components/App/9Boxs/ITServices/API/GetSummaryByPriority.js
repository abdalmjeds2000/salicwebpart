import axios from "axios";

export default async function GetSummaryByPriority(email) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/Tracking/SummaryByPriority?Email=${email}`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}