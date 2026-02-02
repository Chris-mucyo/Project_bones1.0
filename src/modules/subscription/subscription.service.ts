import Category from "../categories/category.model.js";
import CategorySubscription from "./categorySubscription.model.js";

export const subscribeToCategory = async (
  sellerId: string,
  categoryId: string
) => {
  const category = await Category.findById(categoryId);

  if (!category || !category.isActive) {
    throw new Error("Category not available");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  return await CategorySubscription.findOneAndUpdate(
    { seller: sellerId, category: categoryId },
    {
      pricePaid: category.monthlyPrice,
      expiresAt,
      status: "active",
    },
    { upsert: true, new: true }
  );
};
