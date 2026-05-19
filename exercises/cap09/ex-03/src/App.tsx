/*
  Elaborar um programa para cadastrar os serviços a serem realizados por um auto center, que organize a ordem de execução dos serviços. Armazenar os serviços no navegador do usuário e a cada clique no botão "Executar Serviço" remover o primeiro serviço e exibi-lo na página. O programa deve atualizar o número de serviços pendentes quando: 
  a) a página for aberta; 
  b) um serviço for incluído; 
  c) um serviço for removido.
*/

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

function AddService() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputProduct = form.get("product") as string;

    // 3. Validações
    if (inputProduct.trim() === "") {
      alert("Digite um produto válido");
      return;
    }
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-teal-600">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Adicionar serviço</h2>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Preço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product" className="font-medium">
            Nome do serviço
          </label>
          <input
            type="text"
            placeholder="Ex.: Troca de Óleo, Alinhamento, etc."
            id="product"
            name="product"
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
          className={`border-green-700 bg-green-200 text-green-700 shadow-md rounded-md p-2 text-center`}
        >
          Serviço "Troca de óleo" adicionado com sucesso
        </p>
      </form>
    </div>
  );
}

function ExecuteService() {
  return (
    <div className="bg-gray-200 p-4 w-full rounded-lg shadow-lg border-t-8 border-slate-800">
      <header className="mb-4 flex justify-between">
        <h2 className="uppercase text-2xl font-bold">Serviços pendentes</h2>
        <span className="text-2xl">⏱️</span>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="space-y-3">
          <li className="p-3 rounded-xl bg-slate-50 border border-slate-300">
            <span className="text-slate-700 font-medium">
              Serviço 1: Troca de Óleo
            </span>
          </li>

          <li className="p-3 rounded-xl bg-slate-50 border border-slate-300">
            <span className="text-slate-700 font-medium">
              Serviço 2: Alinhamento
            </span>
          </li>
        </ul>

        <div
          className={`border-orange-700 bg-orange-200 text-orange-700 shadow-md rounded-md p-2 uppercase`}
        >
          <strong>Em fila: 2</strong>{" "}
        </div>

        <button
          type="button"
          className="bg-slate-800 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-slate-600 shadow-md"
        >
          Executar serviço
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <AddService />
        <ExecuteService />
      </div>
    </div>
  );
}
