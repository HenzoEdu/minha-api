const Database = require("better-sqlite3");

const db = new Database("banco.db");

const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL
)`);

stmt.run();

module.exports = db;
