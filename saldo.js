// Inicializa dados de teste se não existirem
if (!localStorage.getItem('receitas')) {
localStorage.setItem('receitas', JSON.stringify([
{desc: 'Salário', valor: 3000},
{desc: 'Freelance', valor: 500}
]));
}

if (!localStorage.getItem('despesas')) {
localStorage.setItem('despesas', JSON.stringify([
{desc: 'Aluguel', valor: 1200},
{desc: 'Supermercado', valor: 600},
{desc: 'Transporte', valor: 300}
]));
}

// Função para atualizar o saldo constante
function atualizarSaldo() {
const receitas = JSON.parse(localStorage.getItem('receitas') || '[]');
const despesas = JSON.parse(localStorage.getItem('despesas') || '[]');

const totalReceitas = receitas.reduce((acc, r) => acc + (r.valor || 0), 0);
const totalDespesas = despesas.reduce((acc, d) => acc + (d.valor || 0), 0);
const saldo = totalReceitas - totalDespesas;

const saldoDiv = document.getElementById('saldoConstante');
if (saldoDiv) {
saldoDiv.textContent = `R$ ${saldo.toFixed(2)}`;
saldoDiv.style.color = saldo >= 0 ? '#00ff7f' : '#ff4747';
}
}

// Atualiza o saldo ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarSaldo);

// Atualiza saldo automaticamente se houver alterações em outras abas
window.addEventListener('storage', atualizarSaldo);