window.addEventListener('load', () => {
    //Variaveis
    var email = document.getElementById('txtEmail');
    var senha = document.getElementById('txtSenha');
    var btnCadastrar = document.getElementById('cadastrar');
    var btnLogin = document.getElementById('login');
    var erro = document.getElementById('erro');


    btnCadastrar.addEventListener('click', () => {
        window.location.href = "paginas/cadastro.html";
    });
 
    btnLogin.addEventListener('click', () => {
        firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
        .then((userCredential) => {
            // Signed in //Usuario foi logado com sucessor
            var user = userCredential.user;
            localStorage.setItem('uid', user.uid);
            window.location.href = "paginas/paginaPrincipal.html";
            // ...
        })
        .catch((error) => {
            //Quando houver erros
            erro.style.display = "block";
        });
    });
});