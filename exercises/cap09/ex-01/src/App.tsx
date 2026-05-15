/*
  Acrescentar no site da Loja de Esportes um contador de visitas do cliente ao site. Assim, na primeira visita do cliente à loja, exibir em um parágrafo do site a mensagem: 
    "Muito Bem-Vindo! Esta é a sua primeira visita ao nosso site." 
  Nas próximas visitas, exibir: 
    "Que bom que você voltou! Esta é a sua visita de número x ao nosso site." 
*/

import { useState, useEffect } from "react";

type ResultProps = {
  visits: number;
};

function Header() {
  return (
    <div className="bg-blue-900">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-white text-3xl font-bold uppercase">
          Loja de Esportes
        </h1>
        <span className="text-4xl -scale-x-100">🏃</span>
      </div>
    </div>
  );
}

function Result({ visits }: ResultProps) {
  return (
    <div className="bg-gray-100 p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-500 max-w-100">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Muito Bem-Vindo!</h2>
      </header>

      <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
        <div
          className={`border-slate-700 bg-slate-200 text-slate-700  shadow-md rounded-md p-4 uppercase`}
        >
          {visits === 1 ? (
            <strong>
              Muito Bem-Vindo! Esta é a sua primeira visita ao nosso site.
            </strong>
          ) : (
            <strong>
              Que bom que você voltou! Esta é a sua visita de número {visits} ao
              nosso site.
            </strong>
          )}
        </div>

        <div
          className={`border-green-700 bg-green-200 text-green-700  shadow-md rounded-md p-4 uppercase`}
        >
          <strong>Total de visitas: {visits}</strong>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const savedVisits = localStorage.getItem("visits");

    if (!savedVisits) {
      // primeira vistita
      localStorage.setItem("visits", String(1));
      setVisits(1);
    } else {
      // visitas seguintes
      const totalVisits = Number(savedVisits) + 1;

      localStorage.setItem("visits", String(totalVisits));

      setVisits(totalVisits);
    }
  }, []);

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto pt-10">
        <Result visits={visits} />
      </div>
    </div>
  );
}
