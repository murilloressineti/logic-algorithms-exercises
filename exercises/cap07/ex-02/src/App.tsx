import "./index.css";

/*
Uma palavra ou frase é um palíndromo quando pode ser lida nos dois sentidos, como RADAR, MUSSUM, ABBA. Elaborar um programa que leia uma frase e informe se ela é ou não um palíndromo (converter a frase para caixa alta). A Figura 6.18 apresenta uma frase que é um palíndromo.
*/

function Card() {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-lg md:min-w-lg">
      <h2 className="bg-blue-500 rounded-t-md p-2 text-white text-center uppercase font-bold">
        Verificar se é palíndromo
      </h2>

      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium">
            Passo 1: Digite a palavra ou frase:
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Exemplo: RADAR, ABBA, 'A torre da derrota'"
            className="border rounded-md p-1 border-blue-600 h-20 resize-none"
          />
        </div>

        <button className="bg-blue-500 p-2 rounded-md text-white uppercase cursor-pointer transition-all duration-300 hover:bg-blue-600">
          🔍 Verificar
        </button>

        <hr className="border-slate-400" />

        <div className="flex flex-col gap-2">
          <label className="font-medium">Resultado da Verificação:</label>
          <div className="border-2 rounded-md p-2 border-green-600 bg-green-100 h-20 resize-none text-center uppercase">
            <h3 className="font-medium">É um palíndromo</h3>
            <p>'FRASE' lida de trás para frente é 'FRASE'</p>
          </div>
        </div>
      </div>
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
