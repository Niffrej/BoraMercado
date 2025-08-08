"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { categories, getCategoryById, type Category } from "@/lib/categories";

interface CategorySelectorProps {
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  placeholder?: string;
}

export default function CategorySelector({
  selectedCategoryId,
  onCategoryChange,
  placeholder = "Selecionar categoria"
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const selectedCategory = getCategoryById(selectedCategoryId);

  const handleCategorySelect = (category: Category) => {
    onCategoryChange(category.id);
    setIsOpen(false);
    setShowCustomInput(false);
  };

  const handleCustomCategory = () => {
    if (customCategory.trim()) {
      // Para categorias customizadas, usamos "outros" como ID base
      onCategoryChange("outros");
      setCustomCategory("");
      setShowCustomInput(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {selectedCategoryId ? (
            <>
              <div className={`p-1 rounded ${selectedCategory.bgColor}`}>
                <selectedCategory.icon
                  className={`h-4 w-4 ${selectedCategory.color}`}
                />
              </div>
              <span>{selectedCategory.name}</span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className={`p-1 rounded ${category.bgColor}`}>
                <category.icon className={`h-4 w-4 ${category.color}`} />
              </div>
              <span>{category.name}</span>
              {selectedCategoryId === category.id && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}

          {/* Opção para categoria customizada */}
          <div className="border-t border-gray-100">
            {showCustomInput ? (
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Digite sua categoria..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCustomCategory();
                    }
                  }}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleCustomCategory}
                    className="flex-1 bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomCategory("");
                    }}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <div className="p-1 rounded bg-blue-100">
                  {(() => {
                    const Icon = categories[categories.length - 1].icon;
                    return <Icon className="h-4 w-4 text-blue-600" />;
                  })()}
                </div>
                <span>Criar categoria personalizada</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
