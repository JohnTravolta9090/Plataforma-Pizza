window.addEventListener('load', () => {
    //Todo o nosso codigo
    //Variaveis/////////////////////////////////////////////////////
    var nome = document.getElementById('txtNome');
    var sobrenome = document.getElementById('txtSobrenome');
    var cpf = document.getElementById('txtCpf');
    var dataNascimento = document.getElementById('txtData');
    var email = document.getElementById('txtEmail');
    var senha = document.getElementById('txtSenha');
    ///////////////////////////////////////////////////////////////
    //Botões///////////////////////////////////////////////////////
    var voltar = document.getElementById('btnVoltar');
    var cadastrar = document.getElementById('btnCadastrar');
    ///////////////////////////////////////////////////////////////
    //Variavel de informação - JSON


    voltar.addEventListener('click', () => {
        window.location.href ='index.html'
    });


    cadastrar.addEventListener('click', () => {
        var info = {
            primeiroNome: nome.value,
            segundoNome: sobrenome.value,
            informacoes: {
                cpf: cpf.value,
                dataNascimento: dataNascimento.value
            },
            email: email.value
        };
       
        //Funçao que cria a conta
        firebase.auth().createUserWithEmailAndPassword(email.value, senha.value)
        .then((userCredential) => { //é quando da certo
            var user = userCredential.user;
            //Variavel de atalho
            var db = firebase.firestore();
            //Função que armazena os dados no banco de dados
            db.collection('users').doc(user.uid).set(info).then(() => {
                window.alert("deu certo");
            });
        })
        .catch((error) => { //Quando ocorre erros
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    });
});

