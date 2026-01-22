import { useState } from "react";
import "./styles.css";

/**
 * Elaborar um programa que adicione números a um vetor.
 * O programa deve impedir a inclusão de números repetidos.
 * Exibir a lista de números a cada inclusão.
 * Ao clicar no botão Verificar Ordem, o programa deve analisar o conteúdo do vetor e informar se os números estão ou não em ordem crescente.
 */

function Header() {
  return (
    <div>
      <h1>Programa Nümeros em Ordem</h1>
    </div>
  );
}

const DEFAULT_NUMBERS: number[] = [];

function Card() {
  const [numberValue, setNumberValue] = useState(DEFAULT_NUMBERS);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formData = new FormData(event.currentTarget);
    const inputValue = formData.get("number") as string;

    // 3. Conversão para Number
    const newNumber = Number(inputValue);

    // 4. Validações
    // 4.1 Não adicionar vazio ou se não for número.
    if (inputValue.trim() === "" || isNaN(newNumber)) {
      alert("Digite um número válido.");
      return;
    }

    //4.2 Impede a incllusão de números repetidos.
    if (numberValue.includes(newNumber)) {
      alert("Este número já foi adicionado!");
      return;
    }

    // 5. Adiciona o número ao estado
    setNumberValue((prevNumbers) => [...prevNumbers, newNumber]);

    // 6. Limpa o input após adicionar
    event.currentTarget.reset();
  }

  console.log(numberValue)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="number">Número:</label>
        <input type="text" name="number" id="number" />
        <button type="submit">Adicionar</button>
      </form>

      <button type="button">Verificar Ordem</button>
    </div>
  );
}

function Result() {
  return (
    <div>
      <h3>Números: 4, 10, 15, 12, 24</h3>
      <h4>
        <i>Atenção... Números não estão em ordem crescente.</i>
      </h4>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <Header />
      <Card />
      <Result />
    </main>
  );
}
