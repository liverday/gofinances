import request from 'supertest';
import path from 'path';
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

describe('Transaction', () => {
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

  beforeEach(async () => {
    await connection.query('DELETE FROM transactions');
    await connection.query('DELETE FROM categories');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list transactions', async () => {
    await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'April Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'Macbook',
        type: 'outcome',
        value: 6000,
        category: 'Eletronics',
      });

    const response = await request(app)
      .get('/transactions')
      .auth(token, { type: 'bearer' });

    expect(response.body.transactions).toHaveLength(3);
    expect(response.body.balance).toMatchObject({
      income: 8000,
      outcome: 6000,
      total: 2000,
    });
  });

  it('should be able to create new transaction', async () => {
    const transactionsRepository = getRepository(Transaction);

    const response = await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
      },
    });

    expect(transaction).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should create tags when inserting new transactions', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const response = await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    const category = await categoriesRepository.findOne({
      where: {
        title: 'Salary',
      },
    });

    expect(category).toBeTruthy();

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
        category_id: category?.id,
      },
    });

    expect(transaction).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not create tags when they already exists', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const { identifiers } = await categoriesRepository.insert({
      user_id: user.id,
      title: 'Salary',
      icon: 'fa/FaAsterisk',
    });

    const insertedCategoryId = identifiers[0].id;

    await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
        category_id: insertedCategoryId,
      },
    });

    const categoriesCount = await categoriesRepository.find();

    expect(categoriesCount).toHaveLength(1);
    expect(transaction).toBeTruthy();
  });

  it('should not be able to create outcome transaction without a valid balance', async () => {
    await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    const response = await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'iPhone',
        type: 'outcome',
        value: 4500,
        category: 'Eletronics',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );
  });

  it('should be able to delete a transaction', async () => {
    const transactionsRepository = getRepository(Transaction);

    const response = await request(app)
      .post('/transactions')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'March Salary',
        type: 'income',
        value: 4000,
        category: 'Salary',
      });

    await request(app)
      .delete(`/transactions/${response.body.id}`)
      .auth(token, { type: 'bearer' });

    const transaction = await transactionsRepository.findOne(response.body.id);

    expect(transaction).toBeFalsy();
  });

  it('should be able to import transactions', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const importCSV = path.resolve(__dirname, 'import_template.csv');

    await request(app)
      .post('/transactions/import')
      .auth(token, { type: 'bearer' })
      .attach('file', importCSV);

    const transactions = await transactionsRepository.find();
    const categories = await categoriesRepository.find();

    expect(categories).toHaveLength(2);
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Others',
        }),
        expect.objectContaining({
          title: 'Food',
        }),
      ]),
    );

    expect(transactions).toHaveLength(3);
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Loan',
          type: 'income',
        }),
        expect.objectContaining({
          title: 'Website Hosting',
          type: 'outcome',
        }),
        expect.objectContaining({
          title: 'Ice cream',
          type: 'outcome',
        }),
      ]),
    );
  });
});
