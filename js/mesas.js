window.addEventListener('load', () => {
    //Variaveis///////////////
    //Mesa1
       var btnPedidosmesa1 = document.getElementById('pedidosMesa1');
       //Mesa2
       var btnPedidosmesa2 = document.getElementById('pedidosMesa2');
       //Mesa3
       var btnPedidosmesa3 = document.getElementById('pedidosMesa3');
       //Mesa4
       var btnPedidosmesa4 = document.getElementById('pedidosMesa4');
       //Mesa5
       var btnPedidosmesa5 = document.getElementById('pedidosMesa5');
       //Mesa6
       var btnPedidosmesa6 = document.getElementById('pedidosMesa6');
       //Mesa7
       var btnPedidosmesa7 = document.getElementById('pedidosMesa7');
       //Mesa8
       var btnPedidosmesa8 = document.getElementById('pedidosMesa8');
       //Mesa9
       var btnPedidosmesa9 = document.getElementById('pedidosMesa9');
       //Dialogo
       var dialogoMesa = document.getElementById('mesaInfo');
    /////////////////////////
    //Função fechar dialogo
    dialogoMesa.querySelector('.fechar').addEventListener('click', () => {
        dialogoMesa.close();
    });

     //funções//////////////
     //Mesa1
      btnPedidosmesa1.addEventListener('click', () => {
          dialogoMesa.showModal();
      });
      //Mesa2
      btnPedidosmesa2.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa3
      btnPedidosmesa3.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa4
      btnPedidosmesa4.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa5
      btnPedidosmesa5.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa6
      btnPedidosmesa6.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa7
      btnPedidosmesa7.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa8
      btnPedidosmesa8.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
      //Mesa9
      btnPedidosmesa9.addEventListener('click', () => {
        dialogoMesa.showModal();
      });
     //////////////////////



});