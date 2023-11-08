// En el contenido del script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Procesar los datos recibidos desde la extensión
  localStorage.setItem("Persona", JSON.stringify(request.data));
  // Puedes enviar una respuesta de vuelta si es necesario
  sendResponse({ response: "Datos recibidos correctamente" });
});

let Persona= localStorage.getItem("Persona")
console.log(Persona);

const inputEvent = new KeyboardEvent("keyup", {
    key: "*",
    code: "NumpadMultiply", // Esto puede variar según la tecla y el navegador.
    which: 56, // Valor ASCII para el asterisco (*).
    keyCode: 56, // Valor ASCII para el asterisco (*).
    bubbles: true
  });

let InputNomComercial = document.getElementById("NomComercial")
InputNomComercial.value = "CLIENTE MERCADO LIBRE CORDOBA *"
InputNomComercial.dispatchEvent(inputEvent)


var boton = document.querySelector('[onclick="javascript:CambiarDatosComerciales()"]')
boton.addEventListener("click",function(){
  document.querySelector("#DatosComerciales > table > tbody > tr:nth-child(1) > td:nth-child(2) > input").value=`${Persona.Nombre}`
})
  //     setTimeout(function(){
//         var NombreInputComerciales= document.querySelector('[name="CamNomComercial"]');
//         NombreInputComerciales.value=`${Persona.Nombre}`
//         var DireccionInputComerciales=document.querySelector('[name="CamDirComercial"]');
//         DireccionInputComerciales.value=`${Persona.Direccion}`
//         var LocalidadInputComerciales=document.querySelector('[name="CamLocComercial"]');
//         LocalidadInputComerciales.value=`${Persona.Departamento}`
//         var ProvinciaInputComerciales=document.getElementById('CamProvComercial');
//         var OpcionesProvincia=Array.from(ProvinciaInputComerciales.options)
//         OpcionesProvincia.map(opcion=>{
//             if(opcion.innerText.toLowerCase() == Persona.Provincia.toLowerCase()){
//                     let index=OpcionesProvincia.indexOf(opcion);
//                     console.log(index)
//                     ProvinciaInputComerciales.selectedIndex=0
//                 }
//             }
//         )
//         // array.forEach(element => {
            
//         // });
//         ProvinciaInputComerciales.value=`${Persona.Provincia}`
//         // var CPostalInputComerciales=document.querySelector('[name="CamCPComercial"]');
//         // CPostalInputComerciales.value=`${Persona.CodigoPostal}`
//     },500)
// })