/*
Elaborar um programa que leia o nome e a idade de um atleta de um clube de natação. 
O programa deve exibir o nome e a categoria do atleta, que pode ser “Infantil” (até 12 anos), “Juvenil” (entre 13 e 18 anos) ou “Adulto” (acima de 18 anos). 
O programa deve conter as funções: 
  - categorizarAluno() – que receba um número como parâmetro e retorne a categoria do aluno, conforme indicação no enunciado do exercício.
*/

import { useState } from "react";

interface AthleteProps {
  onProcessName: (name: string) => void;
  onProcessAge: (age: number) => void;
}

interface ResultProps {
  name: string;
  age: number;
  category: string;
}

function Header() {
  return (
    <div className="bg-blue-600">
      <div className="max-w-220 mx-auto flex justify-between py-10 px-6">
        <h1 className="text-white uppercase text-2xl font-bold">
          Clube de Natação
        </h1>
        <span className="text-4xl scale-x-[-1]">🏊</span>
      </div>
    </div>
  );
}

function Athlete({ onProcessName, onProcessAge }: AthleteProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputName = form.get("name") as string;
    const inputAge = Number(form.get("age"));

    // 3. Validações
    if (inputName.trim() === "") {
      alert("Digite um nome válido");
      return;
    }

    if (isNaN(inputAge) || inputAge < 0) {
      alert("Digite uma idade válida");
      return;
    }

    onProcessName(inputName);
    onProcessAge(inputAge);
  }

  return (
    <div className="p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-600">
      <h2 className="uppercase text-2xl font-bold">Dados do atleta</h2>

      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Nome do Atleta
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="font-medium">
            Idade
          </label>
          <input
            type="number"
            min={1}
            id="age"
            name="age"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-800 shadow-md"
        >
          Categorizar atleta
        </button>
      </form>
    </div>
  );
}

function Result({ name, age, category }: ResultProps) {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-500">
      <h2 className="uppercase text-2xl font-bold">Resultado do clube</h2>

      <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
        <h3 className="text-4xl font-medium tracking-wide">{name}</h3>

        <span className="text-lg">Idade: {age} anos</span>

        <span
          className={`border font-medium shadow-md rounded-md py-1 px-2 uppercase
            ${
              category === "Infantil"
                ? "border-green-700  bg-green-200 text-green-700"
                : category === "Juvenil"
                  ? "border-blue-700  bg-blue-200 text-blue-700 "
                  : "border-orange-700  bg-orange-200  text-orange-700"
            }
           `}
        >
          Categoria: {category}
        </span>
      </div>
    </div>
  );
}

function categorizeAthlete(age: number): string {
  if (age <= 12) {
    return "Infantil";
  } else if (age <= 18) {
    return "Juvenil";
  } else {
    return "Adulto";
  }
}

export default function App() {
  const [atheleteName, setAthleteName] = useState("Nome do Atleta");
  const [athleteAge, setAthleteAge] = useState(0);
  const [athleteCategory, setAthleteCategory] = useState("");

  function handleSaveName(name: string) {
    setAthleteName(name);
  }

  function handleSaveAge(age: number) {
    setAthleteAge(age);

    const categoryResult = categorizeAthlete(age);

    setAthleteCategory(categoryResult);
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-220 mx-auto px-6">
        <Athlete onProcessName={handleSaveName} onProcessAge={handleSaveAge} />
        <Result
          name={atheleteName}
          age={athleteAge}
          category={athleteCategory}
        />
      </div>
    </div>
  );
}
