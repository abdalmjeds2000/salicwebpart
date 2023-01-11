import axios from "axios";

export default async function GetObjectivesData() {
  try {
    const { data } = await axios.get("https://salic.sharepoint.com/sites/MDM/_api/web/lists/getbytitle('KPIs 2022')/items");
    console.log(data.value);
    return data.value;
  } catch (err) {
    console.log(err);
    return err;
  }
}
