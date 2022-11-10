import axios from "axios";

export default async function GetITRequests() {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/tracking/Get?draw=1&order=&start=0&length=50&search%5Bvalue%5D=&search%5Bregex%5D=false&query=&_=1668102425918`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}