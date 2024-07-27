import React from 'react';
import { Powerstats } from './../pages/types'; 
import Image from 'next/image';

interface HeroStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hero: {
    name: string;
    powerstats: Powerstats;
    image: string;
  } | null;
}

const HeroStatsModal: React.FC<HeroStatsModalProps> = ({ isOpen, onClose, hero }) => {
  if (!isOpen || !hero) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] w-full relative mx-4 max-h-[650px] overflow-y-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{hero.name}</h2>
        <div className="flex justify-center my-4">
          <Image src={hero.image} alt={hero.name} className="rounded-md" width={200} height={70}/>
        </div>
        <div className="flex flex-col gap-4">
          {Object.entries(hero.powerstats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between">
              <span className="font-medium text-gray-700 capitalize">{stat}:</span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroStatsModal;
