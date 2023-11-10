let Persona={
    Dni:"",
    Nombre:"",
    Direccion:"",
    Provincia:"",
    CodigoPostal:"",    
    Departamento:"",
    TipoDePersona:""
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
    separarDatos(text);
    separarProductos();
})

function separarDatos(text){
    
    let TxtUsuario=text.split('-')

    let Dni = TxtUsuario[1].trim().split(' ')
    Dni=Dni.splice(0,2)[1]
    Persona.Dni= Dni.replace(/\n/g, ' ').split(' ')[0];

    Persona.Nombre=TxtUsuario[0].trim()

    let DireccionAux=TxtUsuario[1].trim().split(',')[0].split(' ')[1].replace(/\d/g, ' ').trim()
    let Direccion=TxtUsuario[1].trim().split(',')[0].split(' ')
    Direccion[1]=DireccionAux
    Persona.Direccion=Direccion.slice(1).join(' ')

    let Provincia= TxtUsuario[2].split(',').slice(1)[0].trim()
    Provincia= Provincia.replace(/\n/g, ' ').split(' ').slice(0,2).join(' ')

    Persona.Provincia=Provincia

    let CodigoPostal= TxtUsuario[2].split(',').slice(0)[0].trim().split(':')[1].trim()

    Persona.CodigoPostal=CodigoPostal;

    let Departamento= TxtUsuario[1].split(',')
    Persona.Departamento=Departamento[1].trim().toLowerCase()

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

    let EvaluarTxtUsuario=text.toLowerCase()
    if(EvaluarTxtUsuario.includes('cuit')){
        if(EvaluarTxtUsuario.includes('exento')){
            Persona.TipoDePersona="Exento"
        }else if(EvaluarTxtUsuario.includes('monotributo')){
            Persona.TipoDePersona="Monotributo"
        }else if(EvaluarTxtUsuario.includes('responsable inscripto')){
            Persona.TipoDePersona="Responsable Inscripto"
        }else{
            Persona.TipoDePersona="Consumidor Final"
        }
    }else{
        Persona.TipoDePersona="Consumidor Final"
    }
    localStorage.setItem("Persona",JSON.stringify(Persona))
    MostrarDatos(Persona);    
}


function separarProductos(){
    let TextoProducto=document.getElementById("TextoProducto").value;
    // TextoProducto=TextoProducto.match('^[a-zA-Z]+$')
    TextoProducto=TextoProducto.split('-');
    ProductoComprado.sku=TextoProducto[0].replace(/\D/g, '').trim();
    ProductoComprado.unidades=TextoProducto[1].trim();
    if(TextoProducto[2]){
        ProductoComprado.precio=TextoProducto[2].replace(/\D/g, '').trim();
    }
}

function MostrarDatos(Persona){
    document.getElementById("Nombre").innerHTML=Persona.Nombre
    document.getElementById("Dni").innerHTML=Persona.Dni
    document.getElementById("Departamento").innerHTML=Persona.Departamento
    document.getElementById("Direccion").innerHTML=Persona.Direccion
    document.getElementById("Provincia").innerHTML=Persona.Provincia
    document.getElementById("CodigoPostal").innerHTML=Persona.CodigoPostal   
    document.getElementById("TipoDeFactura").innerHTML=Persona.TipoDePersona 
}

