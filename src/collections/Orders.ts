import type { CollectionConfig } from "payload";

export const Orders : CollectionConfig={
  slug:'orders',
  access:{
    read: () => true,
    create: () => true
  },
  admin:{
    useAsTitle:'reserveBook'
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
      hasMany: true,
      label:'Reserved book',
      required: true,
    }
  ],
}