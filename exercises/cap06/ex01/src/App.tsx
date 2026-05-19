/**
 * a) Elaborar um programa para gerar uma tabela com os jogos de uma fase eliminatória de um campeonato. O programa deve conter três funções (a serem executadas no evento click de cada botão) para:

 * Validar o preenchimento, adicionar um clube ao vetor e listar os clubes;
 * Listar os clubes (se houver);
 * Montar a tabela de jogos, no formato primeiro x último, segundo x penúltimo e assim por diante. Exibir mensagem e não listar a tabela de jogos, caso o número de clubes informados seja ímpar. 
*/

import { useMemo, useState } from "react";
import "./index.css";

type Team = {
  name: string;
  badge: string | null;
};

type TeamsListProps = {
  teams: Team[];
  onRemove: (index: number) => void;
};

type GamesListProps = {
  games: string[];
};

export default function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showList, setShowList] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const games = useMemo(() => {
    if (teams.length % 2 !== 0) return [];

    const teamsSize = teams.length / 2;
    const leftTeams = [...teams];
    const rightTeams = leftTeams.splice(teamsSize).reverse();

    return leftTeams.map((lT, i) => {
      const rT = rightTeams[i];
      return `${lT.name} x ${rT.name}`;
    });
  }, [teams]);

  const invalidTeamsSize = teams.length % 2 !== 0;

  const handleRemoveTeam = (indexToRemove: number) => {
    setTeams((prev) => prev.filter((_, index) => index !== indexToRemove));
    setShowTable(false);
  };

  const fetchTeamLogo = async (teamName: string) => {
    const backgroundColor = "03045e";
    const textColor = "ffffff";

    const badgeUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      teamName,
    )}&background=${backgroundColor}&color=${textColor}&bold=true&format=svg`;

    return {
      name: teamName,
      badge: badgeUrl,
    };
  };

  const handleAddTeam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const teamInput = formData.get("team") as string;

    if (!teamInput.trim()) return;

    // Agora a função é instantânea e sempre retorna o nome correto!
    const teamData = await fetchTeamLogo(teamInput);

    setTeams((prev) => [...prev, teamData]);

    setShowTable(false); // Esconde a tabela para forçar o novo cálculo
    form.reset();
  };

  const handleListTeams = () => {
    if (teams.length === 0) {
      alert("Adicione clubes primeiro!");
      return;
    }
    setShowList(!showList);
  };

  const handleGenerateTable = () => {
    if (teams.length === 0) {
      alert("Lista vazia!");
      return;
    }
    // A validação de ímpar acontece no render, mas ativamos a visualização aqui
    setShowTable(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-mauve-50">
      <div className="p-20 mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-950">
            Gerador de Tabela de Jogos
          </h1>
          <h3 className="text-xl font-semibold text-blue-950 max-w-480 mt-1">
            O Football Gerador é um gerador de eliminatória para a Cup Arena
            Brazil
          </h3>
        </div>

        <hr className="my-8 border-t border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col gap-6">
            <form
              onSubmit={handleAddTeam}
              className="bg-white border border-gray-200 rounded-xl shadow-md"
            >
              <h1 className="bg-gray-200 p-2 px-4 text-2xl font-semibold rounded-t-xl">
                Adicionar Clube
              </h1>

              <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="team" className="font-semibold">
                    Nome do Clube:
                  </label>

                  <input
                    type="text"
                    id="team"
                    name="team"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Ex.: Internacional"
                  />
                </div>

                <div className="flex flex-row gap-4">
                  <button
                    type="submit"
                    className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                  >
                    Adicionar
                  </button>

                  {/* botão mantido, mas sem lógica inútil */}
                  <button
                    type="button"
                    onClick={handleListTeams}
                    className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                  >
                    Listar Clubes
                  </button>
                </div>

                <div className="text-right">
                  <p>
                    Clubes Cadastrados:{" "}
                    <span className="p-1 rounded-md text-sm bg-green-700 text-white">
                      {teams.length}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </form>

            {showList && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-md animate-in fade-in duration-500">
                <TeamsList teams={teams} onRemove={handleRemoveTeam} />
              </div>
            )}
          </div>

          {/* COLUNA DIREITA */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md">
            <h1 className="bg-green-700 p-2 px-4 text-2xl font-semibold rounded-t-xl">
              Tabela de Jogos (Fase Eliminatória)
            </h1>

            <div className="p-4">
              <button
                type="button"
                onClick={handleGenerateTable}
                className=" p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
              >
                Montar Tabela de Jogos
              </button>
            </div>

            <div className="px-4 pb-4">
              {/* 1. Se o botão foi clicado (showTable) e o número é ÍMPAR: Mostra erro */}
              {showTable && invalidTeamsSize && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                  Número de clubes ímpar ({teams.length}). Não é possível montar
                  a tabela.
                </div>
              )}

              {/* 2. Se o botão foi clicado (showTable) e o número é PAR: Mostra a lista de jogos */}
              {showTable && !invalidTeamsSize && <GamesList games={games} />}

              {/* 3. Se o botão ainda NÃO foi clicado: Mostra mensagem de instrução */}
              {!showTable && (
                <p className="text-gray-400 text-center py-10">
                  Clique em "Montar Tabela de Jogos" para gerar os confrontos.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* TeamsList */
function TeamsList({ teams, onRemove }: TeamsListProps) {
  return (
    <div>
      <h1 className="bg-gray-200 p-2 px-4 text-2xl font-semibold rounded-t-xl">
        Clubes Cadastrados
      </h1>

      <ul className="p-2 px-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {teams.map((team, index) => (
          <li
            key={`${team.name}-${index}`}
            className="py-1 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {team.badge ? (
                <img
                  src={team.badge}
                  alt={team.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                  {team.name[0]}
                </div>
              )}

              <span>{team.name}</span>
            </div>

            <button
              onClick={() => onRemove(index)}
              type="button"
              className="cursor-pointer hover:scale-110 transition-all duration-300"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* GamesList */
function GamesList({ games }: GamesListProps) {
  return (
    <div className="py-4">
      <ul className="flex flex-col rounded-xl overflow-hidden">
        {games.map((game, index) => (
          <li
            key={`${game}-${index}`}
            className="flex flex-col items-center text-lg p-3 even:bg-white odd:bg-gray-100"
          >
            <span className="text-sm text-gray-500">Jogo {index + 1}</span>
            <span className="font-semibold text-gray-900">{game}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
