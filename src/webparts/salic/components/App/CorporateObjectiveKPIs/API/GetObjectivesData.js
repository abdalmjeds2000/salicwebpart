import pnp from "sp-pnp-js";

export default async function GetObjectivesData() {
  try {
    const response = await pnp.sp.web.lists
      .getByTitle("Corporate Objective KPIs 2022")
      .items.get();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
