const Repositories = require('../repositories/Repositories');

const PedidoService = {
    criarPedido: async (clienteId, produtoId, quantidade) => {
        // Validações Rígidas (0% SQL aqui)
        if (!clienteId || !produtoId || !quantidade || quantidade <= 0) {
            throw new Error("Dados do pedido inválidos.");
        }

        const cliente = await Repositories.getClienteById(clienteId);
        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        const produto = await Repositories.getProdutoById(produtoId);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        if (produto.estoque < quantidade) {
            throw new Error(`Estoque insuficiente do produto ${produto.nome}. Requer: ${quantidade}, Tem: ${produto.estoque}`);
        }

        // Cálculos e Baixa no Estoque
        const valorTotal = produto.preco * quantidade;
        const novoEstoque = produto.estoque - quantidade;
        
        await Repositories.updateEstoqueProduto(produtoId, novoEstoque);
        const pedidoId = await Repositories.criarPedido(clienteId, produtoId, quantidade, valorTotal);

        return {
            pedidoId: pedidoId,
            status: "Pedido aprovado com sucesso",
            valorTotal: valorTotal
        };
    },

    listarPedidos: async () => {
        return await Repositories.listarPedidos();
    }
};

module.exports = PedidoService;
