const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// EXPORTA objeto que tem configuracoes do MULTER para upload de arquivo
module.exports = {
    // destino dos arquivos
    dest: path.resolve(__dirname, "..", "..", "tmp"),

    // LOCAL de armazenamento dos arquivos (disco, nuvem)
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp") );
        },

        // nome do arquivo final no diretorio
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);
                
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    })
};
