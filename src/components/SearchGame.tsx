"use client";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchGame = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") return;

    router.push(`/game/search/${text}`);
  };

  return (
    <form
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Procurando algum jogo? ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-slate-200 flex-1 outline-none"
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
};

export default SearchGame;
