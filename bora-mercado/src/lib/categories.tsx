import {
  Wine,
  Candy,
  ChefHat,
  Wheat,
  Croissant,
  Milk,
  Beef,
  Apple,
  Heart,
  Sparkles,
  Plus,
  LucideIcon
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const categories: Category[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    icon: Wine,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    id: "doces-snacks",
    name: "Doces e Snacks",
    icon: Candy,
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    id: "temperos-molhos",
    name: "Temperos, Molhos e Condimentos",
    icon: ChefHat,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    id: "graos-cereais",
    name: "Grãos, Cereais e Farinhas",
    icon: Wheat,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    id: "padaria-massas",
    name: "Padaria e Massas",
    icon: Croissant,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  },
  {
    id: "laticinios-ovos",
    name: "Laticínios e Ovos",
    icon: Milk,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: "carnes-aves-peixes",
    name: "Carnes, Aves e Peixes",
    icon: Beef,
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    id: "hortifruti",
    name: "Hortifruti",
    icon: Apple,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: "pets",
    name: "Pets",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-100"
  },
  {
    id: "limpeza",
    name: "Limpeza Doméstica",
    icon: Sparkles,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100"
  },
  {
    id: "outros",
    name: "Outros",
    icon: Plus,
    color: "text-gray-600",
    bgColor: "bg-gray-100"
  }
];

export const getCategoryById = (id: string): Category => {
  return (
    categories.find((cat) => cat.id === id) || categories[categories.length - 1]
  );
};

export const getCategoryByName = (name: string): Category => {
  return (
    categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase()) ||
    categories[categories.length - 1]
  );
};
