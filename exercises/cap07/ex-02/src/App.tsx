import { useState } from "react";
import "./index.css";

/*
Uma palavra ou frase é um palíndromo quando pode ser lida nos dois sentidos, como RADAR, MUSSUM, ABBA. Elaborar um programa que leia uma frase e informe se ela é ou não um palíndromo (converter a frase para caixa alta).
*/

function Card() {
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  function handleSubmit(event: any) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const input = form.get("message") as string;

    // 3. Validações
    if (input.trim() === "") {
      alert("Digite uma palavra ou frase válida");
      return;
    }

    // 4. Lógica
    // 4.1 Converte em maiúscula e remove caracteres não alfanuméricos
    const clean = input.toUpperCase().replace(/[\W_]/g, "");

    // 4.2 Inverte a string
    const reverse = clean.split("").reverse().join(""); // split() divide a string em um array de caracteres, reverse() inverte a ordem dos elementos do array e join() junta os elementos de volta em uma string

    // 4.3 Comparação
    const isPalindrome = clean === reverse;

    // 4.4 Atualiza o estado com um objeto
    setResult({
      clean,
      reverse,
      isPalindrome,
    });
    setShowResult(true);
  }
  return (
    <div className="flex flex-col bg-white rounded-md shadow-lg w-lg">
      <h2 className="bg-blue-500 rounded-t-md p-2 text-white text-center uppercase font-bold">
        Verificar se é palíndromo
      </h2>

      <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium">
            Passo 1: Digite a palavra ou frase:
          </label>
          <input
            id="message"
            name="message"
            placeholder="Exemplo: RADAR, ABBA, 'A torre da derrota'"
            className="border rounded-md p-1 border-blue-600"
          />
        </div>

        <button className="bg-blue-500 p-2 rounded-md text-white uppercase cursor-pointer transition-all duration-300 hover:bg-blue-600">
          🔍 Verificar
        </button>

        <hr className="border-slate-400" />

        {showResult && (
          <div className="flex flex-col gap-2">
            <label className="font-medium">Resultado da Verificação:</label>

            <div
              className={`border-2 rounded-md p-2 h-24 text-center flex flex-col items-center justify-center
              ${result.isPalindrome ? "border-green-600 bg-green-100" : "border-red-600 bg-red-100"}
              `}
            >
              <h3 className="font-medium uppercase">
                {result.isPalindrome
                  ? "É um palíndromo!"
                  : "Não é um palíndromo!"}
              </h3>
              <p>
                '{result.clean}' lida de trás para frente é '{result.reverse}'
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">Verificador de Palíndromos</h1>
      <Card />
    </div>
  );
}
