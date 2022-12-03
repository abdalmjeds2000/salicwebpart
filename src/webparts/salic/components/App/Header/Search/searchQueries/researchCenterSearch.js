import pnp from 'sp-pnp-js';

export default async function researchCenterSearch(query) {
  let data = {
    articles: []
  }
  try {
    const articlesItems = await pnp.sp.web.lists.getByTitle("Research Articles")
      .items.orderBy("Created_x0020_Date", false).select('AttachmentFiles,*').top(50).expand('AttachmentFiles')
      .filter(`substringof('${query}', Title)`).get()
      data.articles = articlesItems;
    return data;
  } catch(err) {
    console.log(err)
  }
}

