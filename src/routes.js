const express = require("express");
const multer =  require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

/**
 * Middleware (Interceptador)
 * Executar qualquer código.
 * Fazer mudanças nos objetos de solicitação e resposta.
 * Encerrar o ciclo de solicitação-resposta.
 * Chamar o próximo middleware na pilha.
 * */ 
routes.post("/boxes", BoxController.store)
routes.get("/boxes/:id", BoxController.show)

routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store)

module.exports = routes;