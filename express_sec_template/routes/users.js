var express = require('express');
var router = express.Router();
var cors = require('cors');

const users = [
  {uid: 1, name: "Daniel Costa",   username: "daniel"},
  {uid: 2, name: "Juliana Borba",  username: "juliana"},
  {uid: 3, name: "Rafaela Costa",  username: "rafinha"},
  {uid: 4, name: "Maria Fernanda", username: "maria"},
  {uid: 9, name: "João Pedro",     username: "joao"},
];


/* GET users listing. */
router.get('/', function(req, res) {
  if (req.token.scopes.includes('admin')) {
    res.json( users );
  }
  res.status(403).json({error: "Você não está autorizado a executar essa ação"});
  
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  if (req.token.sub != id && !req.token.scopes.includes('admin')) {
    res.status(403).json({error: "Você não está autorizado a executar essa ação"});
  }

  const user = users.find(u => u.uid == id);

  if (!user) {
    res.status(404).json({"error": "Usuário inexistente"});
  } else {
    res.json({ user });
  }
});

module.exports = router;
