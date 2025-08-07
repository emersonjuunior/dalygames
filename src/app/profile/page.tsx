import Container from "@/components/Container";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import Favorite from "./components/Favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meu perfil - Daly Games",
    description: "Perfil do usuário em Daly Games, sua plataforma de jogos!"
}

const Profile = () => {
  return (
    <main>
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-normal gap-4 text-lg">
            <Image
              width={440}
              height={380}
              src="/user.png"
              alt="Imagem do perfil do usuário"
              className="rounded-full size-56 object-cover"
            />
            <h1 className="text-2xl font-bold">Meu perfil</h1>
          </div>
          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white cursor-pointer">
              Configurações
            </button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer">
              <FaShareAlt size={24} color="#FFF" />
            </button>
          </div>
        </section>
        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <Favorite />
          </div>
          <div className="flex-grow flex-wrap">
            <Favorite />
          </div>
          <div className="flex-grow flex-wrap">
            <Favorite />
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Profile;
