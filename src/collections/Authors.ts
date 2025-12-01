import type { CollectionConfig } from "payload";

export const Authors : CollectionConfig={
  slug:'authors',
  access:{
    read: () => true
  },
  admin:{
    useAsTitle:'name'
  },
  labels:{
    singular: 'Author',
    plural:'Authors'
  },
  fields:[
    {
      name:'name',
      type:'text',
      label:'Author name',
      required: true,
    },
    {
      name:'booksWritten',
      type: 'relationship',
      relationTo:'books',
      label:'Books written',
      hasMany: true,
      required:false,
      admin:{
        description:'Choose books the author has written'
      }
    },
    {
      name:'authorDescription',
      type:'richText',
      label:'Description of the author',
      required: true,
      admin:{
        description:'Add description of the author'
      }
    }
  ],
}