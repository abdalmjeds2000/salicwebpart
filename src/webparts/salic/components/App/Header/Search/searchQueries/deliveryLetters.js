import axios from 'axios';

export default async function deliveryLetters() {
  try {
    const response = await axios.get("https://salicapi.com/api/Asset/GetDeliveryNotes?draw=8&order=CreatedAt+desc&start=0&length=20&search[value]=&search[regex]=false&email=&Number=&Department=All&Status=All&AssetName=&_=1669282863275")
    return response.data;
  } catch(err) {
    console.log(err)
  }
}

