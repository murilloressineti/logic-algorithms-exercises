import { useState } from "react";
import "./index.css";

/**
 * Elaborar um programa que leia nome e número de acertos de candidatos inscritos em um concurso.
 * Listar os dados a cada inclusão.
 * Ao clicar no botão Aprovados 2ª Fase, ler o número de acertos para aprovação dos candidatos para a 2ª fase do concurso.
 * O programa deve, então, exibir os candidatos aprovados, ou seja, apenas os que obtiveram nota maior ou igual à nota informada.
 * Exibir os candidatos aprovados em ordem decrescente de número de acertos.
 * Caso nenhum candidato tenha sido aprovado, exibir mensagem.
 */

function Header() {
  return (
    <div>
      <h1>Programa Concurso</h1>
    </div>
  );
}

function Card() {
  const [candidates, setCandidatees] = useState<
    { name: string; hits: number }[]
  >([]);
  const [showList, setShowList] = useState(false);
  const [approvedCandidates, setApprovedCandidates] = useState<
    { name: string; hits: number }[]
  >([]);
  const [approved, setApproved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formData = new FormData(event.currentTarget);
    const nameInput = formData.get("name") as string;
    const numberInput = formData.get("hits") as string;

    // 3. Conversões
    const nameValue = nameInput.toLowerCase();
    const numberValue = Number(numberInput);

    // 4. Validações
    if (nameValue.trim() === "" || isNaN(numberValue)) {
      alert("Digite um valor válido.");
      return;
    }

    if (candidates.some((candidate) => candidate.name === nameValue)) {
      alert("Esse nome já foi adicionado.");
      return;
    }

    // 5. Adiciona o objeto completo ao estado
    const newCandidate = { name: nameValue, hits: numberValue };

    setCandidatees((prevValue) => [...prevValue, newCandidate]);

    // 6. Limpa o input após adicionar
    event.currentTarget.reset();
  }

  function list() {
    setShowList(true);
    setApproved(false);
  }

  function showApproved() {
    const cutoff = Number(prompt("Qual o número de acertos para aprovação?"));

    if (isNaN(cutoff) || cutoff < 0) return;

    // 1. Filtrar e ordenar
    const filterAndSorted = [
      ...candidates.filter((c) => c.hits >= cutoff),
    ].sort((a, b) => b.hits - a.hits);

    setApprovedCandidates(filterAndSorted);
    setApproved(true);
    setShowList(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Candidato:</label>
        <input type="text" name="name" id="name" /> <br />
        <br />
        <label htmlFor="hits">Nº Acertos:</label>
        <input type="number" name="hits" id="hits" min={0} />
        <input type="submit" value="Adicionar" />
        <br />
        <br />
      </form>

      <div>
        <input type="button" value="Listar Todos" onClick={list} />
        <input
          type="button"
          value="Aprovados 2ª Etapa"
          onClick={showApproved}
        />
      </div>

      <br />

      {showList && (
        <div>
          {candidates.length > 0 ? (
            <>
              <h3>Lista de Candidatos</h3>
              <ul>
                {candidates.map((c, index) => (
                  <li key={index}>
                    {c.name}: {c.hits} acertos
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum candidato cadastrado.</p>
          )}
        </div>
      )}

      {approved && (
        <div>
          {approvedCandidates.length > 0 ? (
            <>
              <h3>Candidatos Aprovados - 2ª Etapa</h3>
              <ul>
                {approvedCandidates.map((c, index) => (
                  <li key={index}>
                    {c.name}: {c.hits} acertos
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum candidato foi aprovado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <main>
      <Header />
      <Card />
    </main>
  );
}
