import axios from "axios";

export default async function DeleteSeriveRequest(id) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/tracking/DeleteServiceRequest/${id}`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    return(err.response)
  }
}