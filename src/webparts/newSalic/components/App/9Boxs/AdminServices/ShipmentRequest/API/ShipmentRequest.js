import axios from "axios"

export default async function ShipmentRequest(data) {
  try {
    let ShipmentAdd = await axios(
      {
        method: 'POST',
        url: 'https://salicapi.com/api/Shipment/Add',
        data: data
      }
    )
    let response = ShipmentAdd.data;
    return response

  } catch(err) {
    console.log(err.response)
    return(err.response)
  }
}