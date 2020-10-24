import { getRepository } from 'typeorm';
import ConfirmActionError from '../../../shared/errors/ConfirmActionError';

import Category from '../entities/Category';
import Transaction from '../../transactions/entities/Transaction';
import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  category_id: string;
  isConfirmed: boolean;
}

class DeleteCategoryService {
  async execute({
    user_id,
    category_id,
    isConfirmed,
  }: Request): Promise<boolean> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne({
      where: {
        user_id,
        id: category_id,
      },
    });

    if (!category) {
      throw new AppError('Category not found');
    }

    const [transactions, count] = await transactionRepository.findAndCount({
      where: {
        category_id,
      },
    });

    if (count > 0) {
      if (!isConfirmed)
        throw new ConfirmActionError(
          'Tem certeza que deseja executar essa operação? Todas as transações vinculadas à esta categoria serão apagadas!',
        );

      await transactionRepository.remove(transactions);
    }

    await categoryRepository.remove(category);

    return true;
  }
}

export default DeleteCategoryService;
