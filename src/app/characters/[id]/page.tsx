import DetailsCharacter from "@/app/components/functionality/DetailsCharacter";

const Page = async({params}: {params: Promise<{id: string}>}) => {

  const id:string = (await params).id;

  return (
    <DetailsCharacter id={id}/>
  )
}

export default Page