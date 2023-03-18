const {serverHttp} = require('./server');
const cors = require('cors');
const port = process.env.PORT || 8080;

const path = require('path');
const express = require('express');
const app = express();



require('./webSocket'); //chamada para o servidor
serverHttp.listen(port, () => console.log('Rodando o socket na porta: '+port));

