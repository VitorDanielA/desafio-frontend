import Image from "next/image";
import SuperHero from './../assets/super-heroi.png';

export default function Navbar(){
    return(
        <div className="w-full h-24 bg-yellow-400 flex justify-center items-center">
            <Image src={SuperHero} alt="Super Hero"/>
        </div>
    )
}