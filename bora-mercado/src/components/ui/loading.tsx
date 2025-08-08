"use client";

import { ShoppingCart } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative bg-white p-6 rounded-full shadow-lg">
            <ShoppingCart
              className="h-12 w-12 text-blue-500 animate-bounce"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
          BoraMercado
        </h1>
        <p className="text-gray-600 text-sm">Carregando sua lista...</p>
        <div className="flex space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
