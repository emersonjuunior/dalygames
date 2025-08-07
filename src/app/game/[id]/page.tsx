import Container from "@/components/Container";
import { IGame } from "@/interfaces/Game";
import Image from "next/image";
import { redirect } from "next/navigation";
import Label from "./components/Label";
import GameCard from "@/components/GameCard";
import { Metadata } from "next";

// Interface usada para tipar as props recebidas pelo componente de rota
interface PageProps {
  params: {
    id: string;
  };
}

// Metadata dinâmica para SEO
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const response: IGame = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    ).then((res) => res.json());

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir.",
    };
  }
};

// Componente da página do jogo
const GameDetails = async ({ params }: PageProps) => {
  const { id } = params;
  const game: IGame = await getGameData(id);
  const randomGame: IGame = await getRandomGame();

  if (!game) {
    redirect("/");
  }

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
          <span className="font-semibold">Data de lançamento: </span>{" "}
          {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-1">
            <GameCard game={randomGame} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default GameDetails;

// Função auxiliar para buscar o jogo pelo ID
const getGameData = async (id: string): Promise<IGame> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data: " + error);
  }
};

// Função auxiliar para buscar um jogo aleatório
const getRandomGame = async (): Promise<IGame> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    console.log(error);
    // Retorno vazio se der erro (para evitar erro no componente)
    return {
      id: 0,
      title: "Jogo não encontrado",
      description: "",
      image_url: "",
      release: "",
      platforms: [],
      categories: [],
    };
  }
};
