import Container from "@/components/Container";
import GameCard from "@/components/GameCard";
import SearchGame from "@/components/SearchGame";
import { IGame } from "@/interfaces/Game";

const Search = async ({ params: { title } }: { params: { title: string } }) => {
  const games: IGame[] = await getSearchedGame(title);

  return (
    <main className="w-full">
      <Container>
        <SearchGame />
        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja o que encontramos para você:
        </h1>
        {!games || games.length === 0 ? (
          <p>Esse jogo não foi encontrado!</p>
        ) : (
          <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {games.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </section>
        )}
      </Container>
    </main>
  );
};

export default Search;

const getSearchedGame = async (title: string) => {
  try {
    const decodeTitle = decodeURI(title)
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
    );

    return res.json();
  } catch {
    return null;
  }
};
