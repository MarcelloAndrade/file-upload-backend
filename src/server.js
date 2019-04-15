const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const socket = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = socket(server);

// CONFIGURACAO do websocket
io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    })
});

// Configuracao de acesso para mongodb atlas
mongoose.connect("mongodb+srv://root:root123@cluster0-md2pq.mongodb.net/file-upload?retryWrites=true",
{
    useNewUrlParser: true
});

app.use( (req, res, next) => {
    console.log("socket" +req.io);
    req.io = io;
    return next();
});

// IMPORTA e CONFIGURA express para aceitar JSON
app.use(express.json());

// IMPORTA e CONFIGURA express para aceitar ARQUIVOS
app.use(express.urlencoded({ extended: true }));

// PARA rota /files busca os arquivos fisicos no diretorio tmp
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

// IMPORTA arquivo de configuracao de ROTAS
app.use(require("./routes")); 

server.listen(process.env.PORT || 3333);