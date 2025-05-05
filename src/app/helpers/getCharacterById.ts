import { Result } from "../types/types";

export const getCharacterById = async(id: string) : Promise<Result> =>{
    try {
        
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if(!res.ok){
            throw new Error('No se pudo encontrar el personaje')
        }
        const data: Result = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo encontrar el personaje');
    }
}