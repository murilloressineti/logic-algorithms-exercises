/**
 * Elaborar um programa que leia nome e número de acertos de candidatos inscritos em um concurso.
 * Listar os dados a cada inclusão.
 * Ao clicar no botão Aprovados 2ª Fase, ler o número de acertos para aprovação dos candidatos para a 2ª fase do concurso.
 * O programa deve, então, exibir os candidatos aprovados, ou seja, apenas os que obtiveram nota maior ou igual à nota informada.
 * Exibir os candidatos aprovados em ordem decrescente de número de acertos.
 * Caso nenhum candidato tenha sido aprovado, exibir mensagem.
*/

import { useState } from "react";
import "./index.css";

function Header() {
  return (
    <div className="text-3xl text-center font-medium text-blue-950 mb-8">
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
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-400 p-4 rounded-md"
      >
        <h2 className="text-center font-medium text-gray-500 mb-4">
          Adcionar Candidato
        </h2>

        <div className="flex gap-2 mb-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">
              Candidato:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-white p-1 rounded-md border border-gray-300"
              placeholder="Nome do Candidato"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="hits" className="font-medium">
              Nº Acertos:
            </label>
            <input
              type="number"
              name="hits"
              id="hits"
              min={0}
              className="bg-white p-1 rounded-md border border-gray-300"
              placeholder="Nº Acertos"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-950 text-white w-full rounded-md p-2 shadow-md cursor-pointer transition-all duration-300 hover:scale-95 "
        >
          Adicionar
        </button>
      </form>

      <div className="border-2 border-gray-400 p-4 rounded-md">
        <h2 className="text-center font-medium text-gray-500 mb-4">
          Ações e Visualização
        </h2>

        <div className="flex gap-2">
          <button
            onClick={list}
            className="bg-blue-500 text-white w-full rounded-md p-2 shadow-md cursor-pointer transition-all duration-300 hover:bg-blue-600"
          >
            Listar Todos
          </button>
          <button
            onClick={showApproved}
            className="bg-green-600 text-white w-full rounded-md p-2 shadow-md cursor-pointer transition-all duration-300 hover:bg-green-700"
          >
            Aprovados 2ª Etapa
          </button>
        </div>
      </div>

      <div className="border-2 border-gray-400 p-4 rounded-md">
        <h2 className="text-center font-medium text-gray-500 mb-4">
          Resultados
        </h2>

        {showList && (
          <div>
            {candidates.length > 0 ? (
              <>
                <h3 className="font-medium mb-2">Lista de Candidatos</h3>
                <ul>
                  {candidates.map((c, index) => (
                    <li
                      key={index}
                      className="odd:bg-gray-200 even:bg-white px-2 py-1"
                    >
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
                <h3 className="font-medium mb-2">
                  Candidatos Aprovados - 2ª Etapa
                </h3>
                <ul>
                  {approvedCandidates.map((c, index) => (
                    <li
                      key={index}
                      className="odd:bg-gray-200 even:bg-white px-2 py-1"
                    >
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
    </div>
  );
}

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-gray-100 p-4 rounded-xl">
        <Header />
        <Card />
      </div>
    </main>
  );
}
