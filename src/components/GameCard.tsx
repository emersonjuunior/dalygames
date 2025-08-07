import { IGame } from "@/interfaces/Game";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi";

interface GameCardProps {
  game: IGame;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link href={`/game/${game.id}`}>
      <article className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            className="rounded-lg object-cover"
            src={game.image_url}
            alt={game.title}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          />
        </div>
        <div className="flex items-center mt-4 justify-between">
          <h3 className="text-sm text-black font-bold px-2 truncate">{game.title}</h3>
          <BiRightArrowCircle size={24} color="#000" />
        </div>
      </article>
    </Link>
  );
};

export default GameCard; 
