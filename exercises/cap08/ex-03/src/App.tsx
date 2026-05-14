/*
  Elaborar um programa para uma veterinária, o qual leia o preço de uma vacina e se o cliente possui ou não convênio. Caso possua algum convênio, exibir uma caixa de seleção com os convênios “Amigo dos Animais” e “Saúde Animal”. O programa deve exibir o valor do desconto (10% sem convênio; 20% para “Amigo dos Animais”; 50% para “Saúde Animal”) e o valor a ser pago. Criar a função:
  • calcularDesconto() – que receba os parâmetros valor e taxa de desconto. Retornar o valor do desconto. 
*/

import React, { useState } from "react";

function Header() {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-2 max-w-280 mx-auto py-10 px-6">
        <span className="text-4xl">🐾</span>
        <h1 className="text-black text-3xl font-bold uppercase">
          Veterinária amigo dos animais
        </h1>
      </div>
    </div>
  );
}

function Vaccine({ setResult }: any) {
  const [hasAgreement, setHasAgreement] = useState("Sim");

  const formattedCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputPrice = form.get("price") as string;
    const inputHasAgreement = form.get("hasAgreement") as string;
    const inputAgreementType = form.get("agreementType") as string;

    // 3. Validações
    // 3.1 Remove os pontos e substitui a vírgula por ponto para converter para número
    const cleanPrice = parseFloat(
      inputPrice.replace(/\./g, "").replace(",", "."),
    );

    // 3.2 Validação do valor da vacina
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      alert("Digite valores válidos");
      return;
    }

    // 4. Passa os valores capturados para a função de calcular
    const discountResult = calcDiscount(
      cleanPrice,
      inputHasAgreement,
      inputAgreementType,
    );

    // 4.1 Salva dentro do state
    setResult(discountResult);
  }

  function calcDiscount(
    price: number,
    hasAgreement: string,
    agreementType: string,
  ) {
    let agreementName = agreementType;

    if (hasAgreement !== "Sim") {
      agreementName = "Não possui";
    }

    let discountPercentage = 0;

    if (hasAgreement === "Sim") {
      if (agreementType === "Amigo dos Animais") {
        discountPercentage = 20;
      } else if (agreementType === "Saúde Animal") {
        discountPercentage = 50;
      }
    } else {
      discountPercentage = 10;
    }

    const discountValue = (price * discountPercentage) / 100;

    const finalPrice = price - discountValue;

    return {
      originalPrice: formattedCurrency.format(price),
      finalPrice: formattedCurrency.format(finalPrice),
      discountValue: formattedCurrency.format(discountValue),
      discountPercentage,
      agreementType: agreementName,
    };
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-green-700">
      <header className="flex items-end justify-between gap-4 rounded-lg mb-4">
        <h2 className="uppercase text-2xl font-bold">Dados da vacina</h2>
        <span className="text-4xl">🪪</span>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Preço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="font-medium">
            Preço da vacina (R$)
          </label>
          <input
            type="text"
            placeholder="200,00"
            id="price"
            name="price"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        {/* Convênio */}
        <fieldset className="flex flex-col gap-1">
          <legend className="font-medium">Cliente possui convênio?</legend>

          <div className="flex gap-4">
            <label className="flex items-center gap-1" htmlFor="agreement-yes">
              <input
                type="radio"
                id="agreement-yes"
                name="hasAgreement"
                value="Sim"
                defaultChecked
                onChange={(event) => {
                  setHasAgreement(event.target.value);
                }}
              />
              <span>SIM</span>
            </label>

            <label className="flex items-center gap-1" htmlFor="agreement-no">
              <input
                type="radio"
                id="agreement-no"
                name="hasAgreement"
                value=""
                onChange={(event) => {
                  setHasAgreement(event.target.value);
                }}
              />
              <span>NÃO</span>
            </label>
          </div>
        </fieldset>

        {/* Tipo de convênio */}
        {hasAgreement && (
          <div className="flex flex-col gap-1">
            <label htmlFor="agreementType" className="font-medium">
              Selecione o convênio
            </label>

            <select
              id="agreementType"
              name="agreementType"
              className="border border-slate-400 rounded-md p-2 shadow-md"
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="Amigo dos Animais">Amigo dos Animais</option>
              <option value="Saúde Animal">Saúde Animal</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-700 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 shadow-md"
        >
          Calcular pagamento
        </button>
      </form>
    </div>
  );
}

function Result({ result }: any) {
  return (
    <div className="bg-gray-100 p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-500">
      <header className="mb-4 md:mb-0">
        <h2 className="uppercase text-2xl font-bold">Cálculo do pagamento</h2>
      </header>

      {result && (
        <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
          {/* Resultado final */}
          <div
            className={`border-green-700 bg-green-200 text-green-700  shadow-md rounded-md p-4 uppercase`}
          >
            <strong>Valor a pagar: {result.finalPrice}</strong>
          </div>

          {/* Informações do cálculo */}
          <div className="flex flex-col gap-2">
            <p className="text-lg">
              <span className="font-semibold">Valor original: </span>
              {result.originalPrice}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Convênio:</span>{" "}
              {result.agreementType}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Desconto aplicado:</span>{" "}
              {result.discountPercentage}% ({result.discountValue})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [result, setResult] = useState("");

  return (
    <div className="min-h-screen bg-green-100">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <Vaccine setResult={setResult} />
        <Result result={result} />
      </div>
    </div>
  );
}
