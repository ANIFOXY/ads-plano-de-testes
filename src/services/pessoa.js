const pessoaRepository = require('../repositories/pessoa');

class PessoaService {
  async Adicionar(pessoa) {
    const t = await sequelize.transaction();
    try {
      const novaPessoa = await pessoaRepository.Adicionar(pessoa, { transaction: t });
      await t.commit();
      return novaPessoa;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async PegarTodos() {
    return pessoaRepository.PegarTodos();
  }

  async PegarPorId(id) {
    return pessoaRepository.PegarPorId(id);
  }

  async Alterar(id, pessoa) {
    const t = await sequelize.transaction();
    try {
      const pessoaAlterada = await pessoaRepository.Alterar(id, pessoa, { transaction: t });
      await t.commit();
      return pessoaAlterada;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async Deletar(id) {
    const t = await sequelize.transaction();
    try {
      const resultado = await pessoaRepository.Deletar(id, { transaction: t });
      await t.commit();
      return resultado;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new PessoaService();
