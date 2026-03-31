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
  };

  const fetchTeamLogo = async (teamName: string) => {
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${encodeURIComponent(teamName)}`,
      );

      const data = await response.json();

      if (!data.teams || data.teams.length === 0) {
        return null;
      }

      const team = data.teams[0];

      return {
        name: team.strTeam,
        badge: team.strTeamBadge || null,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAddTeam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget; // Guardamos a referência do form
    const formData = new FormData(form);
    const teamInput = formData.get("team") as string;

    if (!teamInput.trim()) return;

    const teamData = await fetchTeamLogo(teamInput);

    // Se a API encontrou o time, usamos os dados reais dela
    if (teamData) {
      setTeams((prev) => [...prev, teamData]);
    } else {
      // Caso não encontre, adicionamos apenas o nome (ou tratamos o erro)
      setTeams((prev) => [...prev, { name: teamInput, badge: null }]);
    }

    form.reset(); // Limpa o input
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
                  {/* 🔥 IMPORTANTE: submit */}
                  <button
                    type="submit"
                    className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                  >
                    Adicionar
                  </button>

                  {/* botão mantido, mas sem lógica inútil */}
                  <button
                    type="button"
                    className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                  >
                    Listar Clubes
                  </button>
                </div>
              </div>
            </form>

            <div className="bg-white border border-gray-200 rounded-xl shadow-md">
              <TeamsList teams={teams} onRemove={handleRemoveTeam} />
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md">
            <h1 className="bg-green-600 p-2 px-4 text-2xl font-semibold rounded-t-xl">
              Tabela de Jogos (Fase Eliminatória)
            </h1>

            <div className="p-4">
              {invalidTeamsSize && teams.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm mb-4">
                  Número de clubes ímpar. Não é possível montar a tabela.
                </div>
              )}
            </div>

            <div className="px-4">
              <GamesList games={games} />
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

      <ul className="p-2 px-4">
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
