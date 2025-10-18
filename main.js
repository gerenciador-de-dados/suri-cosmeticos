// Dados do sistema
let produtos = [];
let entradas = [];
let vendas = [];

// Login
function login(){
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if(user==='admin' && pass==='123'){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('mainApp').style.display='block';
    atualizarProdutoSelects();
    atualizarTabelas();
  }else{
    alert('Usuário ou senha incorretos');
  }
}

// Abas
function showTab(tab){
  const tabs = document.getElementsByClassName('tab');
  for(let t of tabs) t.style.display='none';
  document.getElementById(tab).style.display='block';
}

// Produtos
function adicionarProduto(){
  const nome = document.getElementById('novoProdutoNome').value;
  if(nome===''){alert('Informe o nome do produto'); return;}
  produtos.push({nome:nome, saldo:0});
  document.getElementById('novoProdutoNome').value='';
  atualizarProdutoSelects();
  atualizarTabelas();
}

function atualizarProdutoSelects(){
  const selEntrada = document.getElementById('entradaProduto');
  const selVenda = document.getElementById('vendaProduto');
  selEntrada.innerHTML='';
  selVenda.innerHTML='';
  for(let p of produtos){
    selEntrada.innerHTML += `<option value='${p.nome}'>${p.nome}</option>`;
    selVenda.innerHTML += `<option value='${p.nome}'>${p.nome}</option>`;
  }
}

function atualizarTabelas(){
  // Produtos
  const tbodyProdutos = document.querySelector('#tabelaProdutos tbody');
  tbodyProdutos.innerHTML='';
  produtos.forEach((p,i)=>{
    tbodyProdutos.innerHTML += `<tr><td>${p.nome}</td><td>${p.saldo}</td><td><button onclick='removerProduto(${i})'>Excluir</button></td></tr>`;
  });
  // Entradas
  const tbodyEntradas = document.querySelector('#tabelaEntradas tbody');
  tbodyEntradas.innerHTML='';
  entradas.forEach(e=>{
    tbodyEntradas.innerHTML += `<tr><td>${e.produto}</td><td>${e.quantidade}</td><td>${e.nota}</td><td>${e.data}</td></tr>`;
  });
  // Vendas
  const tbodyVendas = document.querySelector('#tabelaVendas tbody');
  tbodyVendas.innerHTML='';
  vendas.forEach((v,i)=>{
    tbodyVendas.innerHTML += `<tr><td>${v.produto}</td><td>${v.cliente}</td><td>${v.quantidade}</td><td>${v.data}</td><td>${v.status}</td><td><button onclick='removerVenda(${i})'>Excluir</button></td></tr>`;
  });
}

function removerProduto(index){
  if(confirm('Deseja excluir este produto?')){
    produtos.splice(index,1);
    atualizarProdutoSelects();
    atualizarTabelas();
  }
}

// Entradas
function registrarEntrada(){
  const produto = document.getElementById('entradaProduto').value;
  const quantidade = parseInt(document.getElementById('entradaQuantidade').value);
  const nota = document.getElementById('entradaNota').value;
  const data = document.getElementById('entradaData').value;
  if(!produto || !quantidade || !data){alert('Preencha todos os campos'); return;}
  entradas.push({produto, quantidade, nota, data});
  const p = produtos.find(p=>p.nome===produto);
  if(p) p.saldo += quantidade;
  document.getElementById('entradaQuantidade').value='';
  document.getElementById('entradaNota').value='';
  document.getElementById('entradaData').value='';
  atualizarTabelas();
}

// Vendas
function registrarVenda(){
  const produto = document.getElementById('vendaProduto').value;
  const cliente = document.getElementById('vendaCliente').value;
  const quantidade = parseInt(document.getElementById('vendaQuantidade').value);
  const data = document.getElementById('vendaData').value;
  const status = document.getElementById('vendaStatus').value;
  if(!produto || !cliente || !quantidade || !data){alert('Preencha todos os campos'); return;}
  const p = produtos.find(p=>p.nome===produto);
  if(p && p.saldo>=quantidade){
    vendas.push({produto, cliente, quantidade, data, status});
    if(status==='pago') p.saldo -= quantidade;
    document.getElementById('vendaCliente').value='';
    document.getElementById('vendaQuantidade').value='';
    document.getElementById('vendaData').value='';
    atualizarTabelas();
  }else{
    alert('Saldo insuficiente');
  }
}

function removerVenda(index){
  if(confirm('Deseja excluir esta venda?')){
    const v = vendas[index];
    if(v.status==='pago'){
      const p = produtos.find(p=>p.nome===v.produto);
      if(p) p.saldo += v.quantidade;
    }
    vendas.splice(index,1);
    atualizarTabelas();
  }
}

// Exportar PDF (placeholder)
function exportarPDF(tipo){
  alert('Função de exportação PDF: '+tipo);
}

// Backup e restaurar (localStorage)
function backupDados(){
  const dados = {produtos, entradas, vendas};
  localStorage.setItem('suriBackup', JSON.stringify(dados));
  alert('Backup realizado');
}

function restaurarDados(){
  const dados = JSON.parse(localStorage.getItem('suriBackup'));
  if(dados){
    produtos = dados.produtos || [];
    entradas = dados.entradas || [];
    vendas = dados.vendas || [];
    atualizarProdutoSelects();
    atualizarTabelas();
    alert('Dados restaurados');
  }else{
    alert('Nenhum backup encontrado');
  }
}

console.log('Suri Cosméticos JS carregado');