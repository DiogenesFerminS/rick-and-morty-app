import { Result } from "../types/types";

type filter = {
    name:string,
    status: string,
    location: string,
    origin: string,
    gender: string
}

export const getCharactersByParams =(characters: Result[], filter: filter)=>{
    
    return characters.filter(character =>{
        
        const matchName = filter.name ? character.name.toLowerCase().includes(filter.name.toLowerCase()) : true;

        const matchStatus = filter.status ? character.status === filter.status : true;

        const matchGender = filter.gender ? character.gender === filter.gender : true;

        const matchLocation = filter.location ? character.location.name === filter.location : true;

        const matchOrigin = filter.origin ? character.origin.name === filter.origin : true;

        return matchName && matchStatus && matchGender && matchLocation && matchOrigin;

    });
}