import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem  ={
  id:number,
  title:string,
  price:number,
}

type CartStore = {
  cart: CartItem[],
  addToCart: (item: CartItem) => void,
  removeFromCart: (id: number) => void,
  clearCart: () => void
}

export const useStoredCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart(item) {
       const oldCart = get().cart
        const newList =  [...oldCart, item]
        set({cart: newList})
      },

      removeFromCart(id) {
        const oldCart = get().cart
        const updatedCart = oldCart.filter((book) => book.id !== id)
        set({cart: updatedCart});
      },

      clearCart: () => {
        set({cart: []}) 
      },

    }),
    {
      name: 'storedCart',
    }
  )
)