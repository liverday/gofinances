import request from 'supertest';
import { hash } from 'bcryptjs';
import { Connection, getRepository, getConnection } from 'typeorm';

import createConnection from '../shared/infra/typeorm';

import Transaction from '../modules/transactions/entities/Transaction';
import Category from '../modules/categories/entities/Category';

import app from '../app';

let connection: Connection;
let token: string;
let user: {
  id: string;
};

describe('Categories', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS transactions');
    await connection.query('DROP TABLE IF EXISTS categories');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ('test', 'teste@teste.com', $1)`,
      [await hash('teste123', 8)],
    );

    const loginResponse = await request(app).post('/sessions').send({
      email: 'teste@teste.com',
      password: 'teste123',
    });

    token = loginResponse.body.token;
    user = loginResponse.body.user;
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a category', async () => {
    const categoryRepository = getRepository(Category);

    const response = await request(app)
      .post('/categories')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'Food',
        icon: 'fi/FiShoppingCart',
        background_color_light: '##9C107B',
        background_color_dark: '##F38EDC',
      });

    const category = await categoryRepository.findOne({
      where: {
        title: 'Food',
      },
    });

    expect(category).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should be able to list categories', async () => {
    const response = await request(app)
      .get('/categories')
      .auth(token, { type: 'bearer' })
      .send();

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Food',
        }),
      ]),
    );
  });

  it('should be able to update category', async () => {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne();

    expect(category).toBeTruthy();

    if (category) {
      const response = await request(app)
        .put(`/categories/${category.id}`)
        .auth(token, { type: 'bearer' })
        .send({
          ...category,
          title: 'Foods',
        });

      expect(response.body).toMatchObject(
        expect.objectContaining({
          title: 'Foods',
        }),
      );
    }
  });

  it('should be able to delete a category', async () => {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne();

    expect(category).toBeTruthy();

    if (category) {
      const response = await request(app)
        .delete(`/categories/${category.id}`)
        .auth(token, { type: 'bearer' })
        .send();

      expect(response.status).toBe(204);

      const categoryAfterDelete = await categoryRepository.findOne(category.id);

      expect(categoryAfterDelete).toBeFalsy();
    }
  });

  it('should be able to reject a delete of a category which has transactions', async () => {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const { identifiers } = await categoryRepository.insert({
      user_id: user.id,
      title: 'Fun',
      icon: 'fi/FiSmile',
      background_color_light: '#3978B4',
      background_color_dark: '#78A8D4',
    });

    const category_id = identifiers[0].id;

    await transactionRepository.insert({
      user_id: user.id,
      category_id,
      title: 'Playstation 5',
      type: 'outcome',
      value: 5000,
    });

    const response = await request(app)
      .delete(`/categories/${category_id}`)
      .auth(token, { type: 'bearer' })
      .send();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: expect.stringContaining(
          'Tem certeza que deseja executar essa operação',
        ),
        status: 'confirm',
      }),
    );
  });

  it('should be able to delete a category and transactions with confirm', async () => {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne({
      where: {
        title: 'Fun',
      },
    });

    expect(category).toBeTruthy();

    if (category) {
      const response = await request(app)
        .delete(`/categories/${category.id}?isConfirmed=true`)
        .auth(token, { type: 'bearer' });

      expect(response.status).toBe(204);
    }
  });
});
