export interface ShoppingItem {
  id: string;
  name: string;
  categoryId: string;
  unitValue: number;
  quantity: number;
  value: number; // unitValue * quantity
  checked: boolean;
  createdAt: Date;
}

export interface ShoppingList {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  items: ShoppingItem[];
  totalValue: number;
  isActive: boolean;
}
