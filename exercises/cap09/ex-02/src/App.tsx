/*
  Elaborar um programa para cadastrar produtos na lista de compras da semana. Salvar e exibir a listagem dos produtos em ordem alfabética.
*/

import { useEffect, useState } from "react";

type ListProps = {
  setProducts: React.Dispatch<React.SetStateAction<string[]>>; // O tipo React.Dispatch<React.SetStateAction<string[]>> é uma função que recebe um novo estado (que pode ser do tipo string[] ou uma função que retorna string[]) e atualiza o estado do componente. Essa função é usada para atualizar o estado do componente quando um novo produto é adicionado à lista de compras.
};

type ResultProps = {
  products: string[];
  handleSaveProducts: () => void;
};

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

function List({ setProducts }: ListProps) {
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

    console.log("Produto digitado:", inputProduct);

    // O React irá comparar o estado anterior com o novo estado e, se houver mudanças, ele irá re-renderizar os componentes que dependem desse estado. Se o estado for atualizado com um valor diferente do anterior, o React irá perceber a mudança e atualizar a interface do usuário de acordo.
    setProducts((prevState) => {
      console.log("Estado anterior:", prevState);

      const newState = [...prevState, inputProduct];

      console.log("Novo estado:", newState);

      return newState;
    });

    event.currentTarget.reset();
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

function Result({ products, handleSaveProducts }: ResultProps) {
  const sortedProducts = [...products].sort((a, b) =>
    a.localeCompare(b, "pt-BR", {
      sensitivity: "base",
    }),
  );

  function formatProductName(product: string) {
    return product.charAt(0).toUpperCase() + product.slice(1).toLowerCase();
  }

  return (
    <div className="bg-gray-100 p-4 w-full rounded-lg shadow-lg border-t-8 border-blue-600">
      <header className="mb-4">
        <h2 className="uppercase text-2xl font-bold">Sua lista de compras</h2>
      </header>

      <div className="flex flex-col gap-4 items-center justify-center">
        <ul className="list-disc space-y-1">
          {sortedProducts.map((product, index) => (
            <li key={index}>{formatProductName(product)}</li>
          ))}
        </ul>

        <div
          className={`border-green-700 bg-green-200 text-green-700 shadow-md rounded-md p-2 uppercase`}
        >
          <strong>Produtos cadastrados: {products.length}</strong>{" "}
        </div>

        <button
          type="button"
          onClick={handleSaveProducts}
          className="bg-blue-600 text-white uppercase font-medium w-full p-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 shadow-md"
        >
          Salvar lista
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState<string[]>([]);

  // Função para salvar a lista de produtos no LocalStorage.
  function handleSaveProducts() {
    localStorage.setItem("products", JSON.stringify(products));

    alert("Lista de compras salva com sucesso!");
  }

  // useEffect para carregar a lista de produtos do LocalStorage quando o componente for montado.
  useEffect(() => {
    const savedList = localStorage.getItem("products");

    if (savedList) {
      // Verifica se existe uma lista salva no LocalStorage. Se existir, ela é convertida de volta para um array de strings usando JSON.parse e o estado products é atualizado com essa lista.
      setProducts(JSON.parse(savedList));
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <Header />
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 py-10 max-w-280 mx-auto px-6">
        <List setProducts={setProducts} />
        <Result products={products} handleSaveProducts={handleSaveProducts} />
      </div>
    </div>
  );
}
