import Image from "next/image";
import Link from "next/link";
import { LiaGamepadSolid } from "react-icons/lia";

const Header = () => {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="w-full max-w-7xl mx-auto flex justify-center sm:justify-between items-center h-28">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo do DalyGames"
              quality={100}
              priority
              width={140}
              height={40}
              className="w-full"
            ></Image>
          </Link>
          <Link href="/">Games</Link>
          <Link href="/profile">Perfil</Link>
        </nav>
        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#475569" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
