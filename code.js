const { response, json } = require("express");

//Variables
const url = 'http://localhost:3000/index.html'
const contenedor = document.querySelector('tbody');
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')

const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
let opcion = ''

//BOTON CREAR LLENADO DE CAMPOS
btnCrear.addEventListener('click',()=>{
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//Funcion Mostrar
const mostrar = (articulos)=>{
    articulos.forEach(articulo=> {
    resultados += `<tr>
                    <td>${articulo.id}</td>
                    <td>${articulo.precio}</td>
                    <td>${articulo.descripcion}</td>
                    <td>${articulo.stock}</td>
                    <td class="text-center"><a class ="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>
                 `
        
})
    contenedor.innerHTML = resultados
}

//Procedimiento Mostrar
fetch (url)
    .then(response => response.json())
    .then(data => mostrar (data))
    .catch(error => console.log(error));
    