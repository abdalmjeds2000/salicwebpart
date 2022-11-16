import axios from "axios"

export default async function AddActionRequest(type, data) {
  try {
    let request = await axios(
      {
        method: "POST",
        url: `https://salicapi.com/api/${type}/AddAction`,
        data: data
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log(err.response)
    return(err.response)
  }
}