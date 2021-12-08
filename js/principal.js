//Executar quando a pagina carregar
window.addEventListener('load', () => {
    //Variaveis
    var pizza = document.getElementById('contadorPizza');
    var comanda = document.getElementById('contadorComanda');
    var pedidos = document.getElementById('contadorPedidos');
    var avaliacao = document.getElementById('contadorAvaliacoes');

    //variaves de controle
    var cPizza;
    var cComanda;
    var cPedidos;
    var cAvaliacao;
    var myChart;
    var estado = 0;

    var idUsuario = localStorage.getItem('uid');
    console.log(idUsuario);
    var ctx = document.getElementById('myChart').getContext('2d');

    var db = firebase.firestore();

    //Função para retornar o valor do contador de pizza
    db.collection('db').doc("pizzas").onSnapshot((documento) => {
        pizza.innerHTML = documento.data().contador;
        cPizza = documento.data().contador;
        if(estado != 0){
        atualizarGrafico();
        }
        //innerHTML = Substitui o texto atual do elemento
    });

    db.collection("db").doc("pedidos").onSnapshot((documento) => {
        pedidos.innerHTML = documento.data().contador;
        cPedidos = documento.data().contador;
        if(estado !=0){
        atualizarGrafico();
        }
        //innerHTML = Substitui o texto atual do elemento
    });

    db.collection("db").doc("comandas").onSnapshot((documento) => {
        comanda.innerHTML = documento.data().contador;
        cComanda = documento.data().contador;
        if(estado != 0){
            atualizarGrafico();
        }
        
        //innerHTML = Substitui o texto atual do elemento
    });

    db.collection("db").doc("avaliacoes").onSnapshot((documento) => {
        avaliacao.innerHTML = documento.data().contador;
        cAvaliacao = documento.data().contador;
        if(estado == 0){ //Só executa se a variavel estado for igual a 0
            mostrarGrafico();
        } else { // Só executa se a varaivel estado for diferente de 0
            atualizarGrafico();
        }
        //innerHTML = Substitui o texto atual do elemento
    });

    
    function atualizarGrafico(){
        myChart.data.datasets.pop();
        //POP = Retirar / excluir
        myChart.data.datasets.push({
            label: '# of Votes',
            data: [cPizza, cComanda, cPedidos, cAvaliacao],
            backgroundColor: [
                'rgba(252, 2, 2 , 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 131, 0, 0.5)'
            ],
            borderColor: [
                'rgba(252, 2, 2 , 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 131, 0, 1)'
            ],
            borderWidth: 1
        });
        //PUSH = Inserir / adicionar
        myChart.update();
        myChart.update();
    }

 
    function mostrarGrafico(){
        estado = 1; // Estado vira 1 ao inves de 0
        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pizzas', 'Comandas', 'Pedidos', 'Avaliações'],
                datasets: [{
                    label: '# of Votes',
                    data: [cPizza, cComanda, cPedidos, cAvaliacao],
                    backgroundColor: [
                        'rgba(252, 2, 2 , 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(255, 131, 0, 0.5)'
                    ],
                    borderColor: [
                        'rgba(252, 2, 2 , 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 131, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

});