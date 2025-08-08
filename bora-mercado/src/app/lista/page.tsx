"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Check,
  Edit3,
  Trash2,
  ShoppingCart,
  DollarSign,
  Hash,
  Filter,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ShoppingItem } from "@/types";
import CategorySelector from "@/components/ui/category-selector";
import { categories, getCategoryById } from "@/lib/categories";

export default function ShoppingListPage() {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [editingListName, setEditingListName] = useState(false);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemUnitValue, setNewItemUnitValue] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editUnitValue, setEditUnitValue] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [startDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Carregar dados da lista (nova ou existente)
  useEffect(() => {
    const savedListName = localStorage.getItem("newListName");
    const continueListId = localStorage.getItem("continueListId");

    if (continueListId) {
      // Carregar lista existente
      loadExistingList(continueListId);
      localStorage.removeItem("continueListId");
    } else if (savedListName) {
      // Nova lista com nome
      setListName(savedListName);
      localStorage.removeItem("newListName");
    }
  }, []);

  const loadExistingList = async (listId: string) => {
    // TODO: Implementar carregamento real do Firebase
    // Por enquanto, dados mockados
    const mockExistingLists = {
      "open-1": {
        name: "Churrasco do Final de Semana",
        items: [
          {
            id: "1",
            name: "Carne Bovina",
            categoryId: "carnes-aves-peixes",
            unitValue: 35.0,
            quantity: 2,
            value: 70.0,
            checked: false,
            createdAt: new Date()
          },
          {
            id: "2",
            name: "Carvão",
            categoryId: "outros",
            unitValue: 8.0,
            quantity: 1,
            value: 8.0,
            checked: true,
            createdAt: new Date()
          }
        ],
        startDate: new Date("2024-01-20")
      },
      "open-2": {
        name: "Compras do Mês",
        items: [
          {
            id: "3",
            name: "Arroz",
            categoryId: "graos-cereais",
            unitValue: 4.5,
            quantity: 2,
            value: 9.0,
            checked: false,
            createdAt: new Date()
          }
        ],
        startDate: new Date("2024-01-18")
      }
    };

    const existingList =
      mockExistingLists[listId as keyof typeof mockExistingLists];
    if (existingList) {
      setListName(existingList.name);
      setItems(existingList.items);
    }
  };

  // Filtrar itens por categoria
  const filteredItems = categoryFilter
    ? items.filter((item) => item.categoryId === categoryFilter)
    : items;

  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const checkedValue = items
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.value, 0);

  // Calcular totais por categoria
  const categoryTotals = items.reduce((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = 0;
    }
    acc[item.categoryId] += item.value;
    return acc;
  }, {} as Record<string, number>);

  const addItem = () => {
    if (newItemName.trim() && newItemCategory) {
      const unitValue = parseFloat(newItemUnitValue) || 0;
      const quantity = parseInt(newItemQuantity) || 1;
      const totalValue = unitValue * quantity;

      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        categoryId: newItemCategory,
        unitValue,
        quantity,
        value: totalValue,
        checked: false,
        createdAt: new Date()
      };
      setItems([...items, newItem]);
      setNewItemName("");
      setNewItemUnitValue("");
      setNewItemQuantity("1");
      setNewItemCategory("");
      setShowAddForm(false);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const startEdit = (item: ShoppingItem) => {
    setEditingItem(item.id);
    setEditName(item.name);
    setEditUnitValue(item.unitValue.toString());
    setEditQuantity(item.quantity.toString());
    setEditCategory(item.categoryId);
  };

  const saveEdit = () => {
    if (editingItem) {
      const unitValue = parseFloat(editUnitValue) || 0;
      const quantity = parseInt(editQuantity) || 1;
      const totalValue = unitValue * quantity;

      setItems(
        items.map((item) =>
          item.id === editingItem
            ? {
                ...item,
                name: editName,
                categoryId: editCategory,
                unitValue,
                quantity,
                value: totalValue
              }
            : item
        )
      );
      setEditingItem(null);
      setEditName("");
      setEditUnitValue("");
      setEditQuantity("");
      setEditCategory("");
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditName("");
    setEditUnitValue("");
    setEditQuantity("");
    setEditCategory("");
  };

  const finishList = async () => {
    try {
      // TODO: Implementar salvamento real no Firebase
      const listData = {
        name: listName || "Lista de Compras",
        items,
        startDate,
        endDate: new Date(),
        totalValue,
        isActive: false
      };

      console.log("Lista finalizada:", listData);
      alert(`Lista "${listData.name}" finalizada com sucesso!`);
      router.push("/");
    } catch (error) {
      console.error("Erro ao finalizar lista:", error);
      alert("Erro ao finalizar lista. Tente novamente.");
    }
  };

  const cancelList = () => {
    const confirmCancel = confirm(
      "Tem certeza que deseja cancelar esta lista? Todos os itens serão perdidos."
    );
    if (confirmCancel) {
      router.push("/");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="text-center flex-1 mx-4">
            {editingListName ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setEditingListName(false);
                    }
                  }}
                  onBlur={() => setEditingListName(false)}
                  className="text-xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 text-center outline-none placeholder-gray-500"
                  placeholder="Nome da lista"
                  autoFocus
                />
                <p className="text-sm text-gray-600">
                  {format(startDate, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            ) : (
              <div
                onClick={() => setEditingListName(true)}
                className="cursor-pointer"
              >
                <h1 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  {listName || "Lista de Compras"}
                </h1>
                <p className="text-sm text-gray-600">
                  {format(startDate, "dd 'de' MMMM", { locale: ptBR })}
                </p>
                {!listName && (
                  <p className="text-xs text-gray-400 mt-1">
                    Clique para nomear
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={cancelList}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={finishList}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* Resumo financeiro */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-bold text-gray-800">
                R$ {totalValue.toFixed(2)}
              </p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">Selecionado</p>
              <p className="text-lg font-bold text-green-600">
                R$ {checkedValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filtro por categoria */}
        <div className="mb-4">
          {showCategoryFilter ? (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">
                  Filtrar por categoria
                </h3>
                <button
                  onClick={() => {
                    setShowCategoryFilter(false);
                    setCategoryFilter("");
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCategoryFilter("")}
                  className={`p-2 rounded-lg text-sm border transition-colors ${
                    !categoryFilter
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setCategoryFilter(category.id)}
                      className={`p-2 rounded-lg text-sm border transition-colors flex items-center space-x-2 ${
                        categoryFilter === category.id
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCategoryFilter(true)}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 flex items-center space-x-3 hover:shadow-md transition-shadow"
            >
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500">
                {categoryFilter
                  ? `Filtro: ${getCategoryById(categoryFilter).name}`
                  : "Filtrar por categoria"}
              </span>
              {categoryFilter && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategoryFilter("");
                  }}
                  className="ml-auto p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </button>
          )}
        </div>

        {/* Formulário de adicionar item */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome do item (ex: Açúcar)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, addItem)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                autoFocus
              />
              <CategorySelector
                selectedCategoryId={newItemCategory}
                onCategoryChange={setNewItemCategory}
                placeholder="Selecionar categoria"
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantidade"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, addItem)}
                    className="w-full pl-10 pr-8 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-gray-900 placeholder-gray-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                    x
                  </span>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Valor unitário"
                    value={newItemUnitValue}
                    onChange={(e) => setNewItemUnitValue(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, addItem)}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              {newItemQuantity && newItemUnitValue && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Total: {newItemQuantity} x R${" "}
                    {parseFloat(newItemUnitValue || "0").toFixed(2)} =
                    <span className="font-semibold text-green-600 ml-1">
                      R${" "}
                      {(
                        parseInt(newItemQuantity || "1") *
                        parseFloat(newItemUnitValue || "0")
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={addItem}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botão adicionar item */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 mb-6 hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Plus className="h-5 w-5" />
              <span>Adicionar item</span>
            </div>
          </button>
        )}

        {/* Lista de itens */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const category = getCategoryById(item.categoryId);
            const Icon = category.icon;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-4 shadow-sm transition-all ${
                  item.checked ? "bg-green-50 border border-green-200" : ""
                }`}
              >
                {editingItem === item.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      placeholder="Nome do item"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                    />
                    <CategorySelector
                      selectedCategoryId={editCategory}
                      onCategoryChange={setEditCategory}
                      placeholder="Selecionar categoria"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Hash className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="number"
                          min="1"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          placeholder="Qtd"
                          className="w-full pl-7 pr-6 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-gray-900 placeholder-gray-500"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs font-medium">
                          x
                        </span>
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="number"
                          step="0.01"
                          value={editUnitValue}
                          onChange={(e) => setEditUnitValue(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          placeholder="Valor unit."
                          className="w-full pl-7 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                    {editQuantity && editUnitValue && (
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-600 text-center">
                          Total: {editQuantity} x R${" "}
                          {parseFloat(editUnitValue || "0").toFixed(2)} =
                          <span className="font-semibold text-green-600 ml-1">
                            R${" "}
                            {(
                              parseInt(editQuantity || "1") *
                              parseFloat(editUnitValue || "0")
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`p-1 rounded-full transition-colors ${
                          item.checked
                            ? "bg-green-500 text-white"
                            : "border-2 border-gray-300 text-transparent hover:border-green-400"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p
                            className={`font-medium ${
                              item.checked
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {item.name}
                          </p>
                          <div className={`p-1 rounded ${category.bgColor}`}>
                            <Icon className={`h-3 w-3 ${category.color}`} />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p
                            className={`text-sm ${
                              item.checked ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item.quantity}x R$ {item.unitValue.toFixed(2)}
                          </p>
                          <p
                            className={`text-sm font-semibold ${
                              item.checked ? "text-gray-400" : "text-green-600"
                            }`}
                          >
                            = R$ {item.value.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo por categorias */}
        {items.length > 0 && Object.keys(categoryTotals).length > 0 && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Resumo por Categorias
            </h3>
            <div className="space-y-2">
              {Object.entries(categoryTotals)
                .sort(([, a], [, b]) => b - a) // Ordenar por valor (maior primeiro)
                .map(([categoryId, total]) => {
                  const category = getCategoryById(categoryId);
                  const Icon = category.icon;
                  const percentage = ((total / totalValue) * 100).toFixed(1);

                  return (
                    <div
                      key={categoryId}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded ${category.bgColor}`}>
                          <Icon className={`h-4 w-4 ${category.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {percentage}% do total
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        R$ {total.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {items.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <div className="bg-white p-6 rounded-full shadow-lg inline-block mb-4 opacity-50">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-gray-500">Sua lista está vazia</p>
            <p className="text-sm text-gray-400 mt-1">
              Adicione itens para começar suas compras
            </p>
          </div>
        )}

        {categoryFilter && filteredItems.length === 0 && items.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-white p-6 rounded-full shadow-lg inline-block mb-4 opacity-50">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-gray-500">
              Nenhum item na categoria selecionada
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tente outro filtro ou adicione itens desta categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
