/*
  Elaborar um programa para cadastrar os serviços a serem realizados por um auto center, que organize a ordem de execução dos serviços. Armazenar os serviços no navegador do usuário e a cada clique no botão "Executar Serviço" remover o primeiro serviço e exibi-lo na página. O programa deve atualizar o número de serviços pendentes quando: 
  a) a página for aberta; 
  b) um serviço for incluído; 
  c) um serviço for removido.
*/

import { useEffect, useState } from "react";

type ServiceProps = {
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
};

type ExecuteServiceProps = {
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
};

function Header() {
  return (
    <div className="bg-slate-800">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-3xl text-white font-bold uppercase">
          Auto center serviço rápido
        </h1>
        <span className="text-4xl">⚙️</span>
      </div>
    </div>
  );
}

function AddService({ setServices }: ServiceProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return; // Se não exister mensagem não faz nada.

    const timer = setTimeout(() => {
      // Quando a mensagem aparece, espera 3 segundos e limpa a mensagem.
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup do efeito. Cancela timers antigos, evita bugs.
  }, [message]);

  function formatProductName(service: string) {
    return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputService = form.get("service") as string;

    // 3. Validações
    if (inputService.trim() === "") {
      alert("Digite um serviço válido");
      return;
    }

    // 4. Atualiza o estado do componente com o novo serviço
    setServices((prevState) => {
      console.log("Estado anterior:", prevState);

      const newState = [...prevState, inputService];

      console.log("Novo estado:", newState);

      return newState;
    });

    setMessage(
      `Serviço "${formatProductName(inputService)}" adicionado com sucesso`,
    );

    event.currentTarget.reset();
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-teal-600">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Adicionar serviço</h2>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Serviço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="service" className="font-medium">
            Nome do serviço
          </label>
          <input
            type="text"
            placeholder="Ex.: Troca de Óleo, Alinhamento, etc."
            id="service"
            name="service"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-800 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-slate-600 shadow-md"
        >
          Adicionar
        </button>

        <p
          className={`border-green-700 bg-green-200 text-green-700 shadow-md rounded-md p-2 text-center transition-all duration-500 transform
            ${message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {message || " "}
        </p>
      </form>
    </div>
  );
}

function ExecuteService({ services, setServices }: ExecuteServiceProps) {
  function handleExecuteService() {
    if (services.length === 0) {
      alert("Não existem serviços pendentes");
      return;
    }

    setServices((prevState) => prevState.slice(1));
    alert("Serviço executado com sucesso!");
  }

  function formatProductName(service: string) {
    return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
  }

  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-slate-800">
      <header className="mb-4 flex justify-between ">
        <h2 className="uppercase text-2xl font-bold">Serviços pendentes</h2>
        <span className="text-2xl">⏱️</span>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="space-y-3">
          {services.map((service, index) => (
            <li
              key={index}
              className="p-3 rounded-xl bg-slate-50 border border-slate-300"
            >
              <span className="text-slate-700 font-medium">
                Serviço {index + 1}: {formatProductName(service)}
              </span>
            </li>
          ))}
        </ul>

        <div
          className={`border-orange-700 bg-orange-200 text-orange-700 shadow-md rounded-md p-2 uppercase`}
        >
          <strong>Em fila: {services.length}</strong>{" "}
        </div>

        <button
          type="button"
          onClick={handleExecuteService}
          className="bg-slate-800 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-slate-600 shadow-md"
        >
          Executar serviço
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [services, setServices] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect para carregar a lista de serviços do LocalStorage quando o componente for montado.
  useEffect(() => {
    const savedList = localStorage.getItem("services");

    if (savedList) {
      // Verifica se existe uma lista salva no LocalStorage. Se existir, ela é convertida de volta para um array de strings usando JSON.parse e o estado products é atualizado com essa lista.
      setServices(JSON.parse(savedList));
    }
    setIsLoaded(true);
  }, []);

  // useEffect para salvar a lista de serviços no LocalStorage sempre que a lista de serviços for atualizada.
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("services", JSON.stringify(services));
  }, [services, isLoaded]);

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <AddService setServices={setServices} />
        <ExecuteService services={services} setServices={setServices} />
      </div>
    </div>
  );
}
