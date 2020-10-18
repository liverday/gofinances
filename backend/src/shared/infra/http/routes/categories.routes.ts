import { Router } from 'express';
import { getRepository } from 'typeorm';

import isAuthenticated from '../middlewares/isAuthenticated';

import Category from '../../../../modules/categories/entities/Category';

import CreateCategoryService from '../../../../modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '../../../../modules/categories/services/UpdateCategoryService';

const categoriesRouter = Router();
categoriesRouter.use(isAuthenticated);

categoriesRouter.get('/', async (req, res) => {
  const { id } = req.user;
  const categoriesRepository = getRepository(Category);

  const categories = await categoriesRepository.find({
    where: {
      user_id: id,
    },
  });

  return res.json(categories);
});

categoriesRouter.post('/', async (req, res) => {
  const { id } = req.user;
  const {
    title,
    icon,
    background_color_light,
    background_color_dark,
  } = req.body;

  const createCategoryService = new CreateCategoryService();

  const category = await createCategoryService.execute({
    user_id: id,
    title,
    icon,
    background_color_light,
    background_color_dark,
  });

  return res.json(category);
});

categoriesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    icon,
    background_color_light,
    background_color_dark,
  } = req.body;

  const updateCategoryService = new UpdateCategoryService();

  const category = await updateCategoryService.execute({
    category_id: id,
    title,
    icon,
    background_color_light,
    background_color_dark,
  });

  return res.json(category);
});

// TODO: Criar serviço de delete

export default categoriesRouter;
