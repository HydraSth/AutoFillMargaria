let Persona={
    Dni:"",
    Nombre:"",
    Direccion:"",
    Provincia:"",
    CodigoPostal:"",    
    Departamento:"",
}

let text = ""
document.getElementById("BtnProcesar").addEventListener("click", ()=>{
    text=document.getElementById("TextoCompilar").value;
    let ResponseSpliteada=text.split(' ')
    let ElementoTipoCliente=document.getElementById("RCli")
    if(ResponseSpliteada.includes('cuit')){
        ElementoTipoCliente.innerHTML="Factura Empresa"
    }else{
        ElementoTipoCliente.innerHTML="Factura Consumidor Final"
    }
    separarDatos(text);
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

    // let Provincia=ResponseSpliteada[3].trim()
    // Provincia=Provincia.split(',')
    // let CodigoPostal=Provincia[0].split(':')
    // Provincia=Provincia[1].split(" ")
    // CadenaLimpia=""
    // Provincia.forEach(palabra => {
    //     if(!palabra.includes("Final") || !palabra.includes("Consumidor")){
    //         console.log(palabra);
    //         CadenaLimpia=CadenaLimpia+' '+palabra
    //     }
    // })
    // Persona.Provincia=CadenaLimpia.trim();
    
    // CodigoPostal=CodigoPostal[1].trim()
    // Persona.CodigoPostal=CodigoPostal
    // MostrarDatos(Persona);    
}

function MostrarDatos(Persona){
    document.getElementById("Nombre").innerHTML=Persona.Nombre
    document.getElementById("Dni").innerHTML=Persona.Dni
    document.getElementById("Departamento").innerHTML=Persona.Departamento
    document.getElementById("Direccion").innerHTML=Persona.Direccion
    document.getElementById("Provincia").innerHTML=Persona.Provincia
    document.getElementById("CodigoPostal").innerHTML=Persona.CodigoPostal    
}