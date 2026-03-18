'use server';

import { revalidatePath } from 'next/cache';
import * as categoryService from './category.service';
import type { NewCategory } from '@/lib/db/schema';

export async function getCategoriesAction() {
  return await categoryService.getCategories();
}

export async function addCategoryAction(data: NewCategory) {
  const result = await categoryService.addCategory(data);
  revalidatePath('/');
  return result;
}

export async function updateCategoryAction(id: string, data: Partial<NewCategory>) {
  const result = await categoryService.updateCategory(id, data);
  revalidatePath('/');
  return result;
}

export async function deleteCategoryAction(id: string) {
  const result = await categoryService.deleteCategory(id);
  revalidatePath('/');
  return result;
}
