import type { CollectionConfig } from "payload";

export const PagePhotos : CollectionConfig={
  slug:'page-photos',
  access:{
    read:() => true
  },
  fields:[
    {
      name:'alt',
      type:'text',
      required:true,
    }
  ],
  upload:{
    staticDir: 'page-photos',
    adminThumbnail:'thumbnail',
    mimeTypes:['image/*'],
    imageSizes:[
      {
        name:'thumbnail',
        width:400,
        height:300,
        position:'center'
      },
      {
        name:'widescreen',
        width:1024,
        height:600,
        position:'center'
      },
      {
        name:'mobile',
        width:680,
        height:undefined,
        position:'center'
      },
    ],
  },
}