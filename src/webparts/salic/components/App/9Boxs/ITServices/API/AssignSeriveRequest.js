import axios from "axios";

export default async function RejectSeriveRequest(data) {
  try {
    let request = await axios(
      {
        method: 'POST',
        url: "https://salicapi.com/api/tracking/Assign",
        data: JSON.stringify(data)
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}