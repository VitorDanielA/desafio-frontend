import React, { ChangeEvent, useState } from 'react';
import HeroSelect from './HeroSelect';

interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface Hero {
  name: string;
  powerstats: Powerstats;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroes: Hero[];
  selectedHero1: string;
  selectedHero2: string;
  onHero1Change: (event: ChangeEvent<HTMLSelectElement>) => void;
  onHero2Change: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Modal(props: ModalProps) {
  const [result, setResult] = useState<string | null>(null);

  if (!props.isOpen) return null;

  const getHeroByName = (name: string) => {
    return props.heroes.find(hero => hero.name === name);
  };

  const calculatePowerStatsSum = (hero: Hero) => {
    if (!hero) return 0;
    const { powerstats } = hero;
    return powerstats.intelligence + powerstats.strength + powerstats.speed + powerstats.durability + powerstats.power + powerstats.combat;
  };

  const handleBattle = () => {
    const hero1 = getHeroByName(props.selectedHero1);
    const hero2 = getHeroByName(props.selectedHero2);

    if (hero1 && hero2) {
      const hero1Sum = calculatePowerStatsSum(hero1);
      const hero2Sum = calculatePowerStatsSum(hero2);

      if (hero1Sum > hero2Sum) {
        setResult(`${hero1.name} vence com ${hero1Sum} pontos contra ${hero2Sum} de ${hero2.name}!`);
      } else if (hero2Sum > hero1Sum) {
        setResult(`${hero2.name} vence com ${hero2Sum} pontos contra ${hero1Sum} de ${hero1.name}!`);
      } else {
        setResult('Empate!');
      }
    } else {
      setResult('Por favor, selecione dois heróis.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-2">
        <button
          onClick={props.onClose}
          className="absolute top-4 right-7 text-gray-500 hover:text-gray-700 text-xl font-semibold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Duelo de Heróis</h2>
        <div className="flex flex-col gap-4">
            <HeroSelect 
                id='hero1'
                label='Escolha o Herói 1: '
                selectedHero={props.selectedHero1}
                onHeroChange={props.onHero1Change}
                heroes={props.heroes}
            />
            <HeroSelect 
                id='hero2'
                label='Escolha o Herói 2: '
                selectedHero={props.selectedHero2}
                onHeroChange={props.onHero2Change}
                heroes={props.heroes}
            />
          <button
            onClick={handleBattle}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 mb-2 rounded-lg shadow-lg transition-transform hover:bg-yellow-400"
          >
            Batalhar
          </button>
          {result && <p className="text-lg font-semibold text-center mt-4">{result}</p>}
        </div>
      </div>
    </div>
  );
}
