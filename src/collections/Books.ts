import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Book',
    plural: 'Books',
  },
  fields: [
    {
      name: 'title',
      label: 'Book title',
      type: 'text',
      required: true,
    },
    {
      name: 'availablilty',
      label: 'Book availability',
      type: 'number',
      admin: {
        description: 'Add number of available book copies',
      },
      required: true,
    },
    {
      name: 'bookCovers',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ageRec',
      label: 'Age recommandations',
      type: 'number',
      required: true,
      admin: {
        description: 'Add recommended age for the book.',
      },
    },
    {
  // later: adding relationship to author and genre collections
      name: 'author',
      type: 'text',
      label: 'Author of the book',
      required: true,
      admin: {
        description: 'Add author of the book.',
      },
    },
    {
      name: 'genre',
      type: 'text',
      label: 'Book genre',
      required: true,
      admin: {
        description: 'Add genre of the book',
      },
    },
  ],
}
