const db = require("./database");
const express = require("express");

const app = express();

app.get("/tarefas", (req, res) => {
  const tarefas = db.prepare("SELECT * FROM tarefas").all();
  res.json(tarefas);
});

app.use(express.json());
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  const resultado = db
    .prepare("INSERT INTO tarefas (titulo) VALUES (?)")
    .run(titulo);
  res.json({
    mensagem: `Tarefa ${titulo} com id ${resultado.lastInsertRowid} registrada!`,
  });
});

app.get("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);

  if (!tarefa) {
    return res.json({ mensagem: "Tarefa não encontrada!" });
  }
  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const tarefaVerificacao = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(id);
  if (!tarefaVerificacao) {
    res.json({ mensagem: "tarefa não encontrada" });
  } else {
    const tarefa = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);
    res.json({ mensagem: "tarefa deletada" });
  }
});

app.put("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const { titulo } = req.body;
  const tarefaVerificacao = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(id);
  if (!tarefaVerificacao) {
    res.json({ mensagem: "Tarefa não encontrada!" });
  } else {
    const tarefa = db
      .prepare("UPDATE tarefas SET titulo = ? WHERE id = ?")
      .run(titulo, id);
    res.json({ mensagem: "tarefa atualizada" });
  }
});

app.listen(3000, () => {
  console.log("App de Exemplo sendo executado na porta 3000!");
});
