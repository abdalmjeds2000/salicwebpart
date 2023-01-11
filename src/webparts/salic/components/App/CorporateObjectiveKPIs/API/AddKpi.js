import pnp from 'sp-pnp-js';

export default async function AddNewKPI(data) {
  try {
    const res = await pnp.sp.web.lists.getByTitle('KPIs 2022').items.add(data)
    return res
  } catch(err) {
    console.log(err)
    return(err)
  }
}

