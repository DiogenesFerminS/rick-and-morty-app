"use client"

import { useContext, useEffect, useState } from "react";
import { Result } from "../../types/types";
import { getCharacterById } from "../../helpers/getCharacterById";
import Image from "next/image";
import { Spinner } from "../ui/Spinner";
import { FavoriteContext } from "../../context/FavoriteContext";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
}

const DetailsCharacter = ({id} : Props) => {

    const [character, setCharacter] = useState<Result | null>();

    const favoriteContext = useContext(FavoriteContext);
    const router = useRouter();

    if(!favoriteContext){
        throw new Error('Context not found')
    };
    const {onToggleCharacter,favoriteCharacters} = favoriteContext;

    const isFavorite = favoriteCharacters.some(c=> c.id === character?.id);

    const getCharacter = async()=>{
        const character =  await getCharacterById(id);
        setCharacter(character);
    };

    useEffect(()=>{
        getCharacter();
    }, [id]);

    const handleToggle = () =>{
        if(character){
            onToggleCharacter(character);
            return;
        }else{
            throw new Error('Error en el toggle');
        };

    };

    const handleBack = ()=>{
        router.back();
    }

  return (
    <div className="container w-full h-[80dvh] flex justify-center items-center mx-auto">

        {
            character 
            ?(
            <div className="flex gap-4 animate-fade-in flex-col sm:flex-row">
                <div className={`bg-[url('/assents/portal.gif')] min-h-[250px] min-w-[250px] bg-cover bg-center max-w-[280px] max-h-[280px] mx-auto flex justify-center items-center`}>  
                <Image
                    height={100}
                    width={100}
                    src={character?.image}
                    alt={`${character.name}`}
                    className="rounded-full"
                />
                </div>
                <div>
                    <span className="text-xl uppercase font-bold text-center block mb-4">{character?.name}</span>
                    <ol>
                        <li>Species: {character?.species}</li>
                        <li>Status: {character?.status}</li>
                        <li>Location: {character?.location.name}</li>
                        <li>Origin: {character?.origin.name}</li>
                        <li>Gender: {character?.gender}</li>
                    </ol>

                    <div className="mt-4 flex gap-3">
                    <button
                        onClick={handleBack}
                        className="block text-center p-2 bg-[#97ce4c] rounded-full text-black hover:bg-[#08b2e3] uppercase font-bold tracking-widest max-w-[100px] transition-colors duration-300"
                    >Volver</button>

                    <button
                    onClick={handleToggle}
                    className={`block text-center p-2 ${ isFavorite ? 'bg-red-500' : 'bg-[#97ce4c]'} rounded-full text-black hover:bg-[#08b2e3] uppercase font-bold tracking-widest  transition-colors duration-300`}
                    >{isFavorite ? 'Delete favorite' : 'Add to favorite'}</button>
                    </div>
                    
                </div>
            </div>
            )
            : (<Spinner/>)
        }

       

    </div>
  )
}

export default DetailsCharacter