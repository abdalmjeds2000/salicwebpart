import axios from "axios";

export default async function AutoCompleteUsers(query) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/User/AutoComplete?term=${query}&_type=query&q=${query}&_=1667805757891`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log(err.response)
    return(err.response)
  }
}