const msgDiv = document.getElementById('mensagens');
const listaPedidos = document.getElementById('lista-pedidos');

async function realizarCompra(qtd) {
    try {
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clienteId: 1,
                produtoId: 1,
                quantidade: qtd
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            msgDiv.innerHTML = `<span style="color:red">Erro: ${data.error}</span>`;
        } else {
            msgDiv.innerHTML = `<span style="color:green">Sucesso! Pedido ID: ${data.pedidoId} - Total: R$${data.valorTotal}</span>`;
            listarPedidos();
        }
    } catch (err) {
        msgDiv.innerHTML = `<span style="color:red">Falha na rede: ${err.message}</span>`;
    }
}

async function listarPedidos() {
    listaPedidos.innerHTML = 'Carregando...';
    try {
        const response = await fetch('/api/pedidos');
        const pedidos = await response.json();
        
        if(pedidos.length === 0) {
            listaPedidos.innerHTML = '<li>Nenhum pedido ainda.</li>';
            return;
        }

        listaPedidos.innerHTML = pedidos.map(p => 
            `<li>Pedido #${p.id} | ${p.cliente} comprou ${p.quantidade}x ${p.produto} | Total: R$${p.total}</li>`
        ).join('');
    } catch (err) {
        listaPedidos.innerHTML = `<li>Erro ao carregar lista.</li>`;
    }
}

document.getElementById('btn-comprar').addEventListener('click', () => {
    const qt = parseInt(document.getElementById('qt').value) || 1;
    realizarCompra(qt);
});

document.getElementById('btn-falhar').addEventListener('click', () => {
    realizarCompra(10); // Qtde > 5 pra forçar o err.
});

document.getElementById('btn-listar').addEventListener('click', listarPedidos);

// Carregar ao iniciar
listarPedidos();
