window.addEventListener('DOMContentLoaded', () => {
  // 1. Pegar a localização do colaborador via API ipapi
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const cidadeUsuario = data.city;
      const estadoUsuario = data.region;
      console.log(`Usuário está em: ${cidadeUsuario} - ${estadoUsuario}`);

      // 2. Mostrar ONGs próximas baseando-se na localização
      mostrarOngsProximas(cidadeUsuario, estadoUsuario);
    })
    .catch(err => {
      console.error('Erro ao obter localização:', err);
      // Opcional: mostrar todas ONGs se não conseguir localização
      mostrarOngsProximas();
    });

  // Função que busca ONGs no localStorage e filtra por cidade e estado
  function mostrarOngsProximas(cidade = '', estado = '') {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Filtra só as ONGs que correspondem à cidade e estado (se fornecidos)
    const ongsProximas = usuarios.filter(u => 
      u.tipo === 'ong' &&
      (cidade === '' || (u.cidade && u.cidade.toLowerCase() === cidade.toLowerCase())) &&
      (estado === '' || (u.estado && u.estado.toLowerCase() === estado.toLowerCase()))
    );

    const listaOngsDiv = document.getElementById('listaOngs');
    listaOngsDiv.innerHTML = '';

    if (ongsProximas.length === 0) {
      listaOngsDiv.innerHTML = '<p>Nenhuma ONG próxima encontrada.</p>';
      return;
    }

    // Exibe cada ONG encontrada
    ongsProximas.forEach(ong => {
      const ongItem = document.createElement('div');
      ongItem.classList.add('ong-item');
      ongItem.innerHTML = `
        <h3>${ong.nome}</h3>
        <p>Cidade: ${ong.cidade} - Estado: ${ong.estado}</p>
        <p>E-mail: ${ong.email}</p>
      `;
      listaOngsDiv.appendChild(ongItem);
    });
  }
});
