const ServicoPessoa = require('../services/pessoa.js');
const servicoPessoa = new ServicoPessoa();

class ControllerPessoa {

    async PegarUm(req, res){
        const { id } = req.params;
        try {
            const pessoa = await servicoPessoa.PegarUm(id);
            if (!pessoa) {
                return res.status(404).json({ message: 'Pessoa não encontrada.' });
            }
            res.status(200).json(pessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async PegarTodos(req, res){
        try {
            const pessoas = await servicoPessoa.PegarTodos();
            res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async Adicionar(req, res){
        const { pessoa } = req.body;
        try {
            const novaPessoa = await servicoPessoa.Adicionar(pessoa);
            res.status(201).json({ message: 'Pessoa adicionada com sucesso!', pessoa: novaPessoa });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async Alterar(req, res){
        const { id } = req.params;
        const { pessoa } = req.body;
        try {
            await servicoPessoa.Alterar(id, pessoa);
            res.status(200).json({ message: 'Pessoa alterada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async Deletar(req, res){
        const { id } = req.params;
        try {
            await servicoPessoa.Deletar(id);
            res.status(200).json({ message: 'Pessoa deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ControllerPessoa;
