"use client"
import styles from './nav.module.css';
import Image from 'next/image';
import Menu from './assets/Menu.svg';
import X from './assets/X.svg';
import CartIcon from './assets/Shopping cart.svg';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CartSlide from '../CartSlide/CartSlide';
import { useStoredCart } from '@/store/cartStore';


export default function Nav(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const path = usePathname();
  const cart = useStoredCart((state) => state.cart);

  useEffect(()=>{
    setMenuOpen(false)
  }, [path]);

  return(
    <>
    <nav className={styles.nav}>
    <div 
    className={styles.burgerMenu}
    onClick={()=> setMenuOpen(!menuOpen)}
    >
      <Image
        src={menuOpen ? X : Menu}
        width={40}
        height={40}
        alt='Navigation menu'
        />
    </div>

    <h3 className={styles.title}>BookDragons</h3>

    <ul 
    className={`
      ${styles.linkContainer}
      ${menuOpen ? styles.open : ''}
      `}>
        <Link href={'/'} className={styles.navLink}>Home</Link>
        <Link href={'/'} className={styles.navLink}>Genres</Link>
        <Link href={'/'} className={styles.navLink}>Authors</Link>
    </ul>

      <div className={styles.cartContainer}>
        <button 
        onClick={() => setCartOpen(true)}
        type='button'
        className={styles.cartBtn}
        >
          <Image src={CartIcon} alt='Shoppingcart' width={40} height={40}/>
        </button>
        <div className={styles.cartCount}>{cart.length}</div>
      </div>
    </nav>
      <CartSlide open={cartOpen} onClose={()=>setCartOpen(false)}/>
  </>
  )
}