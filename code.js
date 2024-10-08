//Definición de variables
const url = 'http://localhost:3000/api/articulos/';
const contenedor = document.querySelector('tbody')
let resultados = ''

//const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const btnCrear = document.getElementById('btnGuardar')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
var opcion = ''


btnGuardar.addEventListener('click', () => {
        // Recoger los datos del formulario
        //formArticulo = new formArticulo(form);

        // Convertir FormData a objeto
        //const data = {};
        formArticulo.forEach((name,value) => {
            descripcion.value = '';
            precio.value = '';
            stock.value = '';
            opcion = 'guardar'
        });

        // Realizar la solicitud POST
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Enviar datos en formato JSON
            },
            body: JSON.stringify(formArticulo) // Convertir el objeto de datos a una cadena JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Analizar la respuesta JSON
        })
        .then(formArticulo => {
            console.log('Success:', formArticulo); // Manejar datos de la respuesta
            alert('Datos guardados exitosamente!');
        })
        .catch(error => {
            console.error('Error:', error); // Manejar errores
            alert('Error al guardar los datos.');
        });
    });

//funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.precio}</td>
                            <td>${articulo.stock}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  /*
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML
    descripcion.value =  descripcionForm
    precio.value =  precioForm
    stock.value =  stockForm
    opcion = 'editar'
    modalArticulo.show()
     
})

// CREATE: Crear un nuevo elemento
async function createItem(articulo) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    return await response.json();
}
/* //Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
}) */

