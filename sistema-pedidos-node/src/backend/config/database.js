const sqlite3 = require('sqlite3').verbose();

const setupDatabase = () => {
    // Banco em memória conforme exigido
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
        // Criar tabelas
        db.run(`CREATE TABLE clientes (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE produtos (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            estoque INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER NOT NULL,
            produto_id INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            total REAL NOT NULL,
            FOREIGN KEY(cliente_id) REFERENCES clientes(id),
            FOREIGN KEY(produto_id) REFERENCES produtos(id)
        )`);

        // Dados Iniciais estritos exigidos pelo usuário
        db.run(`INSERT INTO clientes (id, nome) VALUES (1, 'João')`);
        db.run(`INSERT INTO produtos (id, nome, preco, estoque) VALUES (1, 'Notebook', 3500.0, 5)`);
    });

    return db;
};

// Exportar apenas a instância do banco para uso exclusivo do Repositório
module.exports = setupDatabase();
