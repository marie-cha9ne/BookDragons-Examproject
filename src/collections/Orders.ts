import type { CollectionConfig } from "payload";

export const Orders : CollectionConfig={
  slug:'orders',
  access:{
    read: () => true,
    create: () => true
  },
  fields:[
    {
      name:'customerName',
      type:'text',
      label:'Customer name',
      required: true,
    },
    {
      name:'customerInfo',
      type:'text',
      label:'Phone or Email',
      required:true,
    },
    {
      name:'reserveBook',
      type:'relationship',
      relationTo:'books',
      label:'Reserved book',
      required: true,
    }
  ],
}