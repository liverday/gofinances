import { getRepository } from 'typeorm';

import Category from '../entities/Category';

interface Request {
  user_id: string;
  title: string;
  icon: string;
  background_color_light: string;
  background_color_dark: string;
}

class CreateCategoryService {
  async execute({
    user_id,
    title,
    icon,
    background_color_light,
    background_color_dark,
  }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const category = categoriesRepository.create({
      user_id,
      title,
      icon,
      background_color_light,
      background_color_dark,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
