window.addEventListener('load', () => {
    var btnPedido = document.getElementById('verPedido');
    var dialog = document.getElementById('dialogPedido');
    var btnAddPedido = document.getElementById('addPedido');
    var btnFecharPedido = document.getElementById('fecharPedido');
    var dialogPedido = document.getElementById('dialogAddPedido');
    var db = firebase.firestore();
    var btnAnotar = document.getElementById('anotarPedido');

    var nome = document.getElementById('txtNome');
    var telefone = document.getElementById('txtTelefone');
    var data = document.getElementById('txtData');
    var local = document.getElementById('txtLocal');
//////////////////////////////////////////////////

    btnAnotar.addEventListener('click', () => {
      var pizzas = verificarPizza();
      var id = fazerId(10);
      var info = {
        nome: nome.value,
        telefone: telefone.value,
        data: data.value,
        local: local.value,
        sabores: pizzas
      };

      db.collection('db/pedidos/anotados').doc(id).set(info).then(() => {
        dialogPedido.close();
        window.alert('Pedido anotado');
      });


    });


    btnAddPedido.addEventListener('click', () => {
      dialogPedido.showModal();
    });


    
    btnFecharPedido.addEventListener('click', () => {
      dialogPedido.close();
    });

    // btnPedido.addEventListener('click', () => {
    //  dialog.showModal();
    //  });

    dialog.querySelector('.close').addEventListener('click', () => {
          dialog.close();
    });


    db.collection('db/pedidos/anotados').get().then((info) => {
      info.forEach((document) => {
        criarPedido(document);
      });
    });

    

    db.collection('db/cardapio/sabores').get().then((info) => {
      //forEach = parecida como for - Passa em todos os documentos que estão na variavel info
      info.forEach((documento) => {
      
       // console.log("Sabor:" + documento.data().sabor + "Descricao" + documento.data().descricaom + "Preço" + documento.data().preco)
       criarlinha(documento);
       });
    });

    function criarlinha(info){


      
     
      //variaveis
      var tabela = document.getElementById('tabelaCardapio');
      var linha = document.createElement('tr');
      linha.id = info.id;
      var colunaSabor = document.createElement('td');
      colunaSabor.className = "mdl-data-table__cell--non-numeric";
      var colunaDescricao = document.createElement('td');
      var colunaPreco = document.createElement('td');
      /////////////////////
      //TextContent = insere um texto na coluna, paragrafo etc
      colunaSabor.textContent = info.data().sabor;
      colunaDescricao.textContent = info.data().descricao;
      colunaPreco.textContent = info.data().preco;
      ////////////////////////////////////////////////////////
      var colunaCaixa = document.createElement('td');
      var label = document.createElement('label');
      label.class = "switch";
      var input = document.createElement('input');
      input.type = "checkbox";
      input.id = info.id;
      var span = document.createElement('span');
      span.className = "slider";
      





    label.appendChild(input);
    label.appendChild(span);
    colunaCaixa.appendChild(label);


     
    









      //appenChild = inseri um elemento em outro element
      linha.appendChild(colunaCaixa);
      linha.appendChild(colunaSabor);
      linha.appendChild(colunaDescricao);
      linha.appendChild(colunaPreco);
      tabela.appendChild(linha);
    }

    function criarlinha2(info){


      
     
      //variaveis
      var tabela = document.getElementById('tabelaPedido');
      var linha = document.createElement('tr');
      linha.id = info.id;
      var colunaSabor = document.createElement('td');
      colunaSabor.className = "mdl-data-table__cell--non-numeric";
      var colunaDescricao = document.createElement('td');
      var colunaPreco = document.createElement('td');
      /////////////////////
      //TextContent = insere um texto na coluna, paragrafo etc
      colunaSabor.textContent = info.data().sabor;
      colunaDescricao.textContent = info.data().descricao;
      colunaPreco.textContent = info.data().preco;
      ////////////////////////////////////////////////////////
      //appenChild = inseri um elemento em outro element
      linha.appendChild(colunaSabor);
      linha.appendChild(colunaDescricao);
      linha.appendChild(colunaPreco);
      tabela.appendChild(linha);
    }

    





    function criarPedido(info){
      var pedidos = document.getElementById('listaPedidos');
      var divgeral = document.createElement('div');
      divgeral.id = info.id;
      divgeral.className = "pedido";
      var titulo = document.createElement('h5');
      titulo.innerHTML = "Pedido #" + info.id // pedido #777
      var nome = document.createElement('p');
      nome.innerHTML = "Nome: " + info.data().nome;
      var telefone = document.createElement('p')
      telefone.innerHTML = "Tel: " + info.data().data;
      var data = document.createElement('p');
      data.innerHTML = "Data: " + info.data().data;
      var local = document.createElement('p');
      local.innerHTML = "Local: " + info.data().local;

      var iconeVer = document.createElement('i');
      iconeVer.id = "verPedido";
      iconeVer.style.cursor = "pointer";
      iconeVer.className = "material-icons";
      iconeVer.innerHTML = "assignment";

      var iconeApagar = document.createElement('i');
      iconeApagar.id = "info.id";
      iconeApagar.style.cursor = "pointer";
      iconeApagar.className = "material-icons";
      iconeApagar.innerHTML = "done";


      iconeVer.addEventListener('click', (e) => {
        var tabela = document.getElementById('tabelaPedido');
        tabela.textContent = " ";
        db.collection('db/pedidos/anotados').doc(e.path[1].id).get().then((info) => {
          console.log(info.data());
          var pizzas = info.data().sabores;
          var caixa = document.getElementById('dialogPedido')
          var nome = document.getElementById('nomePedido');
          nome.innerHTML = "Nome" + info.data().nome;
          var telefone = document.getElementById('nomePedido');
          telefone.innerHTML = "Telefone" + info.data().telefone;
          var data = document.getElementById('nomePedido');
          data.innerHTML = "Data" + info.data().data;
          var local = document.getElementById('localPedido');
          local.innerHTML = "Local" + info.data().local;
          pizzas.forEach((id) => { // Passar item por item na lista de pizzas
            //Puxar as informações das pizzas
            db.collection('db/cardapio/sabores').doc(id).get().then((info) => {
              console.log(info.data()); //"Console.log" funciona para mandar recados para o console para ver se ta dando certo
              criarlinha2(info);
            });
          });
          caixa.showModal();
        });
      });


      iconeApagar.addEventListener('click', (e) => {
        var elemento = document.getElementById(e.path[1].id)
        db.collection('db/pedidos/anotados').doc(e.path[1].id).delete().then(() => {
        elemento.remove();
         
        });
      });


      divgeral.appendChild(titulo);
      divgeral.appendChild(document.createElement('hr'));
      divgeral.appendChild(nome);
      divgeral.appendChild(document.createElement('hr'));
      divgeral.appendChild(telefone);
      divgeral.appendChild(document.createElement('hr'));
      divgeral.appendChild(data);
      divgeral.appendChild(document.createElement('hr'));
      divgeral.appendChild(local);
      divgeral.appendChild(document.createElement('hr'));
      divgeral.appendChild(iconeVer);
      divgeral.appendChild(iconeApagar);
      pedidos.appendChild(divgeral);


     }






function verificarPizza(){
  //Agrupar todos os inputs com o o id - checkbox
  //verificar se esta cheked  - verificado
  //Se verificado adicionar o id da pizza em uma lista
  //lista - var list =[]
  //Quando terminar a verificação, puxar os dados das pizzas do banco de dados e enviar 
  // a lista com todas as informações 
  //getElementById = celeciona o elemento pelo id
  //querySelectorAll = seleciona todos os elementos com o mesmo nome
  var caixas = document.querySelectorAll('input');
  var pizzas = []; //[] = lista
  
  
  caixas.forEach((caixa)=> { //laço de repetição que executa de acordo a quantidade de itens na variavel da caixa
    if(caixa.type = "checkbox" && caixa.checked == true){
    pizzas.push(caixa.id)   
    //push adiciona a lista 
    // pull é empurrar
      };
    });  
  return pizzas;
   }
});
function fazerId(quantidade){
  var resultado = '';
  var caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var tamanho = caracteres.length; // length = tamnho da variavel, nesse caso é quantas letars e numeros existe


  //Laços de repetição
  //Condiçao, até quando ira executar
  // PEt= variavel de controle, limite, velocidade
  //contador++ = contador = contador+1;
  for(var contador = 0; contador < quantidade; contador++  ){
      console.log(contador);
      resultado += caracteres.charAt(Math.floor(Math.random() * tamanho));
      //+= ele adicionar no final do texto a letra nova
  }
  return resultado;
  //retorna o valo final.
  }