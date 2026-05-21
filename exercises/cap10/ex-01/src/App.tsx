/*
  Criar dez imagens de números (de 0 a 9) como se fossem velas de aniversário e salvá-las na pasta img. Em seguida, elaborar um programa que leia uma idade e insira as imagens correspondentes na página conforme o número informado. O programa deve permitir idades entre 1 e 120 anos.
*/

import { useState } from "react";

type AgeProps = {
  setAge: React.Dispatch<React.SetStateAction<string>>;
};

type ResultProps = {
  age: string;
};

function Header() {
  return (
    <div className="bg-blue-900">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-3xl text-white font-bold uppercase">
          Velas de aniversário
        </h1>
        <span className="text-4xl">🎂</span>
      </div>
    </div>
  );
}

function AddAge({ setAge }: AgeProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputAge = form.get("age") as string;

    // 3. Validações
    if (inputAge.trim() === "") {
      alert("Digite uma idade válida");
      return;
    }

    setAge(inputAge);

    event.currentTarget.reset();
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-400">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Informar idade</h2>
        <span className="text-4xl">🎉</span>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Idade */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="font-medium">
            Sua idade
          </label>
          <input
            type="number"
            placeholder="Ex.: 25"
            min={1}
            max={120}
            id="age"
            name="age"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
          <span className="text-xs">*Idade permitida entre 1 e 120 anos.</span>
        </div>

        <button
          type="submit"
          className="bg-cyan-400 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-600 shadow-md"
        >
          Exibir velas
        </button>
      </form>
    </div>
  );
}

function ResultCandles({ age }: ResultProps) {
  const ageNumbers = age?.split("");

  const candles: Record<string, string> = {
    // Record é um tipo do TypeScript que define um objeto com chaves e valores de tipos específicos
    "0": "0️⃣",
    "1": "1️⃣",
    "2": "2️⃣",
    "3": "3️⃣",
    "4": "4️⃣",
    "5": "5️⃣",
    "6": "6️⃣",
    "7": "7️⃣",
    "8": "8️⃣",
    "9": "9️⃣",
  };

  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-900">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Suas velas</h2>
      </header>

      {age && (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-slate-300 p-4 flex w-full h-full rounded-md items-center justify-center text-6xl">
            {ageNumbers?.map((number, index) => (
              <div key={index} className="flex flex-col">
                <span>🕯️</span>
                <span>{candles[number]}</span>
              </div>
            ))}
          </div>

          <span className="mt-1 mb-4">
            Velas correspondentes para o aniversário de {age} anos!
          </span>

          <div
            className={`flex gap-1 border border-blue-700 bg-blue-200 text-blue-700 shadow-md rounded-md p-2 uppercase`}
          >
            <span>🎉</span>
            <strong>Velas geradas</strong>{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [age, setAge] = useState("");

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <AddAge setAge={setAge} />
        <ResultCandles age={age} />
      </div>
    </div>
  );
}
