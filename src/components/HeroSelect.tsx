import { ChangeEvent } from "react";

interface Hero {
    name: string;
}
  
interface HeroSelectProps {
    id: string;
    label: string;
    selectedHero: string;
    onHeroChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    heroes: Hero[];
}

export default function HeroSelect(props:HeroSelectProps){
    
    return(
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">{props.label}</label>
            <select
                id={props.id}
                value={props.selectedHero}
                onChange={props.onHeroChange}
                className="my-3 py-2 px-1 block w-full border-gray-500 bg-yellow-500 text-white rounded-md shadow-sm cursor-pointer outline-none max-h-20 overflow-y-auto"
            >
                <option value="">Selecione um herói</option>
                {props.heroes.map(hero => (
                <option key={hero.name} value={hero.name}>{hero.name}</option>
                ))}
            </select>
        </div>
    )
}