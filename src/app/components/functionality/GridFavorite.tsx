"use client"

import { FavoriteContext } from "@/app/context/FavoriteContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import GridCharacters from "./GridCharacters";
import { Spinner } from "../ui/Spinner";

const GridFavorite = () => {

const favoriteContext = useContext(FavoriteContext);

  const router = useRouter();

  if(!favoriteContext){
    throw new Error('Context not found');
  }

  const {favoriteCharacters} = favoriteContext;

  const handleHome = ()=>{
    router.push('/');
  }

  return (
    <>
        <div className="flex absolute top-0 p-2 right-0 justify-center items-center">
            <div>
            <FaHome
                    size={30} 
                    className="hover:bg-[#97CE4C] m-2 rounded-full transition-colors duration-300 p-1" 
                    onClick={handleHome}
            />
            </div> 
        
        </div> 
        {
        (favoriteCharacters.length > 0) 

        ?(<GridCharacters characters={favoriteCharacters}/>)
        : (
            <div className=" h-[80dvh] flex justify-center">
                <Spinner/>
            </div>
            )
        }    

    </>
  )
}

export default GridFavorite