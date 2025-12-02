document.getElementById('formReceita')?.addEventListener('submit', function(e){
e.preventDefault();
let desc = document.getElementById('descReceita').value;
let valor = parseFloat(document.getElementById('valorReceita').value);
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
receitas.push({desc, valor});
localStorage.setItem('receitas', JSON.stringify(receitas));
mostrarReceitas();
this.reset();
});

function mostrarReceitas() {
let lista = document.getElementById('listaReceitas');
if(!lista) return;
lista.innerHTML = '';
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

receitas.forEach((r, index) => {
let li = document.createElement('li');
li.textContent = `${r.desc}: R$ ${r.valor.toFixed(2)}`;

let btnExcluir = document.createElement('button');
btnExcluir.textContent = '🗑';
btnExcluir.style.marginLeft = '10px';
btnExcluir.onclick = () => apagarReceita(index);

li.appendChild(btnExcluir);
lista.appendChild(li);
});
}

function apagarReceita(index) {
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
receitas.splice(index, 1);
localStorage.setItem('receitas', JSON.stringify(receitas));
mostrarReceitas();
}

// ===== DESPESAS =====
document.getElementById('formDespesa')?.addEventListener('submit', function(e){
e.preventDefault();
let desc = document.getElementById('descDespesa').value;
let valor = parseFloat(document.getElementById('valorDespesa').value);
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
despesas.push({desc, valor});
localStorage.setItem('despesas', JSON.stringify(despesas));
mostrarDespesas();
this.reset();
});

function mostrarDespesas() {
let lista = document.getElementById('listaDespesas');
if(!lista) return;
lista.innerHTML = '';
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

despesas.forEach((d, index) => {
let li = document.createElement('li');
li.textContent = `${d.desc}: R$ ${d.valor.toFixed(2)}`;

let btnExcluir = document.createElement('button');
btnExcluir.textContent = '🗑';
btnExcluir.style.marginLeft = '10px';
btnExcluir.onclick = () => apagarDespesa(index);

li.appendChild(btnExcluir);
lista.appendChild(li);
});
}

function apagarDespesa(index) {
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
despesas.splice(index, 1);
localStorage.setItem('despesas', JSON.stringify(despesas));
mostrarDespesas();
}

// ===== SALDO =====
function calcularSaldo() {
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

let totalReceitas = receitas.reduce((acc, r) => acc + r.valor, 0);
let totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
let saldo = totalReceitas - totalDespesas;

let div = document.getElementById('resultadoSaldo');
if(!div) return;
div.textContent = saldo >= 0 ?
`Saldo Positivo: R$ ${saldo.toFixed(2)}` :
`Saldo Negativo: R$ ${saldo.toFixed(2)}`;
div.style.color = saldo >= 0 ? '#00ff7f' : '#ff4747';
}

mostrarReceitas();
mostrarDespesas();
calcularSaldo();