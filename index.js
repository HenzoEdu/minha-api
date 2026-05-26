const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

app.get("/sobre", (req, res) => {
  res.json({
    nome: "Henzo",
    idade: 15,
    objetivo: "Full-Stack",
  });
});

app.get("/tecnologias", (req, res) => {
  res.json(["python", "node.js", "express", "javascript"]);
});

app.get("/contato", (req, res) => {
  res.json({
    github: "https://github.com/HenzoEdu/",
    mensagem: "Olá, entre em contato comigo e veja meus projetos no meu github",
  });
});

app.get("/usuario/:nome", (req, res) => {
  const nome = req.params.nome;
  res.json({ mensagem: `Olá ${nome}!` });
});

app.get("/soma/:num1/:num2", (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const resultado = num1 + num2;
  res.json({ resultado: resultado });
});

app.use(express.json());

app.post("/usuario", (req, res) => {
  const { nome, idade } = req.body;
  res.json({
    mensagem: `Usuário ${nome} de ${idade} anos de idade cadastrado!`,
  });
});

app.listen(3000, () => {
  console.log("App de Exemplo sendo executado na porta 3000!");
});
