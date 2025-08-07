import Image from "next/image";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Label from "./components/Label";
import GameCard from "@/components/GameCard";
import { IGame } from "@/interfaces/Game";

async function getGameData(id: string): Promise<IGame | null> {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getRandomGame(): Promise<IGame | null> {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const game = await getGameData(params.id);

  if (!game) {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir.",
    };
  }

  return {
    title: game.title,
    description: game.description.slice(0, 100),
    openGraph: {
      title: game.title,
      images: [game.image_url],
    },
  };
}

export default async function GameDetails({ params }: { params: { id: string } }) {
  const game = await getGameData(params.id);

  if (!game) {
    redirect("/");
  }

  const randomGame = await getRandomGame();

  return (
    <main>
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-80"
          src={game.image_url}
          alt={game.title}
          priority
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
        />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-4">{game.title}</h1>
        <p>{game.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-3 flex-wrap">
          {game.platforms.map((platform) => (
            <Label key={platform} name={platform} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-3 flex-wrap">
          {game.categories.map((category) => (
            <Label key={category} name={category} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <span className="font-semibold">Data de lançamento: </span> {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-1">
            <GameCard game={randomGame!} />
          </div>
        </div>
      </Container>
    </main>
  );
}
