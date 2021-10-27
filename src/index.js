//se usa express para manejar las rutas de las peticiones
const express = require("express");
const http = require("http");
const path = require("path");
const { createSocket } = require("./libs/socket"); //crear socket.io
const { parser } = require("./libs/serialPort"); //lectura de puerto serial

//configuramos para que el path inicial sea dentro de publico
let initial_path = path.join(__dirname, "public");

//creacion de la app express y del server
const app = express();
const server = http.createServer(app);
app.use(express.static(initial_path));
//creacion del socket a partir del http server
const io = createSocket(server);

//ruta de inicio, manda a llamar a la pagina de index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
});

//lectura de puerto serial en arduino
parser.on("data", function (data) {
  data = data.toString().split(":");
  let humidityValue = data[1];
  console.log("Humedad del suelo: ", humidityValue);
  //se obtiene la humedad del suelo y se envia el valor por el socket hacia todos los clientes
  io.sockets.emit("humidityValue", { value: humidityValue });
});

//Escuchar el socket cliente
io.sockets.on("connection", function (socket) {
  console.log("Se ha establecido la conexion al socket");
  let lightvalue = 0;
  socket.on("light", function (data) {
    lightvalue = data;
    if (lightvalue) {
      console.log("socket", lightvalue);
    }
  });
});

//inicia el server en el puerto 3000
server.listen(3000, () => {
  console.log("EScuchando en puerto 3000");
});