import { FormEvent, useState } from "react";
import { getCharactersByParams } from "../../helpers/getCharactersByParams";
import { useForm } from "../../hooks/useForm"
import { Result } from "../../types/types";

interface FormModalProps {
    characters: Result[];
    setCharacters: (characters: Result[]) => void;
    setIsFilted: (isFilted: boolean) => void;
    setHasError: (hasError: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const FormModal = ({
    characters,
    setCharacters,
    setIsFilted,
    setHasError,
    setIsOpen
}: FormModalProps) => {

    const [emptyField, setEmpyField] = useState(false);
    const {formState, onInputChange, name, gender,location,status, origin, onResetForm} = useForm({
            initialForm: {
                name: '',
                gender: '',
                location: '',
                status: '',
                origin: '',
            }
        });

         const handleSubmitForm = (e : FormEvent<HTMLFormElement>)=>{
                e.preventDefault();

                if(Object.values(formState).some(x => x != '' )){
                    const filtedCharacter = getCharactersByParams([...characters], formState);
                    if(filtedCharacter.length >= 1){
                        setCharacters(filtedCharacter);
                        setIsFilted(true);
            
                    }else{
                        setHasError(true);
                        setIsFilted(true);
                    }
                    setIsOpen(false)
                    onResetForm();
                }else{
                    setEmpyField(true);
                    return;
                }
                
                
            };

        const handleClose = ()=>{
            setIsOpen(false);
        }

  return (
    <>
           <span className="text-2xl text-center block">Search a character</span>
           {
            emptyField && (<span className="text-red-900 m-2 block text-center font-bold">You must fill in at least one field</span>)
           }
            <form 
            className="mt-5"
            onSubmit={handleSubmitForm}
            >

                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name"
                        onChange={onInputChange}
                        value={name}
                        placeholder="Ej: Rick Sanchez"
                        autoComplete="off"
                        className="w-full p-1 mb-4
                        border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400
                        bg-white
                        text-gray-900
                        transition-all text-center"    
                    />
                </label>
               
                <label>
                Gender:
                    <select 
                    name="gender"
                    value={gender}
                    onChange={onInputChange}
                        className=" w-full p-1
                        border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-white
                        appearance-none text-center mb-4"
                    >   
                            <option value="">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                    </select>
                </label>

                <label>
                Status:
                    <select 
                    name="status"
                    value={status}
                    onChange={onInputChange}
                        className=" w-full p-1
                        border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-white
                        appearance-none text-center mb-4"
                    >   
                            <option value="">Select a status</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                            <option value="unknown">Unknown</option>


                    </select>
                </label>

                <label>
                Location:
                    <select 
                    name="location"
                    value={location}
                    onChange={onInputChange}
                        className=" w-full p-1
                        border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-white
                        appearance-none text-center mb-4"
                    >   
                            <option value="">Select a location</option>
                            <option value="Citadel of Ricks">Citadel of Ricks</option>
                            <option value="Earth (Replacement Dimension)">Earth (Replacement Dimension)</option>
                            <option value="Abadango">Abadango</option>
                            <option value="Testicle Monster Dimension">Testicle Monster Dimension</option>
                            <option value="Worldender&apos;s lair">Worldender&apos;s lair</option>
                            <option value="Anatomy Park">Anatomy Park</option>
                            <option value="Interdimensional Cable">Interdimensional Cable</option>
                            <option value="unknown">unknown</option>
                    </select>
                </label>

                <label>
                Origin:
                    <select 
                    name="origin"
                    value={origin}
                    onChange={onInputChange}
                        className=" w-full p-1
                        border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-white
                        appearance-none text-center mb-4"
                    >   
                            <option value="">Select a origin</option>
                            <option value="Earth (C-137)">Earth (C-137)</option>
                            <option value="unknown">unknown</option>
                            <option value="Earth (Replacement Dimension)">Earth (Replacement Dimension)</option>
                            <option value="Abadango">Abadango</option>


                    </select>
                </label>
                <div className="flex gap-2 mx-auto justify-center">
                <input 
                    onClick={()=> setIsOpen(true)}
                    type="submit" 
                    value="Search"   
                    className="block mt-4 py-2 px-4 bg-[#97CE4C] rounded-full text-black uppercase font-bold hover:bg-[#08B2E3] transition-colors duration-300" 
                />
                <button 
                    type="button"
                    className="mt-4 py-2 px-4 bg-red-500 rounded-full text-black uppercase font-bold hover:bg-[#08B2E3] transition-colors duration-300"
                    onClick={handleClose}
                >close</button>
                </div>
                
            </form>
    </>
  )
}

export default FormModal