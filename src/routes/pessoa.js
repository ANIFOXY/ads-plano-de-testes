const express = require('express');
const ControllerPessoa = require('../controllers/pessoa.js');

const router = express.Router();
const controllerPessoa = new ControllerPessoa();

router.get('/api/pessoas', controllerPessoa.PegarTodos);
router.get('/api/pessoa/:id', controllerPessoa.PegarUm);
router.post('/api/pessoa', controllerPessoa.Adicionar);
router.put('/api/pessoa/:id', controllerPessoa.Alterar);
router.delete('/api/pessoa/:id', controllerPessoa.Deletar);

module.exports = router;
