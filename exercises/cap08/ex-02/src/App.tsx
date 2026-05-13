/*
  Elaborar um programa que leia o nome completo de um aluno. O programa deve validar o preenchimento de um nome completo e exibir a senha inicial do aluno, a qual será o sobrenome seguido pelo número de vogais do nome completo dele. O programa deve conter as funções: 
  • validarNome() – que receba um nome como parâmetro e retorne true (nome completo) ou false (nome incompleto). 
  • obterSobrenome() – que receba um nome como parâmetro e retorne o último nome do aluno em letras minúsculas. 
  • contarVogais() – que receba um nome e retorne o número de vogais deste, com dois dígitos.
*/

import React from "react";

function Header() {
  return (
    <div className="bg-blue-800">
      <div className="max-w-280 mx-auto py-10 px-6">
        <h1 className="text-white text-3xl font-bold">
          Portal do Aluno: Gerador de Senha
        </h1>
      </div>
    </div>
  );
}

function Student() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputName = form.get("name") as string;

    // 3. Validações
    if (inputName.trim() === "") {
      alert("Digite um nome válido");
      return;
    }
  }

  return (
    <div className="w-full rounded-lg shadow-lg">
      <div className="bg-blue-800 flex flex-col gap-4 p-4 rounded-lg">
        <span className="text-4xl">🛡️</span>
        <h2 className="uppercase text-2xl font-bold text-white">
          Dados do aluno
        </h2>
      </div>

      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Nome Completo do Aluno
          </label>
          <input
            type="text"
            placeholder="Ex: JOSÉ DA SILVA SAURO"
            id="name"
            name="name"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-800 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-600 shadow-md"
        >
          Gerar senha inicial
        </button>
      </form>
    </div>
  );
}

function Result() {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-500">
      <h2 className="uppercase text-2xl font-bold">Senha gerada</h2>

      <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
        <h3 className="text-3xl uppercase">José da silva sauro</h3>

        <span className="bg-gray-300 py-2 px-4 rounded-lg text-5xl font-medium">
          sauro07
        </span>

        <span>O sobrenome "SAURO" em minúsculas (sauro) + 7 vogais (07)</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen border">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <Student />
        <Result />
      </div>
    </div>
  );
}
