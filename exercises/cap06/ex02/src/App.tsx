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
      <h1>Programa Números em Ordem</h1>
    </div>
  );
}

const DEFAULT_NUMBERS: number[] = [];

function Card() {
  const [numberValue, setNumberValue] = useState(DEFAULT_NUMBERS);
  const [result, setResult] = useState(false);
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

    //4.2 Impede a inclusão de números repetidos.
    if (numberValue.includes(newNumber)) {
      alert("Este número já foi adicionado!");
      return;
    }

    // 5. Adiciona o número ao estado
    setNumberValue((prevNumbers) => [...prevNumbers, newNumber]);

    // 6. Limpa o input após adicionar
    event.currentTarget.reset();
  }

  function checkOrder() {
    // Validação para verificar 2 números ou mais.
    if(numberValue.length < 2 ) {
      alert("Deve ter pelo menos 2 números para verificar a ordem.")
    }

    let orderOk = true
    for (let i = 0; i < numberValue.length - 1; i++) {
      // Se o elemento na posição i for MAIOR que o elemento na posição i + 1
      if(numberValue[i] > numberValue[i + 1]) {
        orderOk = false
        break
      }
    }

    if (orderOk) {
      setMessage("Os números estão em ordem crescente!")
    } else {
      setMessage("Atenção... Números não estão em ordem crescente.")
    }
    
    setResult(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="number">Número:</label>
        <input type="text" name="number" id="number" />
        <button type="submit">Adicionar</button>
      </form>

      <button type="button" onClick={checkOrder}>
        Verificar Ordem
      </button>

      <div>
        <h3>Números: {numberValue.join(", ")}</h3>
      </div>

      {result && (
        <div>
          <h4>
            <i>{message}</i>
          </h4>
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
