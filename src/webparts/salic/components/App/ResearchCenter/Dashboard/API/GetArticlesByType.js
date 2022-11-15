import pnp from 'sp-pnp-js';

export default async function GetArticlesByType(type) {
  try {
    const res = await pnp.sp.web.lists.getByTitle('Research Articles').items.select('Author/Title,AttachmentFiles,*').filter(`ResearchType eq '${type}'`).expand('Author,AttachmentFiles').get()
    return res
  } catch(err) {
    console.log(err)
    return(err)
  }
}

