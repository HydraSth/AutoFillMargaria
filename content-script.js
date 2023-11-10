
// En el contenido del script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Procesar los datos recibidos desde la extensión
	localStorage.setItem("Persona", JSON.stringify(request.data))
	localStorage.setItem("Vendedor", JSON.stringify(request.vendedor))
	localStorage.setItem("ProductoComprado", JSON.stringify(request.ProductoComprado))
	// Puedes enviar una respuesta de vuelta si es necesario
	sendResponse({ response: "Datos recibidos correctamente" })
})

var NombreVendedor = localStorage.getItem("Vendedor")

let Persona = JSON.parse(localStorage.getItem("Persona"))
	? JSON.parse(localStorage.getItem("Persona"))
	: Persona = {
			Nombre: "",
			Dni: "",
			Departamento: "",
			Direccion: "",
			Provincia: "",
			CodigoPostal: "",
	  }

const inputEvent = new KeyboardEvent("keyup", {
	key: "*",
	code: "NumpadMultiply",
	which: 56,
	keyCode: 56,
	bubbles: true,
})

let InputNomComercial = document.getElementById("NomComercial")
InputNomComercial.value = "MERCADOLIBRE GIL *"
InputNomComercial.dispatchEvent(inputEvent)


var boton = document.querySelector(
	'[onclick="javascript:CambiarDatosComerciales()"]'
)
boton.addEventListener("click", function () {
	setTimeout(function () {
		document.querySelector(
			"#DatosComerciales > table > tbody > tr:nth-child(1) > td:nth-child(2) > input"
		).value = `${Persona.Nombre}`
		document.querySelector(
			"#DatosComerciales > table > tbody > tr:nth-child(2) > td:nth-child(2) > input"
		).value = `${Persona.Direccion}`
		document.querySelector(
			"#DatosComerciales > table > tbody > tr:nth-child(3) > td:nth-child(2) > input"
		).value = `${Persona.Departamento}`

		var ProvinciaInputComerciales =
			document.querySelector("#CamProvComercial")
		ProvinciaInputComerciales.value = `${Persona.Provincia}`
		var OpcionesProvincia = Array.from(ProvinciaInputComerciales.options)
		OpcionesProvincia.map((opcion) => {
			if (opcion.innerText.toLowerCase() ==	Persona.Provincia.toLowerCase()) {
				let index = OpcionesProvincia.indexOf(opcion)
				ProvinciaInputComerciales.selectedIndex = index
			}
		})
  		SetearVendedor()
		SetearProducto()
		SetearPrecio()
		document.querySelector(
			"#DatosComerciales > table > tbody > tr:nth-child(5) > td:nth-child(2) > input"
		).value = `${Persona.CodigoPostal}`
		document.querySelector("#DatosComerciales > table > tbody > tr:nth-child(8) > td:nth-child(2) > input").value=`${Persona.Dni}`
	}, 400)
})

let Producto= localStorage.getItem("ProductoComprado") ? JSON.parse(localStorage.getItem("ProductoComprado")) : null
function SetearProducto() {
	document.querySelector("#TablaProductos_0 > tbody > tr:nth-child(2) > td:nth-child(1) > input:nth-child(5)").value = `${Producto.sku}`
	var eventoChange = new Event("change");
	document.querySelector("#TablaProductos_0 > tbody > tr:nth-child(2) > td:nth-child(1) > input:nth-child(5)").dispatchEvent(eventoChange);
	setTimeout(async function () {
		let contenedor=await document.querySelector("#TablaProductos_0 > tbody > tr:nth-child(2) > td:nth-child(3) > input")
		contenedor.value = `${Producto.unidades}`
	},1500)
}


function SetearVendedor() {
  let opciones= Array.from(document.querySelector("#NomEmpleado").options)
  opciones.map((opcion) => {
    var t = opcion.innerText.toLowerCase()
    var te= NombreVendedor.toLowerCase().toString()
    te=te.split('"').join('')

    if (t.includes(te)){
      let index = opciones.indexOf(opcion)
      document.querySelector("#NomEmpleado").selectedIndex = index
    }
  })
}


function SetearPrecio(){
	document.querySelector("#FC_NroCtaBanco\\[\\]").value="ML133456"

	var fechaActual = new Date();
	var dia = fechaActual.getDate();
	var mes = fechaActual.getMonth() + 1; // Ten en cuenta que los meses comienzan desde 0
	var año = fechaActual.getFullYear();

	// Añadir un cero delante del día y mes si son menores que 10
	dia = dia < 10 ? '0' + dia : dia;
	mes = mes < 10 ? '0' + mes : mes;

	var fechaFormateada = dia + '/' + mes + '/' + año;

	document.querySelector("#FC_FechaTransferencia\\[\\]").value = fechaFormateada

	setTimeout(function () {
		document.querySelector("#FC_MonTra\\[\\]").value=document.querySelector("#MontoTotal_0").value 
	},2500)
}
