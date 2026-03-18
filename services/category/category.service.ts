import { db } from '@/lib/db';
import { categories, type Category, type NewCategory } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name);
}

export async function addCategory(data: NewCategory) {
  return await db.insert(categories).values(data).returning();
}

export async function updateCategory(id: string, data: Partial<NewCategory>) {
  return await db.update(categories).set(data).where(eq(categories.id, id)).returning();
}

export async function deleteCategory(id: string) {
  return await db.delete(categories).where(eq(categories.id, id)).returning();
}
