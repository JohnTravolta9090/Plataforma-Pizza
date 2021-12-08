window.addEventListener('load', () => {
 var idUsuario = localStorage.getItem('uid');
 var db = firebase.firestore();
db.collection('users').doc(idUsuario).get().then((info) => {
    if(info.data().avatar){ //Se o avatar existir ele executa o código

    
 var imgUsuario = info.data().avatar;
 var bolaFoto = document.getElementById('foto');
 bolaFoto.style.backgroundImage = "url('" + imgUsuario + "')";
 if(document.getElementById('foto2')){
     var img2 = document.getElementById('foto2');
     img2.style.backgroundImage = "url('" + imgUsuario + "')";
 }
 // # = divGeral
 // . = divGeral
        }
    });
});