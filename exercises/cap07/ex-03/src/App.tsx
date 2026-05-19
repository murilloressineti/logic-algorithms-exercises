/*
Suponha que o prazo para o pagamento de uma infração de trânsito com desconto seja de 90 dias. Elaborar um programa que leia a data de uma infração e o valor da multa. Informe qual a data limite do pagamento com desconto (até 90 dias) e o valor a ser pago até essa data (com 20% dedesconto).
*/

import { useState } from "react";
import "./index.css";

function Card() {
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Formata o valor para o formato de moeda brasileira. Deixamos ele fora do handleSubmit para não criar uma nova instância a cada submissão do formulário, o que pode impactar a performance.
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputDate = form.get("date") as string;
    const inputPrice = form.get("price") as string;

    // 3. Validações
    // 3.1 Validação Data
    if (inputDate.trim() === "") {
      alert("Digite uma data válida");
      return;
    }

    // 3.2 Remove os pontos e substitui a vírgula por ponto para converter para número
    const cleanPrice = parseFloat(
      inputPrice.replace(/\./g, "").replace(",", "."),
    );

    // 3.3 Validação do valor da multa
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      alert("Digite valores válidos");
      return;
    }

    // 4. Lógica do Preço
    const originalPrice = cleanPrice;
    const discountPrice = originalPrice * 0.8; // Multa com desconto
    const discountValue = originalPrice * 0.2; // Desconto da multa

    // 5. Lógica da Data
    const deadline = new Date(inputDate); // Converte a string de data para um objeto Date
    deadline.setDate(deadline.getDate() + 90); // Adiciona 90 dias à data da infração

    // 6. Atualiação do estado
    setResult({
      deadline: deadline.toLocaleDateString("pt-BR"),
      originalPrice: formattedPrice.format(originalPrice),
      discountPrice: formattedPrice.format(discountPrice),
      discountValue: formattedPrice.format(discountValue),
    });

    setShowResult(true);
  }

  return (
    <div className="bg-white w-md md:w-xl p-4 rounded-md shadow-lg">
      <h1 className="font-bold text-center text-xl mb-2">
        Calculadora de Multas com Desconto
      </h1>

      <h2 className="bg-blue-900 text-white uppercase font-bold text-center rounded-t-md p-2">
        Pagamento de infração com desconto
      </h2>

      <div className="rounded-md shadow-md py-4 px-2">
        <form
          className="flex flex-col md:flex-row justify-between gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:w-1/2">
            <h3 className="uppercase font-medium">Dados da infração</h3>

            <label htmlFor="date">
              <span className="font-medium">Passo 1:</span> Data da Infração:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="01/01/2026"
              className="border border-slate-300 rounded-md p-1 mb-2"
            />

            <label htmlFor="price">
              <span className="font-medium">Passo 2:</span> Valor da multa (R$):
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="1.000,00"
              className="border border-slate-300 rounded-md p-1 mb-2"
            />
          </div>

          <div className="md:w-1/2">
            <h3 className="uppercase font-medium">Calcular desconto</h3>
            <p className="text-sm">
              Para pagar com desconto, informe a data da infração e o valor
              orignial.
            </p>

            <div className="flex flex-col items-center justify-center my-4">
              <button className="bg-green-800 p-2 rounded-md text-white uppercase cursor-pointer transition-all duration-300 hover:bg-green-700 w-full shadow-md">
                Caclular desconto (20%)
              </button>
              <span className="text-xs mt-1 font-medium">
                Válido por 90 dias após a infração.
              </span>
            </div>
          </div>
        </form>

        <hr className="border-slate-400 my-4" />

        {showResult && (
          <div className="flex flex-col gap-2">
            <h3 className="uppercase font-medium">Resultados do cálculo</h3>

            <div className="bg-green-100 border-2 border-green-200 text-green-800 rounded-md uppercase font-semibold p-4 text-center">
              <p>Data limite para pagamento com desconto:</p>
              <p>{result.deadline}</p>
            </div>

            <div className="bg-green-100 border-2 border-green-200 text-green-800 rounded-md uppercase font-semibold p-4 text-center">
              <p>Valor com desconto a ser pago (R$):</p>
              <p>{result.discountPrice}</p>
              <p className="text-xs text-black">
                {result.originalPrice} - 20% ({result.discountValue}) ={" "}
                {result.discountPrice}
              </p>
            </div>

            <span className="text-xs mb-2 text-center font-medium">
              O pagamento com 20% de desconto deve ser realizado até a data
              limite.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-slate-200 p-10">
      <Card />
    </div>
  );
}
