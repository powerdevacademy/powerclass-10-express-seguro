const express = require('express');
const moment = require("moment");
const jwt = require('jsonwebtoken');
const router = express.Router();
const constants = require('../constants');

router.get('/', function(req, res, next) {
  res.json({
    message: 'Bem vindo à API pública',
  })
});

router.post('/login', (req, res) => {
  const { body } = req;

  if (body.usuario == "daniel" && body.senha == "powerdev") {
    const tokenStdClaims = {
      iss: "http://meuservidor.com.br",
      aud: "some_app_id", //identificador de qual aplicação está utilizando o token
      exp: moment().add(10, 'minutes').unix(),
      sub: "1", //é a identificação do usuário/destinatário do token - ID
    }
    const user = {
      username: "daniel",
      name: "Daniel Costa",
      email: "daniel@icarusacademy.com.br",
      scopes: ["admin", "user", "financial"],
    }

    const token = jwt.sign({ ...tokenStdClaims, ...user}, constants.SECRET_KEY );

    res.json({ token });
  } else {
    res.status(401).json({error: "Credenciais inválidas"});
  }
  
});

module.exports = router;
