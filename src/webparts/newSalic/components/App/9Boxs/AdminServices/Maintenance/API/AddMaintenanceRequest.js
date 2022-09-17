import pnp from 'sp-pnp-js';

export default async function AddMaintenanceRequest(values) {
  try {
    const res = await pnp.sp.web.lists.getByTitle('Maintenance Request').items.add({
      Title: values.Requester, 
      Date: values.Date, 
      Requester: values.Requester, 
      Location: values.Location,
      Descriptions: values.Descriptions
    })
    return res
  } catch(err) {
    console.log(err)
    return(err)
  }
}
