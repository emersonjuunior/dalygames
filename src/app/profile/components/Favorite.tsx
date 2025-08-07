"use client";
import { FiEdit, FiX } from "react-icons/fi";
import { useState } from "react";

const Favorite = () => {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  console.log(gameName)

  return (
    <article className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput ? (
        <div className="max-w-80 flex items-center justify-center gap-3">
          <input
            type="text"
            className="bg-white outline-none text-black rounded-lg px-2 py-1 w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="cursor-pointer"
            onClick={() => {
              setShowInput((prev) => !prev);
              if (text != "") {
                setGameName(text);
              }
              setText("");
            }}
          >
            <FiX size={24} color="#FFF" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowInput((prev) => !prev);
            if (text != "") {
              setGameName(text);
            }
            setText("");
          }}
          className="self-start hover:scale-110 cursor-pointer duration-300 transition-all"
        >
          <FiEdit size={24} color="#FFF" />
        </button>
      )}
      {gameName && (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <p className="font-bold text-white">{gameName}</p>
        </div>
      )}
      {!gameName && <p className="font-bold">Adicionar jogo</p>}
    </article>
  );
};

export default Favorite;
