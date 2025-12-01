import type { CollectionConfig } from "payload";

export const Genre : CollectionConfig ={
  slug:'genre',
  access:{
    read:() => true,
  },
  admin:{
    useAsTitle:'genre'
  },
  labels:{
    singular:'Genre',
    plural:'Genres'
  },
  fields:[
    {
      name:'genre',
      label:'Name of the genre',
      type:'text',
      required:true,
    },
    {
      name:'genreDescription',
      type:'textarea',
      maxLength:500,
      required:true,
      admin:{
        description:'Add a short description of the genre'
      }
    },
    {
      name:'bookInGenre',
      type:'relationship',
      relationTo:'books',
      hasMany: true,
      required: false, 
      admin:{
        description:'Add books that fit this genre'
      }
    }
  ],
}