import pnp from "sp-pnp-js";

export default async function UpdateItem(id, data) {
  try {
    const res = await pnp.sp.web.lists
      .getByTitle("Corporate Objective KPIs 2022")
      .items.getById(id)
      .update(data);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
