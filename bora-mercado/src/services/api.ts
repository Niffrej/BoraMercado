import { ShoppingList } from "@/types";

const API_BASE_URL = "/api";

// Buscar todas as listas
export async function fetchShoppingLists(): Promise<ShoppingList[]> {
  const response = await fetch(`${API_BASE_URL}/lists`);
  if (!response.ok) {
    throw new Error("Erro ao buscar listas");
  }
  return response.json();
}

// Buscar lista específica
export async function fetchShoppingList(id: string): Promise<ShoppingList> {
  const response = await fetch(`${API_BASE_URL}/lists/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar lista");
  }
  return response.json();
}

// Criar nova lista
export async function createShoppingList(
  list: Omit<ShoppingList, "id">
): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE_URL}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(list)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar lista");
  }
  return response.json();
}

// Atualizar lista
export async function updateShoppingList(
  id: string,
  updates: Partial<ShoppingList>
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/lists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar lista");
  }
}

// Deletar lista
export async function deleteShoppingList(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/lists/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar lista");
  }
}
