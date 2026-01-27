import { ReactHTMLElement, useState } from "react";
import "./styles.css";

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

const DEFAULT_CANDIDATES: string[] = [];

function Card() {
  const [candidates, setCandidatees] = useState<{name: string; hits: number}[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formData = new FormData(event.currentTarget);
    const nameValue = formData.get("name") as string;
    const numberInput = formData.get("hits") as string;

    // 3. Conversão para Number
    const numberValue = Number(numberInput);

    // 4. Validações
    if (nameValue.trim() === "" || isNaN(numberValue)) {
      alert("Digite um valor válido.");
      return;
    }

    if (candidates.some(candidate => candidate.name === nameValue)) {
      alert("Esse nome já foi adicionado.");
      return;
    }

    // 5. Adiciona o objeto completo ao estado
    const newCandidate = {name: nameValue, hits: numberValue}

    setCandidatees((prevValue) => [...prevValue, newCandidate])

    // 6. Limpa o input após adicionar
    event.currentTarget.reset();
  }

  console.log(candidates)

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
        <input type="button" value="Listar Todos" />
        <input type="button" value="Aprovados 2ª Etapa" />
      </div>

      <div>
        <p>Eduardo: 36 acertos</p>
      </div>
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
