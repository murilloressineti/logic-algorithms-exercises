import { FormEventHandler, useMemo, useState } from "react";
import "./styles.css";

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

  const handleAddTeam: FormEventHandler<HTMLFormElement> = (event) => {
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
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h1>Jogos eliminatórios</h1>
        <hr />
        <form onSubmit={handleAddTeam}>
          <label htmlFor="team">Clube:</label>
          <input type="text" id="team" name="team" />
          <button type="submit">Adicionar</button>
        </form>
        <div>
          <button onClick={handleTeamsList}>Listar clubes</button>
          <button onClick={handleGamesList}>Montar tabela de jogos</button>
        </div>
        <Tabs tab={tab} games={games} teams={teams} />
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
        <ul>
          {teams.map((team) => (
            <li key={team}>{team}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (tab === "games-tab") {
    return (
      <div>
        {games.map((game) => (
          <p key={game}>{game}</p>
        ))}
      </div>
    );
  }

  return null;
}
