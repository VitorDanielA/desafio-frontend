import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEventHandler, useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import Modal from "@/components/Modal";
import HeroStatsModal from "@/components/HeroStatsModal";

const inter = Inter({ subsets: ["latin"] });

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
  image: string;
  powerstats: Powerstats;
}

export default function Home() {

  const [metahumans, setMetahumans] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHero1, setSelectedHero1] = useState<string>('');
  const [selectedHero2, setSelectedHero2] = useState<string>('');
  const [isHeroStatsModalOpen, setIsHeroStatsModalOpen] = useState<boolean>(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch('/api/ps/metahumans')
      .then(response => {
        if (!response.ok) {
          throw new Error('Sem resposta');
        }
        return response.json();
      })
      .then(data => {
        const heroData = data.map((hero: { name: any; images: { sm: any; }; powerstats: any; }) => ({
          name: hero.name,
          image: hero.images.sm,
          powerstats: hero.powerstats
        }));
        setMetahumans(heroData);
        setFilteredHeroes(heroData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filtered = metahumans.filter(hero =>
      hero.name.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredHeroes(filtered);
  };

  const handleOpenHeroStatsModal = (hero: Hero) => {
    setSelectedHero(hero);
    setIsHeroStatsModalOpen(true);
  };

  const handleCloseHeroStatsModal = () => {
    setIsHeroStatsModalOpen(false);
    setSelectedHero(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleHero1Change: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedHero1(event.target.value);
  };

  const handleHero2Change: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedHero2(event.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <h1 className="mt-12 text-yellow-500 text-2xl font-bold mx-2 sm:text-5xl">Bem-vindo ao Hero Finder</h1>
      <p className="text-yellow-500 mx-2  text-center py-6 sm:text-xl">Aqui você vai poder buscar vários heróis e batalhar entre eles</p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <SearchInput value={searchTerm} onChange={handleSearchChange}/>
        <button className="bg-yellow-500 text-white font-semibold py-3 px-4 mb-4 rounded-lg shadow-lg transition-transform hover:bg-yellow-400 adjust-mobile" onClick={handleOpenModal}>Duelo de Heróis</button>
      </div>
      <div className="flex flex-wrap w-full justify-center gap-5 items-center mt-2">
        {filteredHeroes.map((hero, index) => (
          <div key={index} className="border rounded-lg p-4 cursor-pointer" onClick={() => handleOpenHeroStatsModal(hero)}>
            <Image src={hero.image} alt={hero.name} width={230} height={108} className="rounded-sm" />
            <h2 className="w-full text-black font-medium text-xl text-center py-4">{hero.name}</h2>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        heroes={metahumans}
        selectedHero1={selectedHero1}
        selectedHero2={selectedHero2}
        onHero1Change={handleHero1Change}
        onHero2Change={handleHero2Change}
      />
      <HeroStatsModal
        isOpen={isHeroStatsModalOpen}
        onClose={handleCloseHeroStatsModal}
        hero={selectedHero}
      />
    </main>
  );
}
