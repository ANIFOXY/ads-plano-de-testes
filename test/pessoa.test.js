const request = require('supertest');
const app = express('../src/app');
const sequelize = require('../src/config/database');
const pessoaService = require('../src/services/pessoaService');

describe('Testes de Integração - CRUD de Pessoas', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close(); 
  });

  beforeEach(async () => {
    
  });

  afterEach(async () => {
   
  });

  it('Deve adicionar uma nova pessoa', async () => {
    const novaPessoa = { nome: 'João', email: 'joao@example.com', senha: 'senha123' };
    const res = await request(app)
      .post('/api/pessoa')
      .send({ pessoa: novaPessoa });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Pessoa adicionada com sucesso!');
  });

  it('Deve pegar todas as pessoas', async () => {
    const res = await request(app).get('/api/pessoa');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve pegar uma pessoa pelo ID', async () => {
    const todasAsPessoas = await pessoaService.PegarTodos();
    const pessoaId = todasAsPessoas[0].id;
    const res = await request(app).get(`/api/pessoa/${pessoaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', pessoaId);
  });

  it('Deve alterar uma pessoa existente', async () => {
    const todasAsPessoas = await pessoaService.PegarTodos();
    const pessoaId = todasAsPessoas[0].id;
    const pessoaAlterada = { nome: 'João da Silva' };
    const res = await request(app)
      .put(`/api/pessoa/${pessoaId}`)
      .send(pessoaAlterada);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Pessoa alterada com sucesso!');
  });

  it('Deve deletar uma pessoa existente', async () => {
    const todasAsPessoas = await pessoaService.PegarTodos();
    const pessoaId = todasAsPessoas[0].id;
    const res = await request(app).delete(`/api/pessoa/${pessoaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Pessoa deletada com sucesso!');
  });

});
