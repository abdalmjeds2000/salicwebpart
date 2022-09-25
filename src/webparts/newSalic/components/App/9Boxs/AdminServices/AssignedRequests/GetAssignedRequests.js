import axios from "axios"

export default async function GetAssignedRequests() {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: 'https://salicapi.com/api/Processes/Get?Email=&start=0&length=-1',
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log(err.response)
    return(err.response)
  }
}