/*
  Elaborar um programa que leia o nome de um clube e, ao clicar em "Adicionar", insira-o na página a partir de uma tag h5 (alinhada à direita e em itálico). Ao clicar em "Montar Tabela de Jogos", o programa deve vericar se o número de tags h5 existentes na página é par. Se for, exiba os jogos (na ordem de inserção) em uma tabela, também inserida pelo programa na página. Os clubes devem ser recuperados das tags h5 existentes na página. Se o número de tags h5 for ímpar, exiba mensagem de advertência. Depois de montar a tabela, o programa deve desabilitar os botões "Adicionar" e "Montar Tabela de Jogos".
*/

import { useState } from "react";

type AddTeamProps = {
  team: string[];
  setTeam: React.Dispatch<React.SetStateAction<string[]>>;
  tableCreated: boolean;
};

type GameTableProps = {
  team: string[];
  tableCreated: boolean;
  setTableCreated: React.Dispatch<React.SetStateAction<boolean>>;
};

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

function AddTeam({ team, setTeam, tableCreated }: AddTeamProps) {
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

    setTeam((prevTeams) => [...prevTeams, formatTeamName(inputTeam)]);

    event.currentTarget.reset();
  }

  function formatTeamName(team: string) {
    return team
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
            Nome do Clube:
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
          disabled={tableCreated}
          className={`
            w-full p-2 rounded-md uppercase font-medium shadow-md transition-all duration-300
            ${
              tableCreated
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-800 text-white cursor-pointer"
            }
          `}
        >
          Adicionar
        </button>
      </form>

      {team.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-1">Times adicionados:</h3>
          <ul className="space-y-3">
            {team.map((club, index) => (
              <li
                key={index}
                className="p-3 rounded-xl bg-gray-50 border-2 border-gray-400"
              >
                <span className="text-gray-700 font-medium">{club}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function GameTable({ team, tableCreated, setTableCreated }: GameTableProps) {
  const [games, setGames] = useState<string[]>([]);

  function handleCreateGames() {
    if (team.length % 2 !== 0) {
      alert("Adicione um número para de clubes");
      return;
    }

    const matches = [];

    for (let i = 0; i < team.length; i += 2) {
      matches.push(`${team[i]} x ${team[i + 1]}`);
    }

    setGames(matches);
    setTableCreated(true);
  }

  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-800">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Tabela de jogos</h2>
        <span className="text-4xl">🗒️</span>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="space-y-3 w-full">
          {games.map((game, index) => (
            <li
              key={index}
              className="p-3 rounded-xl bg-gray-50 border-2 border-gray-400"
            >
              <span className="text-gray-700 font-medium">
                Jogo {index + 1}: {game}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleCreateGames}
          disabled={tableCreated}
          className={`
            w-full p-2 rounded-md uppercase font-medium shadow-md transition-all duration-300
            ${
              tableCreated
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"
            }
          `}
        >
          Montar tabela de jogos
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [team, setTeam] = useState<string[]>([]);
  const [tableCreated, setTableCreated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <AddTeam team={team} setTeam={setTeam} tableCreated={tableCreated} />
        <GameTable
          team={team}
          tableCreated={tableCreated}
          setTableCreated={setTableCreated}
        />
      </div>
    </div>
  );
}
