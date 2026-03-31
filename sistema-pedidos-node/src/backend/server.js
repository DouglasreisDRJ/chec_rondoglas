const express = require('express');
const path = require('path');
const PedidoService = require('./services/PedidoService');

const app = express();
const PORT = 3000;

app.use(express.json());
// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Controller: Lida estritamente com requisições e delega
app.post('/api/pedidos', async (req, res) => {
    try {
        const { clienteId, produtoId, quantidade } = req.body;
        const resultado = await PedidoService.criarPedido(clienteId, produtoId, quantidade);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const pedidos = await PedidoService.listarPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`[Controller] Servidor MVC Node rodando na porta ${PORT}`);
});
