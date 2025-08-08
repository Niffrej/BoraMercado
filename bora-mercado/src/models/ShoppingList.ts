import { Schema, models, model } from "mongoose";

const ShoppingItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    categoryId: { type: String, required: false },
    unitValue: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1 },
    value: { type: Number, required: true, default: 0 },
    checked: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const ShoppingListSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    items: { type: [ShoppingItemSchema], default: [] },
    totalValue: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const ShoppingList =
  models.ShoppingList || model("ShoppingList", ShoppingListSchema);
export default ShoppingList;
