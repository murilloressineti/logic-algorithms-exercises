/*
  Elaborar um programa para cadastrar produtos na lista de compras da semana. Salvar e exibir a listagem dos produtos em ordem alfabética.
*/

function Header() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between gap-2 max-w-280 mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold uppercase">Lista de Compras</h1>
        <span className="text-4xl -scale-x-100">🛍️</span>
      </div>
    </div>
  );
}

function List() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. Impede o recarregamento da página
    event.preventDefault();

    // 2. Captura os dados do formulário
    const form = new FormData(event.currentTarget);
    const inputPrice = form.get("price") as string;

    // 3. Validações
    // 3.1 Remove os pontos e substitui a vírgula por ponto para converter para número
  }

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg border-t-8 border-cyan-500">
      <header className="flex items-end justify-between gap-4 rounded-lg mb-4">
        <h2 className="uppercase text-2xl font-bold">Adicionar produto</h2>
        <span className="text-4xl">🛒</span>
      </header>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Preço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="product" className="font-medium">
            Nome do produto
          </label>
          <input
            type="text"
            placeholder="Ex.: Bananas, Arroz, Sabonete"
            id="product"
            name="product"
            className="border border-slate-400 rounded-md p-1 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-500 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-600 shadow-md"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}

function Result() {
  return (
    <div className="bg-gray-100 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-600">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Sua lista de compras</h2>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="list-disc space-y-1">
          <li>Arroz</li>
          <li>Feijão</li>
          <li>Café</li>
        </ul>

        <div
          className={`border-green-700 bg-green-200 text-green-700 shadow-md rounded-md p-2 uppercase`}
        >
          <strong>Produtos cadastrados: 3</strong>{" "}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 shadow-md"
        >
          Salvar lista
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <List />
        <Result />
      </div>
    </div>
  );
}
