// URL da API (servidor Node)
const API_URL = "http://localhost:3000/produtos";

// Referências aos elementos HTML
const lista = document.getElementById("lista");
const form = document.getElementById("formProduto");

// Função para listar produtos (GET)
async function listarProdutos() {
  const resposta = await fetch(API_URL);
  const produtos = await resposta.json();

  lista.innerHTML = "";
  produtos.forEach(prod => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nome} - ${prod.descricao} - R$${prod.preco}
      <div>
        <button onclick="editarProduto(${prod.id})">Editar</button>
        <button onclick="excluirProduto(${prod.id})" style="background-color:red;">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Adicionar novo produto (POST)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const preco = document.getElementById("preco").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, descricao, preco })
  });

  form.reset();
  listarProdutos();
});

// Editar produto (PUT)
async function editarProduto(id) {
  const nome = prompt("Novo nome:");
  const descricao = prompt("Nova descrição:");
  const preco = prompt("Novo preço:");

  if (!nome || !descricao || !preco) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, descricao, preco })
  });

  listarProdutos();
}

// Excluir produto (DELETE)
async function excluirProduto(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  listarProdutos();
}

// Carregar lista ao abrir
listarProdutos();

