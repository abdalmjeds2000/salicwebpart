import axios from "axios";

export default async function GetSummaryByDepartment(email) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/Tracking/SummaryByDepartment?Manager=${email}`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}