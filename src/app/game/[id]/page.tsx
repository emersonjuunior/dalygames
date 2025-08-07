import { redirect } from "next/navigation";
import Image from "next/image";
import GameCard from "@/components/GameCard";

const getGameData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

const getRandomGame = async () => {
  const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=random`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

export async function generateMetadata({ params }: Props) {
  const game = await getGameData(params.id);

  if (!game) {
    return {
      title: "Jogo não encontrado",
    };
  }

  return {
    title: `${game.name} - DalyGames`,
  };
}

export default async function GameDetails({ params }: Props) {
  const game = await getGameData(params.id);

  if (!game) {
    redirect("/");
  }

  const randomGame = await getRandomGame();

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="relative w-full h-[450px] rounded-lg overflow-hidden">
        <Image
          src={game.image_url}
          alt={`Imagem do jogo ${game.name}`}
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{game.name}</h1>
        <p className="text-zinc-400 text-base">{game.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Veja também</h2>
        <div className="w-full max-w-[260px]">
          <GameCard game={randomGame} />
        </div>
      </div>
    </div>
  );
}

type Props = {
  params: {
    id: string;
  };
};
