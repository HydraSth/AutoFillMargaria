// let BtnCordobaML=document.querySelector('[href="javascript:AceptarComercial(35604, &quot;CLIENTE MERCADO LIBRE CORDOBA&quot;, &quot;CORDOBA&quot;, &quot;SANTA ROSA&quot;, &quot;2954806982&quot;, &quot;CLIENTES&quot;, &quot;CONSUMIDOR FINAL&quot;, &quot;3569851&quot;, &quot;CF&quot;, 0, 0, 0, &quot;NO&quot;, &quot;&quot;, &quot;NO&quot;, &quot;&quot;, &quot;6300&quot;, &quot;guardar&quot;, &quot;&quot;, &quot;&quot;,&quot;ACUERDO COMERCIAL 0 %&quot;,0, 0,&quot;PER. IIBB LA PAMPA&quot;,&quot;LA PAMPA&quot;,&quot;NO&quot;,&quot;&quot;,0,&quot;&quot;,&quot;&quot;);"]');
// console.log(BtnCordobaML);
document.getElementById("NomComercial").value="CLIENTE MERCADO LIBRE CORDOBA";
let BotonNombre =document.querySelector('[onclick="javascript:CambiarDatosComerciales()"]');

const eventoClic = new MouseEvent("click", {
    bubbles: true,  // Para permitir que el evento burbujee a través de la jerarquía DOM.
    cancelable: true,  // Puede ser cancelado.
    view: window  // La vista en la que se origina el evento (normalmente, la ventana).
});
  
enlace.dispatchEvent(eventoClic);

console.log(BotonNombre);
