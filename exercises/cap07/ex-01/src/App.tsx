import "./index.css";

/**
 Você deve desenvolver um programa de criptogra para transmitir mensagens entre amigos. O programa deve ler uma mensagem e, em seguida, exibi-la criptografada. A criptogra a consiste em: a) exibir todas as letras das posições pares da mensagem; b) exibir todas as letras das posições ímpares da mensagem. A Figura 6.15 exibe a mensagem criptografada. O programa deve conter ainda um botão para decriptografar a mensagem, ou seja, retornar a mensagem original a partir do texto cifrado
 */

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">Criptografia de Mensagens</h1>

      <div className="flex gap-4 border border-slate-400 bg-slate-200 p-4 rounded-md">
        <div className="border border-blue-500 rounded-md min-w-md bg-white">
          <h2 className="bg-blue-600 p-2 text-white uppercase rounded-t-md text-center text-xl font-medium">
            Criptografar mensagem
          </h2>

          <div className="flex flex-col gap-2 p-4">
            <h3 className="font-medium text-center text-xl">Criptografar</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="message">
                <span className="font-medium">Passo 1:</span> Digite a mensagem
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Exemplo de mensagem para testar"
                className="border-2 rounded-md p-1 border-blue-600 h-20 resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <span className="font-medium">Passo 2:</span> Clique no botão
              </label>

              <button className="bg-blue-500 p-2 rounded-md text-white uppercase cursor-pointer transition-all duration-300 hover:bg-blue-600">
                🔒 Criptogragar
              </button>

              <label htmlFor="">Mensagem Criptografada (Saída)</label>
              <textarea
                readOnly
                className="border-2 rounded-md p-1 border-slate-400 bg-slate-200 h-20 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="border border-blue-500 rounded-md min-w-md bg-white">
          <h2 className="bg-blue-600 p-2 text-white uppercase rounded-t-md text-center text-xl font-medium">
            Descriptografar mensagem
          </h2>

          <div className="flex flex-col gap-2 p-4">
            <h3 className="font-medium text-center text-xl">Descriptografar</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="message">
                <span className="font-medium">Passo 1:</span> Digite a
                menografada (Entrada)
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Exemplo de mensagem para testar"
                className="border-2 rounded-md p-1 border-blue-600 h-20 resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                <span className="font-medium">Passo 2:</span> Clique no botão
              </label>

              <button className="bg-blue-500 p-2 rounded-md text-white uppercase cursor-pointer transition-all duration-300 hover:bg-blue-600">
                🔓 Descriptografar
              </button>

              <label htmlFor="">Mensagem Original (Saída)</label>
              <textarea
                readOnly
                className="border-2 rounded-md p-1 border-slate-400 bg-slate-200 h-20 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
