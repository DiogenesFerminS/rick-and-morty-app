import { Result, RickResponse } from "@/app/types/types";

export const getAllCharacters = async (): Promise<Result[]> =>{
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        if(!res.ok){
            throw new Error(`HTTP error! status ${res.status}`);
        }

        const data: RickResponse = await res.json();
        return data.results; 
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}