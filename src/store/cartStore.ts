import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Hvert element i cart representerer en fysisk kopi av en bok
// Duplikater tillates og mengde håndteres i UI
type CartItem  ={
  id:number,
  title:string,
  price:number,
  availability: number 
}

type CartStore = {
  cart: CartItem[],
  // addToCart returnerer en string som en UI kan bruke til å vise toast
  addToCart: (item: CartItem) => "added" | "soldout",
  // Fjerner en bok om gangen
  removeFromCart: (id: number) => void,
  // Tømmer hele handlekurven
  clearCart: () => void
}

export const useStoredCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // starter med tom cart
      cart: [],

      addToCart(item) {
       const oldCart = get().cart

      //  Teller hvor mange forekomster av boken som finnes i cart
       const availableBooks = oldCart.filter(book => book.id === item.id).length

      //  Hvis antallet i cart er lik eller større enn availability -> stopp
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

        // Finn første forekomst av den boken
        const index = oldCart.findIndex((book) => book.id === id)

        // Hvis boken ikke finnes return
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
      name: 'storedCart', //Key i localStorage
    }
  )
)