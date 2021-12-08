window.addEventListener('load', () => {
    var botao = document.getElementById('apagarPizza');
    var botaoPizza = document.getElementById('addPizza')

    var sabor = document.getElementById('txtSabor');
    var descricao = document.getElementById('txtDescricao');
    var preco = document.getElementById('txtPreco');

    var db = firebase.firestore();

    var dialogo = document.getElementById('caixaEditar');

    var dialog = document.querySelector('dialog')
    


    var showDialogButton = document.querySelector('#adicionarPizza');

    var textoSabor = document.getElementById('txtSaborEditar');
    var textoDescricao = document.getElementById('txtDescricaoEditar');
    var textoPreco = document.getElementById('txtPrecoEditar');

    var btnEditar = document.getElementById('editarPizza');


    var notificacao = document.getElementById('aviso');
    var botaoFechar = document.getElementById('btnFecharEditar');


    var idSabor;



    /////////////////////////////////////////////////////////////////////////////////////

      
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      showDialogButton.addEventListener('click', function() {
        dialog.showModal();
      });
      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });


      botaoFechar.addEventListener('click', () => {
        dialogo.close();
      });

      btnEditar.addEventListener('click', () => {
        var info = {
          sabor: textoSabor.value,
          descricao: textoDescricao.value,
          preco: textoPreco.value
        };
        db.collection('db/cardapio/sabores').doc(idSabor).set(info).then(() => {
          dialogo.close();
          window.alert('Edição efetuada com sucesso!!');
        });
      });
    
    
    botaoPizza.addEventListener('click', () => {
        var pizzaData = {
            sabor: sabor.value,
            descricao: descricao.value,
            preco: "R$" + preco.value,
        };
        var id = fazerId(15);


      db.collection('db/cardapio/sabores').doc(id).set(pizzaData).then(() => {});
          dialog.close();  
          notificacao.style.display = "flex";
          //Sumir a notificação depois de um tempo
          //setTimeout = Exencuta uma função após milisegundos atribuidos
          setTimeout(function(){notificacao.style.dispaly = none}, 4000);
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
      var colunaIcones = document.createElement('td');
      var iconeApagar = document.createElement('i');
      iconeApagar.id = "apagarPizza";
      iconeApagar.className = "material-icons";
      var iconeTelefone = document.createElement('i');
      iconeApagar.addEventListener('click', (e) => {
        var elemento = document.getElementById(e.path[2].id);
      db.collection('db/cardapio/sabores').doc(e.path[2].id).delete().then(() => {
        elemento.remove();
          });
      });



      
      
      var iconeEditar = document.createElement('i');
      iconeEditar.className = "material-icons";
      iconeEditar.addEventListener('click', (e) => {
        db.collection('db/cardapio/sabores').doc(e.path[2].id).get().then((documento) => {
        dialogo.showModal();
        
        textoSabor.value = documento.data().sabor;
        textoDescricao.value = documento.data().descricao;
        textoPreco.value = documento.data().preco;
        idSabor = e.path[2].id; //O id do sabor - Titulo do documento
        });
      });
      /////////////////////
      //TextContent = insere um texto na coluna, paragrafo etc
      colunaSabor.textContent = info.data().sabor;
      colunaDescricao.textContent = info.data().descricao;
      colunaPreco.textContent = info.data().preco;
      iconeApagar.textContent = "delete_outline";
      iconeEditar.textContent ="edit";
      ////////////////////////////////////////////////////////
      //appenChild = inseri um elemento em outro elemento
      colunaIcones.appendChild(iconeApagar);
      colunaIcones.appendChild(iconeEditar);
      linha.appendChild(colunaSabor);
      linha.appendChild(colunaDescricao);
      linha.appendChild(colunaPreco);
      linha.appendChild(colunaIcones);
      tabela.appendChild(linha);
    }
    

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
}); 