const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send("Servidor levantado correctamente");
})

app.get('/consumidores', async (req, res) => {
    try {
        const connection = await oracledb.getConnection({
            user: "C##BD_AMAZON",
            password: 'oracle',
            connectString: "localhost/xe"
        });

        const result = await connection.execute('SELECT * FROM TBL_CONSUMIDORES');
        const data = result.rows;

        await connection.close(); // Cerrar la conexión después de obtener los datos

        res.send(data); // Enviar los datos al cliente

    } catch (error) {
        res.status(500).send({ error: error.message }); // Manejar errores y enviar una respuesta de error al cliente
    }
});

app.listen(port, () => {
    console.log(`Servidor levantado en el puerto: ${port}`);
})