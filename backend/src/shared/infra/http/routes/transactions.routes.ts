import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import isAuthenticated from '../middlewares/isAuthenticated';

import TransactionsController from '../controllers/transactions/TransactionsController';
import ImportTransactionsController from '../controllers/transactions/ImportTransactionsController';
import BalanceController from '../controllers/transactions/BalanceController';
import GetTransactionsCountByCategoryController from '../controllers/transactions/GetTransactionsCountByCategoryController';
import GetTransactionsOverviewController from '../controllers/transactions/GetTransactionsOverviewController';

const upload = multer(uploadConfig);

const transactionsRouter = Router();
const transactionsController = new TransactionsController();
const balanceController = new BalanceController();
const getTransactionsCountByCategoryController = new GetTransactionsCountByCategoryController();
const getTransactionsOverviewController = new GetTransactionsOverviewController();
const importTranscationsController = new ImportTransactionsController();

transactionsRouter.use(isAuthenticated);

transactionsRouter.get('/', transactionsController.index);
transactionsRouter.post('/', transactionsController.store);
transactionsRouter.delete('/:id', transactionsController.delete);
transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTranscationsController.store,
);
transactionsRouter.get('/balance', balanceController.index);
transactionsRouter.get(
  '/count-by-category',
  getTransactionsCountByCategoryController.index,
);
transactionsRouter.get(
  '/overview-data',
  getTransactionsOverviewController.index,
);
export default transactionsRouter;
