//se usa express para manejar las rutas de las peticiones
const express = require("express");
const cors = require('cors')
const http = require("http");
const path = require("path");
const { createSocket } = require("./libs/socket"); //crear socket.io
const { parser } = require("./libs/serialPort"); //lectura de puerto serial
const seguimientos = require("./seguimientos/seguimientos");

//configuramos para que el path inicial sea dentro de publico
let initial_path = path.join(__dirname, "public");

//creacion de la app express y del server
const app = express();
const server = http.createServer(app);
app.use(express.static(initial_path));
app.use(cors());
app.use(express.json());
//creacion del socket a partir del http server
const io = createSocket(server);

//ruta de inicio, manda a llamar a la pagina de index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
});

//crear y listar los seguimientos
app.get("/seguimientos", (req, res) => {
  res.json(seguimientos.getSeguimientos());
});

app.post("/seguimientos",  (req, res) => {
  const seguimiento = req.body
  res.json(seguimientos.postSeguimiento(seguimiento));
});

app.delete("/seguimientos/:id", async (req, res) => {
  const id = req.params.id;
  res.json(seguimientos.deleteSeguimiento(id));
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
});

//inicia el server en el puerto 3000
server.listen(3000, () => {
  console.log("EScuchando en puerto 3000");
});
