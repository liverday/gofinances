import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import Category from '../entities/Category';

interface Request {
  category_id: string;
  title: string;
  icon: string;
  background_color_light: string;
  background_color_dark: string;
}

class UpdateCategoryService {
  async execute({
    category_id,
    title,
    icon,
    background_color_light,
    background_color_dark,
  }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    let category = await categoryRepository.findOne(category_id);

    if (!category) throw new AppError('Category not found');

    category = {
      ...category,
      title,
      icon,
      background_color_light,
      background_color_dark,
    };

    await categoryRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
