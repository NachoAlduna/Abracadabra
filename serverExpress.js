const express = require('express')
const app = express()
app.listen(3000, () => {
console.log('El servidor está inicializado en el puerto 3000')
})
app.use(express.static("assets"));
//Array con los usuarios
const usuario = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];
//Ruta para usuarios
app.get('/abracadabra/usuarios', function (req, res) {
  res.send({ usuarios: usuario });
});

// Middleware para verificar si el usuario existe
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const username = req.params.usuario; // Extraer el nombre de usuario del parámetro de la ruta
  if (!usuario.includes(username)) { //// Comprobar si el nombre de usuario existe en la lista de usuarios autorizados
    res.sendFile(__dirname + '/assets/who.jpeg'); // si el usuario no esta manda a la imagen de respuesta no autorizada
  } else {
    // Si el usuario está autorizado, llamar a la función "next()"
    // para continuar con el siguiente middleware o controlador de ruta
    next();
  }
});

// Ruta para /abracadabra/juego/:usuario
app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("/abracadabra/conejo/:n", (req, res) => {
// Paso 2
const n = Math.floor(Math.random() * (4 - 1)) + 1;
// Paso 3
const numero = req.params.n;
// Paso 3
numero == n
? res.sendFile(__dirname + '/assets/conejito.jpg')
: res.sendFile(__dirname + '/assets/voldemort.jpg')
});


//Ruta generica para mensaje de error
app.get("*", (req, res) => {
res.send("<center><h1> Esta página no existe :() </h1></center>");
});
