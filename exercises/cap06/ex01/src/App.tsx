import { useMemo, useState } from "react";
import "./index.css";

/**
 * a) Elaborar um programa para gerar uma tabela com os
 * jogos de uma fase eliminatória de um campeonato. O programa
 * deve conter três funções (a serem executadas no evento click de cada botão) para:
 * Validar o preenchimento, adicionar um clube ao vetor e listar os clubes;
 * Listar os clubes (se houver);
 * Montar a tabela de jogos, no formato primeiro x último,
 * segundo x penúltimo e assim por diante. Exibir mensagem e
 * não listar a tabela de jogos, caso o número de clubes informados
 * seja ímpar. A Figura 6.14 ilustra a página gerada com a tabela de jogos.
 * (Imagem da interface do programa exibindo os clubes:
 * Grêmio x Guarany, Pelotas x Caxias, Juventude x Ypiranga, Internacional x Brasil)
 */

const DEFAULT_TEAMS: string[] = [];

export default function App() {
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [tab, setTab] = useState<string | null>(null);

  const games = useMemo(() => {
    const teamsSize = teams.length / 2;
    const leftTeams = [...teams];
    const rightTeams = leftTeams.splice(teamsSize).reverse();

    return leftTeams.map((lT, i) => {
      const rT = rightTeams[i];
      return `${lT} x ${rT}`;
    });
  }, [teams]);

  const invalidTeamsSize = useMemo(() => {
    return teams.length % 2 !== 0;
  }, [teams]);

  const handleTeamsList = () => {
    if (invalidTeamsSize) {
      alert("A quantidade de times tem que ser par");
      setTab(null);
      return;
    }

    setTab("teams-tab");
  };

  const handleGamesList = () => {
    if (invalidTeamsSize) {
      alert("A quantidade de times tem que ser par");
      setTab(null);
      return;
    }

    setTab("games-tab");
  };

  const handleAddTeam = (event: React.FormEvent<HTMLFormElement>) => {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formData = new FormData(event.currentTarget);
    const newTeam = formData.get("team") as string;

    // 3. Validação simples: não adicionar vazio
    if (!newTeam.trim()) return;

    // 4. Adiciona o time ao estado
    setTeams((prevTeams) => [...prevTeams, newTeam]);

    // 5. Limpa o input após adicionar
    event.currentTarget.reset();
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                  </svg>
                  Adicionar
                </button>

                <button
                  type="submit"
                  className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                  onClick={handleTeamsList}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                  </svg>
                  Listar Clubes
                </button>
              </div>
            </div>
          </form>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md">
            <h1 className="bg-green-600 p-2 px-4 text-2xl font-semibold rounded-t-xl">
              Tabela de Jogos (Fase Eliminatória)
            </h1>

            <div className="p-4">
              <button
                type="submit"
                className="p-2 w-full bg-blue-900 text-white rounded-md cursor-pointer flex gap-4 items-center justify-center hover:bg-blue-950 transition-all duration-300"
                onClick={handleGamesList}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path>
                </svg>
                Montar tabela de jogos
              </button>
            </div>

            <div className="px-4">
              <Tabs tab={tab} games={games} teams={teams} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md">
            <Tabs tab={tab} games={games} teams={teams} />
          </div>
        </div>
      </div>
    </div>
  );
}

type TabsProps = {
  tab: string | null;
  teams: string[];
  games: string[];
};

function Tabs({ tab, teams, games }: TabsProps) {
  if (tab === "teams-tab") {
    return (
      <div>
        <h1 className="bg-gray-200 p-2 px-4 text-2xl font-semibold rounded-t-xl">
          Clubes Cadastrados
        </h1>

        <ul className="p-2 px-4">
          {teams.map((team) => (
            <li key={team} className="py-1 flex justify-between items-center">
              {team}
              <span className="cursor-pointer hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                </svg>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (tab === "games-tab") {
    return (
      <div className="py-4">
        <ul className="flex flex-col">
          {games.map((game, index) => (
            <li
              key={game}
              className="flex flex-col items-center text-lg p-3 even:bg-white odd:bg-gray-200"
            >
              <span className="text-sm text-gray-500">Jogo {index + 1}</span>

              <span className="font-semibold text-gray-900">{game}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
