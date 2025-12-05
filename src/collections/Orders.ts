import type { CollectionConfig } from "payload";

export const Orders : CollectionConfig={
  slug:'orders',
  access:{
    read: () => true,
    create: () => true
  },
  admin:{
    useAsTitle:'customerName'
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
      name:'items',
      type:'array',
      label:'Reserved items',
      fields:[
        {
          name:'book',
          type:'relationship',
          relationTo:'books',
          label:'Reserved book',
          required: true,
        },
        {
          name:'bookQuantity',
          type:'number',
          required:true,
          defaultValue:1,
        }
      ]
    }
  ],
}