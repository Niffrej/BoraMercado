"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  listName: string;
  isCompleted?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  listName,
  isCompleted = false
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 bg-opacity-95 flex items-center justify-center z-50 p-4"
      onKeyPress={handleKeyPress}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Excluir Lista</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-700 mb-2">
              Tem certeza que deseja excluir a lista:
            </p>
            <p className="font-semibold text-gray-900 bg-gray-50 p-2 rounded-lg">
              &ldquo;{listName}&rdquo;
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              ⚠️ Esta ação não pode ser desfeita.{" "}
              {isCompleted ? "A lista finalizada" : "Todos os itens"} será
              {isCompleted ? "" : "ão"} perdido{isCompleted ? "a" : "s"}{" "}
              permanentemente.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
