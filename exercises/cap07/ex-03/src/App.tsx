import "./index.css";

/*
Suponha que o prazo para o pagamento de uma infração de trânsito com desconto seja de 90 dias. Elaborar um programa que leia a data de uma infração e o valor da multa. Informe qual a data limite do pagamento com desconto (até 90 dias) e o valor a ser pago até essa data (com 20% dedesconto).
*/

function Card() {
  return (
    <div className="bg-white w-xl p-4 rounded-md shadow-lg">
      <h1 className="font-bold text-center text-xl mb-2">
        Calculadora de Multas com Desconto
      </h1>

      <h2 className="bg-blue-900 text-white uppercase font-bold text-center rounded-t-md p-2">
        Pagamento de infração com desconto
      </h2>

      <div className="rounded-md shadow-md py-4 px-2">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col w-1/2">
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

            <label htmlFor="value">
              <span className="font-medium">Passo 2:</span> Valor da multa (R$):
            </label>
            <input
              type="text"
              id="value"
              name="value"
              placeholder="1.000,00"
              className="border border-slate-300 rounded-md p-1 mb-2"
            />
          </div>

          <div className="w-1/2">
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
        </div>

        <hr className="border-slate-400 my-4" />

        <div className="flex flex-col gap-2">
          <h3 className="uppercase font-medium">Resultados do cálculo</h3>

          <div className="bg-green-100 border-2 border-green-200 text-green-800 rounded-md uppercase font-semibold p-4 text-center">
            <p>Data limite para pagamento com desconto:</p>
            <p>15/04/2026</p>
          </div>

          <div className="bg-green-100 border-2 border-green-200 text-green-800 rounded-md uppercase font-semibold p-4 text-center">
            <p>Valor com desconto a ser pago (R$):</p>
            <p>800,00</p>
            <p className="text-sm text-black">
              R$ 1.000,00 - 20% (R$ 200,00) = R$ 800,00
            </p>
          </div>

          <span className="text-xs mb-2 text-center font-medium">
            O pagamento com 20% de desconto deve ser realizado até a data
            limite.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-slate-200">
      <Card />
    </div>
  );
}
