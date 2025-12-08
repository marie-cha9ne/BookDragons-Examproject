'use client'
import styles from './BookList.module.css';
import BookCards from '../BookCards/BookCards';
import Searchbar from '../Searchbar/Searchbar';
import { Book } from '@/payload-types';
import { useState } from 'react';

type BookListProps ={
  books : Book[]
}

export default function BookList({books}: BookListProps){
 const [search, setSearch]= useState('');

//  Filtrerer basert på søket, UI oppdaters underveis i søkingen.
 const filtered = books.filter(b => 
  b.title.toLowerCase().includes(search.toLowerCase())
 );

 return(
  <>
  <Searchbar onSearch={setSearch}/>

  <section className={styles.grid}>
    {filtered.length === 0 ? (
      <p>No results on your search</p>
    ): (
      filtered.map(b => <BookCards key={b.id} book={b}/>)
    )}
  </section>
  </>
 )
}