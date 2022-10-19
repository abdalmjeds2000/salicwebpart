import pnp from 'sp-pnp-js';

export default async function GetContentRequest(id) {
  try {
    const res = await pnp.sp.web.lists.getByTitle('Content Requests').items.getById(id).select('Author/Title,Author/EMail,*').expand('Author').get()
    return res
  } catch(err) {
    console.log(err)
    return(err)
  }
}

