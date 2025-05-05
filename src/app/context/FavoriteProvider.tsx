"use client"

import { ReactNode, useEffect, useState } from "react"
import { FavoriteContext } from "./FavoriteContext"
import { Result } from "../types/types";

const FavoriteProvider = ({children} : {children: ReactNode}) => {

const [favoriteCharacters, setFavoriteCharacters] = useState<Result[] | [] >([]); 
const [isInitialized, setIsInitialized] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem('favorites');
  if (saved) {
    try {
      setFavoriteCharacters(JSON.parse(saved));
    } catch (e) {
      console.error("Error parsing favorites", e);
      localStorage.removeItem('favorites');
    }
  }
  setIsInitialized(true);
}, []);

useEffect(()=>{
  if(isInitialized){
    localStorage.setItem('favorites', JSON.stringify(favoriteCharacters));
  }
}, [favoriteCharacters, isInitialized]);


const onDeleteCharacter = (character: Result) =>{
  const newCharacters = favoriteCharacters.filter(c => c.id != character.id);
  setFavoriteCharacters(newCharacters);
};

const onToggleCharacter = (character : Result) =>{
  const characterExists = favoriteCharacters.find(c => c.id === character.id);
  if(characterExists){
    onDeleteCharacter(character);
  }else{
    onAddCharacter(character);
  };
}


const onAddCharacter = (newCharacter : Result)=>{
    setFavoriteCharacters([...favoriteCharacters, newCharacter]);
};

  return (
    <FavoriteContext.Provider value={{
        favoriteCharacters,
        onAddCharacter,
        onDeleteCharacter,
        onToggleCharacter,
    }}>
        {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider