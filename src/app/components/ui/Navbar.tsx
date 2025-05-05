import Image from "next/image"
const Navbar = () => {
  return (
    <nav className="flex ">
       <div>
              <Image
                src="/assents/rickapplogo.png"
                alt="Logo rick and morty"
                width={130}
                height={130}
                className="h-[75px] ml-5"
              />
        </div>
    </nav>
  )
}

export default Navbar