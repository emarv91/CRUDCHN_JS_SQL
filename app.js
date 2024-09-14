const express = require('express')
const sql = require('mssql')
const cors = require('cors')
const { json } = require('express')
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
//Establecemos los prámetros de conexión
const conexion = {
    user: 'sa',
    password: 'root',
    server: 'localhost', // Puede ser una dirección IP o nombre del servidor
    database: 'articulos_db',
    options: {
        encrypt: true, // Utiliza cifrado para la conexión (puede ser necesario para SQL Server en Azure)
        trustServerCertificate: true // Si es necesario para el entorno local
    }
};

async function getConnection() {
        try {
            const pool = await sql.connect(conexion);
            return pool;
        } catch (err) {
            console.error('Error de conexión a SQL Server:', err);
            throw err;
        }
    }

// Ruta para probar la conexión y ejecutar una consulta
app.get('/api/articulos/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM articulos'); // Cambia 'tu_tabla' al nombre de tu tabla
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error en la consulta: ' + err.message);
    }
});

/*
// Datos que quieres enviar
const data = {
    name: 'New Item',
    value: 100
};

// Realizar la solicitud POST
fetch(apiUrl, {
    method: 'POST', // Método HTTP
    headers: {
        'Content-Type': 'application/json' // Especifica que el contenido es JSON
    },
    body: JSON.stringify(data) // Convierte el objeto JavaScript a una cadena JSON
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Analiza la respuesta como JSON
})
.then(data => {
    console.log('Success:', data); // Maneja los datos recibidos
})
.catch(error => {
    console.error('Error:', error); // Maneja cualquier error
});*/


//Crear un artículo
app.post('/api/articulo', (req,res)=>{
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}
    let consulta = "INSERT INTO articulos SET ?"
    //let sql = "INSERT INTO articulos SET ?"
    conexion.query(consulta, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})
/*
//Editar articulo
app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let stock = req.body.stock
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
    conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})
//Eliminar articulo
app.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})
*/