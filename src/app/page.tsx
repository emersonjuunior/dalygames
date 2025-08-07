import Container from "@/components/Container";
import { IGame } from "@/interfaces/Game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from "react-icons/bs";
import SearchGame from "@/components/SearchGame";
import GameCard from "@/components/GameCard";

export default async function Home() {
  const dalyGame: IGame = await getDalyGame();
  const games: IGame[] = await getGamesData();

  return (
    <main className="w-full">
      <div className="w-full max-w-7xl mx-auto">
        <Container>
          <h1 className="text-center font-bold text-xl mt-8 mb-5">
            Separamos um jogo exclusivo pra você
          </h1>
          <Link href={`/game/${dalyGame.id}`}>
            <section className="w-full bg-black rounded-lg">
              <div className="w-full max-h-96 h-96 relative">
                <div className="absolute bottom-0 z-10 p-4">
                  <p className="font-bold text-xl text-white flex items-center justify-center gap-2">
                    {dalyGame.title}
                    <BsArrowRightSquare size={24} color="#FFF" />
                  </p>
                </div>
                <Image
                  src={dalyGame.image_url}
                  alt={dalyGame.title}
                  priority
                  quality={100}
                  fill
                  className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 duration-300 cursor-pointer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
              </div>
            </section>
          </Link>
          <SearchGame />

          <h2 className="font-bold text-lg mt-8 mb-5">
            <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </section>
          </h2>
        </Container>
      </div>
    </main>
  );
}

const getDalyGame = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );

    return res.json();
  } catch (error) {
    throw new Error("Error: " + error);
  }
};

const getGamesData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });

    return res.json();
  } catch (error) {
    throw new Error("Error: " + error);
  }
};
