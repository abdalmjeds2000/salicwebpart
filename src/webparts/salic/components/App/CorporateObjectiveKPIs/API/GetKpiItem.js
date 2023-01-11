import pnp from 'sp-pnp-js';

export default async function GetKpiItem(id) {
  try {
    const res = await pnp.sp.web.lists.getByTitle('KPIs 2022').items.getById(id).get()
    return res
  } catch(err) {
    console.log(err)
    return(err)
  }
}

