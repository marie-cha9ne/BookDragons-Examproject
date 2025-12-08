'use client';
import { useState } from "react";
import styles from './Searchbar.module.css'

type SearchbarProps={
  // Callback fra parent som mottar søke-begrepet
  onSearch: (term: string) => void
}

export default function Searchbar({onSearch}: SearchbarProps){
    const [value, setValue] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
      const term = e.target.value;

      // Oppdaterer visuell value i inputfeltet
      setValue(term);

      // Sender søket tilbake til parent 
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