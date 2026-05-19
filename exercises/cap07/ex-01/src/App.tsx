/**
 Você deve desenvolver um programa de criptogra para transmitir mensagens entre amigos. O programa deve ler uma mensagem e, em seguida, exibi-la criptografada. A criptogra a consiste em: a) exibir todas as letras das posições pares da mensagem; b) exibir todas as letras das posições ímpares da mensagem. A Figura 6.15 exibe a mensagem criptografada. O programa deve conter ainda um botão para decriptografar a mensagem, ou seja, retornar a mensagem original a partir do texto cifrado
**/

import { useState } from "react";
import "./index.css";

function CardEncrypt() {
  const [messageEncrypt, setMessageEncrypt] = useState("");

  function handleSubmit(event: any) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formEncrypt = new FormData(event.currentTarget);
    const inputEncrypt = formEncrypt.get("messageEncrypt") as string;

    // 3. Validações
    if (inputEncrypt.trim() === "") {
      alert("Digite uma mensagem válida");
      return;
    }

    // 4. Lógica
    let even = "";
    let odd = "";
    let size = inputEncrypt.length;

    for (var i = 0; i < size; i++) {
      if (i % 2 === 0) {
        even += inputEncrypt[i];
      } else {
        odd += inputEncrypt[i];
      }
    }

    const result = even + odd;
    setMessageEncrypt(result);
  }

  return (
    <form
      className="border border-blue-500 rounded-md md:min-w-md bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="bg-blue-600 p-2 text-white uppercase rounded-t-md text-center text-xl font-medium">
        Criptografar mensagem
      </h2>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-medium text-center text-xl">Criptografar</h3>

        <div className="flex flex-col gap-2">
          <label htmlFor="messageEncrypt">
            <span className="font-medium">Passo 1:</span> Digite a mensagem
          </label>
          <textarea
            id="messageEncrypt"
            name="messageEncrypt"
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

          <label htmlFor="">Mensagem Criptografada</label>
          <textarea
            readOnly
            value={messageEncrypt}
            className="border-2 rounded-md p-1 border-slate-400 bg-slate-200 h-20 resize-none"
          />
        </div>
      </div>
    </form>
  );
}

function CardDecrypt() {
  const [messageDecrypt, setMessageDecrypt] = useState("");

  function handleSubmit(event: any) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const formDecrypt = new FormData(event.currentTarget);
    const inputDecrypt = formDecrypt.get("messageDecrypt") as string;

    // 3. Validações
    if (inputDecrypt.trim() === "") {
      alert("Digite uma mensagem válida");
      return;
    }

    // 4. Lógica
    let half = Math.ceil(inputDecrypt.length / 2);
    let even = inputDecrypt.slice(0, half); // Pega do início até o ponto de corte
    let odd = inputDecrypt.slice(half); // Pega do ponto de corte até o final

    let original = "";

    for (var i = 0; i < half; i++) {
      original += even[i]; // Pega a 1ª letra do primeiro balde

      if (odd[i] !== undefined) {
        original += odd[i]; // Pega a 1ª letra do segundo balde (se existir)
      }
    }

    setMessageDecrypt(original);
  }

  return (
    <form
      className="border border-blue-500 rounded-md md:min-w-md bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="bg-blue-600 p-2 text-white uppercase rounded-t-md text-center text-xl font-medium">
        Descriptografar mensagem
      </h2>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-medium text-center text-xl">Descriptografar</h3>

        <div className="flex flex-col gap-2">
          <label htmlFor="messageDecrypt">
            <span className="font-medium">Passo 1:</span> Digite a criptografada
          </label>
          <textarea
            id="messageDecrypt"
            name="messageDecrypt"
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

          <label htmlFor="">Mensagem Original</label>
          <textarea
            readOnly
            value={messageDecrypt}
            className="border-2 rounded-md p-1 border-slate-400 bg-slate-200 h-20 resize-none"
          />
        </div>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-10">
      <h1 className="text-2xl font-bold mb-4">Criptografia de Mensagens</h1>

      <div className="flex flex-col md:flex-row gap-4 border border-slate-400 bg-slate-200 p-4 rounded-md">
        <CardEncrypt />
        <CardDecrypt />
      </div>
    </div>
  );
}
