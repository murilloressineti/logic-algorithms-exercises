/*
  Elaborar um programa que leia o nome de um clube e, ao clicar em "Adicionar", insira-o na página a partir de uma tag h5 (alinhada à direita e em itálico). Ao clicar em "Montar Tabela de Jogos", o programa deve vericar se o número de tags h5 existentes na página é par. Se for, exiba os jogos (na ordem de inserção) em uma tabela, também inserida pelo programa na página. Os clubes devem ser recuperados das tags h5 existentes na página. Se o número de tags h5 for ímpar, exiba mensagem de advertência. Depois de montar a tabela, o programa deve desabilitar os botões "Adicionar" e "Montar Tabela de Jogos".
*/

import { useState } from "react";

function Header() {
  return (
    <div className="bg-slate-800">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-3xl text-white font-bold uppercase">
          Tabela de jogos
        </h1>
        <span className="text-4xl">⚽</span>
      </div>
    </div>
  );
}

function AddTeam() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputTeam = form.get("team") as string;

    // 3. Validações
    if (inputTeam.trim() === "") {
      alert("Digite um clube válido");
      return;
    }

    console.log(inputTeam);

    event.currentTarget.reset();
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-orange-600">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Adicionar clube</h2>
        <span className="text-4xl">🛡️</span>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="team" className="font-medium">
            Nome do Clube
          </label>
          <input
            type="text"
            placeholder="Ex.: Real Madrid, Barcelona etc."
            id="team"
            name="team"
            className="border border-orange-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-orange-800 shadow-md"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}

function GameTable() {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-800">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Tabela de jogos</h2>
        <span className="text-4xl">🗒️</span>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="space-y-3">
          <li className="p-3 rounded-xl bg-gray-50 border-2 border-gray-400">
            <span className="text-gray-700 font-medium">Jogo 1: Real Madrid x Barcelona</span>
          </li>
        </ul>

        <button
          type="button"
          className="bg-blue-800 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-600 shadow-md"
        >
          Montar tabela de jogos
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <AddTeam />
        <GameTable />
      </div>
    </div>
  );
}
