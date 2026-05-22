/*
  Elaborar um programa que leia um nome e, ao clicar no botão Exibir Partes do Nome, insira linhas de cabeçalho h3 na página com as partes do nome em cores aleatórias. Ao clicar no botão, o programa deve vericar a existência de linhas de cabeçalho h3 na página, excluindo-as se houver.
*/

import { useState } from "react";

function Header() {
  return (
    <div className="bg-blue-900">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-3xl text-white font-bold uppercase">
          Partes do nome
        </h1>
        <span className="text-4xl">🧩</span>
      </div>
    </div>
  );
}

function Identity() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputName = form.get("identity") as string;

    // 3. Validações
    if (inputName.trim() === "") {
      alert("Digite um nome válido");
      return;
    }

    console.log(inputName)

    event.currentTarget.reset()
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-400">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Informar nome</h2>
        <span className="text-4xl">🪪</span>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Idade */}
        <div className="flex flex-col gap-1">
          <label htmlFor="identity" className="font-medium">
            Nome Completo
          </label>
          <input
            type="text"
            placeholder="Ex.: Ana Maria Souza Sauro"
            min={1}
            max={120}
            id="identity"
            name="identity"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-400 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-600 shadow-md"
        >
          Exibir partes do nome
        </button>
      </form>
    </div>
  );
}

function NameInParts() {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-900">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Nome em partes</h2>
      </header>

      <div className="flex flex-col items-center justify-center">
        <div className="bg-slate-300 p-4 flex w-full h-full rounded-md items-center justify-center text-6xl">
          <div className="flex flex-col items-center justify-center font-bold">
            <span className="text-red-600">Ana</span>
            <span className="text-green-600">Maria</span>
            <span className="text-blue-600">Souza</span>
            <span className="text-yellow-600">Sauro</span>
          </div>
        </div>

        <span className="mt-1 mb-4">Partes do nome em cores aleatórias.</span>

        <div
          className={`flex gap-1 border border-slate-700 bg-slate-200 text-slate-700 shadow-md rounded-md p-2 uppercase`}
        >
          <span>🎉</span>
          <strong>Partes Exibidas</strong>{" "}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <Identity />
        <NameInParts />
      </div>
    </div>
  );
}
