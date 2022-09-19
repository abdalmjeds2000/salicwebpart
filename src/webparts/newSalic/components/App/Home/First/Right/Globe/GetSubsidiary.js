import pnp from 'sp-pnp-js';

const GetSubsidiary = () => pnp.sp.web.lists.getByTitle('Subsidiary').items
    .select('Title,ShowTitle,SelectedColor,SolidColor,Id,Country,City,Description,Code,Website,Products,AttachmentFiles')
    .expand('AttachmentFiles')
    .get()
    .then(res => {
      console.log('GetSubsidiary', res)
      return res
    })
    .catch(err => console.log(err))


export default GetSubsidiary;