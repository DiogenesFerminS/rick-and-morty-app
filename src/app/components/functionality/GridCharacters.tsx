import { Result } from "@/app/types/types"
import CharacterItem from "./CharacterItem"

const GridCharacters = ({characters} : {characters: Result[]} ) => {
  return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 animate-fade-in'>
            {characters.map((character)=> (
                <CharacterItem {...character} key={character.id}/>
            ))}
        </div>
    </>
  )
}

export default GridCharacters