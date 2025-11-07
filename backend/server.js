// Importa o framework Express
const express = require("express");
// Importa o CORS para liberar acesso do front-end
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware para entender JSON e permitir acesso de outros domínios
app.use(cors());
app.use(express.json());

// Banco de dados em memória (simples)
let produtos = [
  { id: 1, nome: "Notebook", descricao: "Notebook Dell", preco: 3500 },
  { id: 2, nome: "Mouse", descricao: "Mouse sem fio", preco: 80 }
];

// ROTA GET - listar todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// ROTA POST - adicionar novo produto
app.post("/produtos", (req, res) => {
  const novoProduto = {
    id: produtos.length + 1,
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco
  };
  produtos.push(novoProduto);
  res.status(201).json({ mensagem: "Produto adicionado!", produto: novoProduto });
});

// ROTA PUT - atualizar produto
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado!" });
  }

  produto.nome = req.body.nome;
  produto.descricao = req.body.descricao;
  produto.preco = req.body.preco;

  res.json({ mensagem: "Produto atualizado!", produto });
});

// ROTA DELETE - excluir produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Produto não encontrado!" });
  }

  produtos.splice(index, 1);
  res.json({ mensagem: "Produto excluído com sucesso!" });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

