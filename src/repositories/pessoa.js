const { Pessoa } = require('../models');
const sequelize = require('../config/database');

class PessoaRepository {
  async Adicionar(pessoa) {
    return Pessoa.create(pessoa);
  }

  async PegarTodos() {
    return Pessoa.findAll();
  }

  async PegarPorId(id) {
    return Pessoa.findByPk(id);
  }

  async Alterar(id, pessoa) {
    return Pessoa.update(pessoa, {
      where: {
        id,
      },
    });
  }

  async Deletar(id) {
    return Pessoa.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new PessoaRepository();
