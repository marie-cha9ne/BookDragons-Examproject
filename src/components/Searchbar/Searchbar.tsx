'use client';
import { useState } from "react";
import styles from './Searchbar.module.css'

type SearchbarProps={
  onSearch: (term: string) => void
}

export default function Searchbar({onSearch}: SearchbarProps){
    const [value, setValue] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
      const term = e.target.value;
      setValue(term);
      onSearch(term);
    }

    return(
      <div className={styles.searchContainer}>
        <label><strong>Search Books:</strong></label>
        <input 
          type="text" 
          value={value}
          onChange={handleChange}
          placeholder="Search books ..."
          className={styles.searchBar}
          />
      </div>
    )
}