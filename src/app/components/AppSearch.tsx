 "use client"
import { getAllCharacters } from "@/app/helpers/getAllCharacter";
import { Result } from "@/app/types/types";
import {useEffect, useState } from "react";
import { Spinner } from "./ui/Spinner";
import { CiSearch } from "react-icons/ci";
import CustomModal from "./ui/CustomModal"
import { TiDeleteOutline } from "react-icons/ti";
import { MdErrorOutline, MdFavoriteBorder } from "react-icons/md";
import FormModal from "./ui/FormModal";
import GridCharacters from "./functionality/GridCharacters";
import { useRouter } from "next/navigation";

const AppSearch = () => {

    const [characters, setCharacters] = useState<Result[] | [] >([]);
    const [copyCharacters, setCopyCharacters] = useState<Result[] | [] >([]);
    const [hasError, setHasError] = useState(false);
    const [isFilted, setIsFilted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const data = await getAllCharacters();
                setCharacters(data);
                setCopyCharacters(data);
            } catch (error) {
                console.error("Error fetching characters", error);
            }
        };

        fetchData()
    }, []);

    const router = useRouter();

    

    const handleResetCharacters = ()=>{
        setCharacters(copyCharacters);
        setIsFilted(false);
        setHasError(false);
    };

    const handleFavoritos = ()=>{
        router.push('/favorite');
    }

  return (
    <>   
        <CustomModal 
            isOpen={isOpen} 
            onClose={()=> setIsOpen(false) }
        >
            <FormModal characters={characters} setCharacters={setCharacters} setHasError={setHasError} setIsFilted={setIsFilted} setIsOpen={setIsOpen}/>
        </CustomModal>
        <div className="flex absolute top-0 p-2 right-0 justify-center items-center">
            <div>
                <MdFavoriteBorder 
                    size={30} 
                    className="hover:bg-[#97CE4C] m-2 rounded-full transition-colors duration-300 p-1" 
                    onClick={handleFavoritos}
                />
            </div> 
            <div 
                className=" hover:bg-[#97CE4C] m-2 rounded-full transition-colors duration-300 p-1"
                onClick={()=> setIsOpen(true)}
            >
                <CiSearch size={28}/>
            </div>

            {
                isFilted && (
                    <div 
                    className="hover:bg-[#97CE4C] m-2 rounded-full transition-colors duration-300 p-1"
                    onClick={handleResetCharacters}
                    >
                        <TiDeleteOutline size={28}/>
                    </div>
                )
                
            }
        </div>
        
        

        {
            (characters.length > 0 && !hasError) 
            ?(
                <GridCharacters characters={characters}/>
            )
            :(
                (hasError)
                ?(
                    <div className="w-full h-[80dvh] flex justify-center items-center">
                        <div>
                            <MdErrorOutline size={80} className="mx-auto text-red-900"/>
                                <h1 className="font-bold text-xl mt-5">Character not found or nonexistent</h1>
                        </div>
                        
                    </div>
                )
                :(
                    <div className="w-full h-[80dvh] flex justify-center items-center">
                        <Spinner/>
                    </div>
                )
                
            )
        }
        
    </>
    
  )
}

export default AppSearch;