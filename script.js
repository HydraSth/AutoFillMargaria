let Persona={
    Dni:"",
    Nombre:"",
    Direccion:"",
    Provincia:"",
    CodigoPostal:"",    
    Departamento:"",
}

let InputTextoAutocompletar = document.querySelector("#TextoCompilar");
let text = document.getElementById("TextoCompilar");

window.onload=()=>{
    localStorage.getItem("text")!=undefined?
        text.value=localStorage.getItem("text")
        :
        ""

    localStorage.getItem("vendedor")!=undefined?
        document.getElementById("NombreVendedor").value=localStorage.getItem("vendedor")
        :
        ""

    localStorage.getItem("producto")!=undefined?
        TextoProducto.value=localStorage.getItem("producto")
        :
        ""
}   

InputTextoAutocompletar.addEventListener("keyup", ()=>{
    localStorage.setItem("text",InputTextoAutocompletar.value)
})

TextoProducto.addEventListener("keyup", ()=>{
    localStorage.setItem("producto",TextoProducto.value)
})

var NombreVendedorInput= document.getElementById("NombreVendedor");
NombreVendedorInput.addEventListener("keyup", ()=>{
    localStorage.setItem("vendedor",NombreVendedorInput.value)
})

let ProductoComprado={
    sku:"",
    unidades:0
}


document.getElementById("BtnProcesar").addEventListener("click", ()=>{
    text=localStorage.getItem("text")  
    let ResponseSpliteada=text.split(' ')
    let ElementoTipoCliente=document.getElementById("RCli")
    if(ResponseSpliteada.includes('cuit')){
        ElementoTipoCliente.innerHTML="Factura Empresa"
    }else{
        ElementoTipoCliente.innerHTML="Factura Consumidor Final"
    }
    separarDatos(text);
    separarProductos();
})

function separarDatos(text){
    let ResponseSpliteada=text.split('-')
    Persona.Nombre=ResponseSpliteada[0].trim()
    Persona.Dni=ResponseSpliteada[1].match(/\d+(\.\d+)?/g)
    Persona.Dni=Persona.Dni[0]

    let DireccionStr=ResponseSpliteada[2].trim()
    DireccionStr=DireccionStr.split(',')
    Persona.Departamento=DireccionStr[1].trim()
    DireccionStr=DireccionStr[0].split(' ')
    let CadenaLimpia=""
    DireccionStr.forEach(palabra => {
        if(!CadenaLimpia.includes(palabra)){
            CadenaLimpia=CadenaLimpia+' '+palabra
        }
    });
    Persona.Direccion=CadenaLimpia.trim();

    let Provincia=ResponseSpliteada[3].trim()
    Provincia=Provincia.split(',')
    let CodigoPostal=Provincia[0].split(':')
    Provincia=Provincia[1].split(" ")
    CadenaLimpia=""
    Provincia.forEach(palabra => {
        if(!palabra.includes("Final") || !palabra.includes("Consumidor")){
            CadenaLimpia=CadenaLimpia+' '+palabra
        }
    })
    Persona.Provincia=CadenaLimpia.trim();
    
    CodigoPostal=CodigoPostal[1].trim()
    Persona.CodigoPostal=CodigoPostal
    
    // En el script de la extensión (fondo)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, { data: Persona,  vendedor: NombreVendedorInput.value,ProductoComprado: ProductoComprado, }, function(response) {
                if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                } else {
                    // Manejar la respuesta si la hay
                    console.log(response);
                }
            });
        } else {
            console.error("No se encontró una pestaña activa.");
        }
    });

    localStorage.setItem("Persona",JSON.stringify(Persona))
    MostrarDatos(Persona);    
}


function separarProductos(){
    let TextoProducto=document.getElementById("TextoProducto").value;
    // TextoProducto=TextoProducto.match('^[a-zA-Z]+$')
    TextoProducto=TextoProducto.split('-');
    ProductoComprado.sku=TextoProducto[0].replace(/\D/g, '').trim();
    ProductoComprado.unidades=TextoProducto[1].trim();
    
}

function MostrarDatos(Persona){
    document.getElementById("Nombre").innerHTML=Persona.Nombre
    document.getElementById("Dni").innerHTML=Persona.Dni
    document.getElementById("Departamento").innerHTML=Persona.Departamento
    document.getElementById("Direccion").innerHTML=Persona.Direccion
    document.getElementById("Provincia").innerHTML=Persona.Provincia
    document.getElementById("CodigoPostal").innerHTML=Persona.CodigoPostal    
}

