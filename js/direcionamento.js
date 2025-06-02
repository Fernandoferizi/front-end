// Alternar formulários
//localStorage.clear();

btnOng.addEventListener('click', () => {
  btnOng.classList.add('active');
  btnColab.classList.remove('active');
  formOng.classList.add('active');
  formColab.classList.remove('active');
});

btnColab.addEventListener('click', () => {
  btnColab.classList.add('active');
  btnOng.classList.remove('active');
  formColab.classList.add('active');
  formOng.classList.remove('active');
});


formOng.addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeOng = document.getElementById('nomeOng').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const emailOng = document.getElementById('emailOng').value.trim();
  const cidadeOng = document.getElementById('cidadeOng').value.trim();
  const estadoOng = document.getElementById('estadoOng').value.trim();
  const senhaOng = document.getElementById('senhaOng').value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.email === emailOng)) {
    alert('Este e-mail já está cadastrado!');
    return;
  }

  const usuario = {
    tipo: 'ong',
    nome: nomeOng,
    cnpj: cnpj,
    email: emailOng,
    cidade: cidadeOng,
    estado: estadoOng,
    senha: senhaOng,
    posts: [],        
    necessidades: [], 
    fotos: []         
  };

  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro ONG realizado com sucesso!');
  window.location.href = 'login.html';
});


formColab.addEventListener('submit', function(e) {
  e.preventDefault();

  const tipoColab = document.getElementById('tipo').value;
  const nomeColab = document.getElementById('nomeColab').value.trim();
  const emailColab = document.getElementById('emailColab').value.trim();
  const enderecoColab = document.getElementById('enderecoColab').value.trim();
  const senhaColab = document.getElementById('senhaColab').value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.email === emailColab)) {
    alert('Este e-mail já está cadastrado!');
    return;
  }

  const usuario = {
    tipo: 'colaborador',
    tipoColab: tipoColab,
    nome: nomeColab,
    email: emailColab,
    endereco: enderecoColab,
    senha: senhaColab
  };

  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro Colaborador realizado com sucesso!');
  window.location.href = 'login.html';
});

/* ---------------------------------------------------
  Funções para adicionar Posts, Necessidades e Fotos 
  para uma ONG já cadastrada (usado no painel da ONG)
--------------------------------------------------- */

// Pegue o email da ONG logada (deve estar salvo no localStorage no login)
const ongEmailLogada = localStorage.getItem('emailLogado') || 'email_da_ong_logada@exemplo.com';

// Função para carregar ONG do localStorage
function carregarOng() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.find(u => u.tipo === 'ong' && u.email === ongEmailLogada) || {
    posts: [], necessidades: [], fotos: []
  };
}

// Função para salvar dados da ONG no localStorage
function salvarDadosOng(dadosOng) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const index = usuarios.findIndex(u => u.tipo === 'ong' && u.email === ongEmailLogada);
  if (index !== -1) {
    usuarios[index] = dadosOng;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}

// Exibir posts na tela
function exibirPosts() {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';
  if(!dadosOng.posts || dadosOng.posts.length === 0) {
    postList.textContent = 'Nenhum post ainda.';
  } else {
    dadosOng.posts.forEach(text => {
      const div = document.createElement('div');
      div.style.padding = '10px';
      div.style.marginBottom = '10px';
      div.style.border = '1px solid #ccc';
      div.textContent = text;
      postList.appendChild(div);
    });
  }
}

// Exibir necessidades na tela
function exibirNecessidades() {
  const necessidadeList = document.getElementById('necessidadeList');
  necessidadeList.innerHTML = '';
  if(!dadosOng.necessidades || dadosOng.necessidades.length === 0) {
    necessidadeList.innerHTML = '<li>Sem necessidades listadas.</li>';
  } else {
    dadosOng.necessidades.forEach(n => {
      const li = document.createElement('li');
      li.textContent = n;
      necessidadeList.appendChild(li);
    });
  }
}

// Exibir fotos na tela
function exibirFotos() {
  const fotoList = document.getElementById('fotoList');
  fotoList.innerHTML = '';
  if(!dadosOng.fotos || dadosOng.fotos.length === 0) {
    fotoList.innerHTML = '<li>Sem fotos ainda</li>';
  } else {
    dadosOng.fotos.forEach(url => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      li.appendChild(img);
      fotoList.appendChild(li);
    });
  }
}

// Carrega dados da ONG para sessão
let dadosOng = carregarOng();

// Eventos dos formulários do painel ONG

// Post
const postForm = document.getElementById('postForm');
postForm.addEventListener('submit', e => {
  e.preventDefault();
  const texto = document.getElementById('postText').value.trim();
  if(texto) {
    dadosOng.posts = dadosOng.posts || [];
    dadosOng.posts.unshift(texto);
    salvarDadosOng(dadosOng);
    exibirPosts();
    postForm.reset();
    alert('Post adicionado com sucesso!');
  }
});

// Necessidade
const necessidadeForm = document.getElementById('necessidadeForm');
necessidadeForm.addEventListener('submit', e => {
  e.preventDefault();
  const texto = document.getElementById('necessidadeText').value.trim();
  if(texto) {
    dadosOng.necessidades = dadosOng.necessidades || [];
    dadosOng.necessidades.push(texto);
    salvarDadosOng(dadosOng);
    exibirNecessidades();
    necessidadeForm.reset();
    alert('Necessidade adicionada com sucesso!');
  }
});

// Foto (adicione no HTML o formulário com id="fotoForm" e input id="fotoUrl")
const fotoForm = document.getElementById('fotoForm');
fotoForm.addEventListener('submit', e => {
  e.preventDefault();
  const url = document.getElementById('fotoUrl').value.trim();
  if(url) {
    dadosOng.fotos = dadosOng.fotos || [];
    dadosOng.fotos.push(url);
    salvarDadosOng(dadosOng);
    exibirFotos();
    fotoForm.reset();
    alert('Foto adicionada com sucesso!');
  }
});

// Inicializa a exibição
exibirPosts();
exibirNecessidades();
exibirFotos();
