"use client"
import styles from './nav.module.css';
import Image from 'next/image';
import Menu from './assets/Menu.svg';
import X from './assets/X.svg';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function Nav(){
  const [menuOpen, setMenuOpen] = useState(false);

  const path = usePathname();

  useEffect(()=>{
    setMenuOpen(false)
  }, [path])
  return(
    <nav className={styles.nav}>
    <h3 className={styles.title}>BookDragons</h3>

    <ul 
    className={`
      ${styles.linkContainer}
      ${menuOpen ? styles.open : ''}
      `}>
        <Link href={'/'} className={styles.homeLink}>Home</Link>
        <Link href={'/'} className={styles.navLink}>Genres</Link>
        <Link href={'/'} className={styles.navLink}>Authors</Link>
    </ul>

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
    </nav>
  )
}