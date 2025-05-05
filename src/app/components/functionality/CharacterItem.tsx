"use client"

import { FavoriteContext } from "@/app/context/FavoriteContext";
import { Result } from "@/app/types/types"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaRegStar } from "react-icons/fa";

const CharacterItem = ({name,image,id}:Result) => {

  const favoriteContext = useContext(FavoriteContext);
  if(!favoriteContext){
    throw new Error('Context no found');
  }

  const {favoriteCharacters} = favoriteContext;

  const favorite = favoriteCharacters.some(c => c.id === id);

  const router = useRouter();

  const handleRedirec = ()=>{
    router.push(`/characters/${id}`)
  };

  return (
    <div
        onClick={handleRedirec}
        className={`relative z-20 bg-[url('/assents/portal.gif')] min-h-[250px] min-w-[250px] bg-cover bg-center max-w-[280px] max-h-[280px] mx-auto flex justify-center items-center hover:scale-110 flex-col `}
    >
      {
        (favorite)
        ? (<div className="absolute top-0 left-0 text-yellow-300">
          <FaRegStar size={28} />
        </div>)
        : <></>
      }
       

        <div>
            <Image
                src={image}
                width={100}
                height={100}
                alt={`foto de ${name}`}
                className="rounded-full hover:drop-shadow-[0_0_13px_#08b2e3] "
            />
        </div>

        <div>
        <span className="font-bold">{name}</span>
        </div>
    </div>
  )
}

export default CharacterItem;
