import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem  ={
  id:number,
  title:string,
  price:number,
  availability: number
}

type CartStore = {
  cart: CartItem[],
  addToCart: (item: CartItem) => "added" | "soldout",
  removeFromCart: (id: number) => void,
  clearCart: () => void
}

export const useStoredCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart(item) {
       const oldCart = get().cart

       const availableBooks = oldCart.filter(book => book.id === item.id).length

       if(availableBooks >= item.availability){
        return "soldout";
       }else{
        const newList =  [...oldCart, item]
        set({cart: newList})
        return "added";
        }
      },

      removeFromCart(id) {
        const oldCart = get().cart
        const index = oldCart.findIndex((book) => book.id === id)

        if(index === -1){
          return;
        }else{
          const updateCart = [...oldCart];
          updateCart.splice(index, 1);
          set({cart: updateCart});
        }
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