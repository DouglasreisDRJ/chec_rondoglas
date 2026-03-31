const db = require('../config/database');

const Repositories = {
    // Produtos
    getProdutoById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM produtos WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },
    updateEstoqueProduto: (id, novoEstoque) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE produtos SET estoque = ? WHERE id = ?`, [novoEstoque, id], function(err) {
                if (err) reject(err);
                resolve(this.changes);
            });
        });
    },
    
    // Clientes
    getClienteById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM clientes WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Pedidos
    criarPedido: (clienteId, produtoId, quantidade, total) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO pedidos (cliente_id, produto_id, quantidade, total) VALUES (?, ?, ?, ?)`, 
                [clienteId, produtoId, quantidade, total], 
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    },

    listarPedidos: () => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT p.id, c.nome as cliente, pr.nome as produto, p.quantidade, p.total 
                    FROM pedidos p 
                    JOIN clientes c ON p.cliente_id = c.id 
                    JOIN produtos pr ON p.produto_id = pr.id`, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = Repositories;
