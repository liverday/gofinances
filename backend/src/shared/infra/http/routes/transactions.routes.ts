import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import isAuthenticated from '../middlewares/isAuthenticated';

import TransactionsRepository from '../../../../modules/transactions/repositories/TransactionsRepository';
import CreateTransactionService from '../../../../modules/transactions/services/CreateTransactionService';
import DeleteTransactionService from '../../../../modules/transactions/services/DeleteTransactionService';
import ImportTransactionsService from '../../../../modules/transactions/services/ImportTransactionsService';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.use(isAuthenticated);

transactionsRouter.get('/', async (request, response) => {
  const { id } = request.user;
  const { sort, direction } = request.query;

  let order: object = {
    created_at: 'DESC',
  };

  if (sort && direction) {
    order = {
      [sort as string]: direction,
    };
  }

  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find({
    where: { user_id: id },
    relations: ['category'],
    order,
  });

  const balance = await transactionRepository.getBalance(id);

  return response.json({
    transactions,
    balance,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { id } = request.user;
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    user_id: id,
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const user_id = request.user.id;
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute({ user_id, id });

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const { id } = request.user;
    const { path }: any = request.file;

    const importTransactions = new ImportTransactionsService();

    const transactions = await importTransactions.execute({
      user_id: id,
      path,
    });

    return response.json(transactions);
  },
);

export default transactionsRouter;
