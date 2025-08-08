"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Calendar,
  MoreVertical,
  Edit3,
  Trash2,
  Search,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import ListNameModal from "@/components/ui/list-name-modal";
import DeleteConfirmationModal from "@/components/ui/delete-confirmation-modal";
import { ShoppingList } from "@/types";
import {
  fetchShoppingLists,
  createShoppingList,
  deleteShoppingList as apiDeleteShoppingList
} from "@/services/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [openLists, setOpenLists] = useState<ShoppingList[]>([]);
  const [completedLists, setCompletedLists] = useState<ShoppingList[]>([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<ShoppingList | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        await loadPreviousLists();
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    if (activeMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenu]);

  const loadPreviousLists = async () => {
    const lists = await fetchShoppingLists();
    const open = lists.filter((list) => list.isActive);
    const completed = lists.filter((list) => !list.isActive);
    setOpenLists(open);
    setCompletedLists(completed);
  };

  const startNewList = () => {
    setShowNameModal(true);
  };

  const handleSaveListName = async (name: string) => {
    try {
      setShowNameModal(false);
      const { id } = await createShoppingList({
        name,
        items: [],
        startDate: new Date(),
        endDate: undefined,
        totalValue: 0,
        isActive: true
      } as unknown as Omit<ShoppingList, "id">);
      router.push(`/lista?id=${id}`);
    } catch (e) {
      alert("Falha ao criar lista. Tente novamente.");
    }
  };

  const continueList = (listId: string) => {
    router.push(`/lista?id=${listId}`);
  };

  const editList = (listId: string) => {
    router.push(`/lista?id=${listId}`);
  };

  const deleteList = (list: ShoppingList) => {
    setListToDelete(list);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDeleteList = async () => {
    if (listToDelete) {
      try {
        await apiDeleteShoppingList(listToDelete.id);
        if (listToDelete.isActive) {
          setOpenLists((prev) => prev.filter((l) => l.id !== listToDelete.id));
        } else {
          setCompletedLists((prev) =>
            prev.filter((l) => l.id !== listToDelete.id)
          );
        }
        alert(`Lista "${listToDelete.name}" excluída com sucesso!`);
      } catch (e) {
        alert("Falha ao excluir a lista. Tente novamente.");
      } finally {
        setListToDelete(null);
        setShowDeleteModal(false);
      }
    }
  };

  const toggleMenu = (listId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenu(activeMenu === listId ? null : listId);
  };

  // Filtrar listas com base na busca
  const filterLists = (lists: ShoppingList[]) => {
    if (!searchQuery.trim()) return lists;

    const query = searchQuery.toLowerCase();
    return lists.filter(
      (list) =>
        list.name.toLowerCase().includes(query) ||
        format(list.startDate, "dd 'de' MMMM", { locale: ptBR })
          .toLowerCase()
          .includes(query)
    );
  };

  const filteredOpenLists = filterLists(openLists);
  const filteredCompletedLists = filterLists(completedLists);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-6 rounded-full shadow-lg inline-block mb-4">
            <ShoppingCart
              className="h-16 w-16 text-blue-500"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">BoraMercado</h1>
          <p className="text-gray-600">Sua lista de compras inteligente</p>
        </div>

        {/* Barra de busca */}
        <div className="mb-6">
          {showSearch ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 flex items-center space-x-3 hover:shadow-md transition-shadow"
            >
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500">Buscar listas...</span>
            </button>
          )}
        </div>

        {/* Botão principal */}
        <div className="mb-12">
          <button
            onClick={startNewList}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center space-x-3">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-lg">Iniciar Lista de Compras</span>
            </div>
          </button>
        </div>

        {/* Listas abertas (não finalizadas) */}
        {filteredOpenLists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Listas Abertas
            </h2>
            <div className="space-y-3">
              {filteredOpenLists.map((list) => (
                <div
                  key={list.id}
                  className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-400 hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                      onClick={() => continueList(list.id)}
                    >
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <ShoppingCart className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{list.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Não finalizada
                          </span>
                          <p className="text-sm text-gray-500">
                            {format(list.startDate, "dd 'de' MMMM", {
                              locale: ptBR
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-orange-600 font-semibold">
                          R$ {list.totalValue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => toggleMenu(list.id, e)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                      {activeMenu === list.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              editList(list.id);
                              setActiveMenu(null);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => deleteList(list)}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Excluir</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compras anteriores (finalizadas) */}
        {filteredCompletedLists.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Compras Anteriores
            </h2>
            <div className="space-y-3">
              {filteredCompletedLists.map((list) => (
                <div
                  key={list.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                      onClick={() => editList(list.id)}
                    >
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{list.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Finalizada
                          </span>
                          <p className="text-sm text-gray-500">
                            {format(list.startDate, "dd 'de' MMMM", {
                              locale: ptBR
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-green-600 font-semibold">
                          R$ {list.totalValue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => toggleMenu(list.id, e)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                      {activeMenu === list.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              editList(list.id);
                              setActiveMenu(null);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => deleteList(list)}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Excluir</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {searchQuery &&
          filteredOpenLists.length === 0 &&
          filteredCompletedLists.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white p-6 rounded-full shadow-lg inline-block mb-4 opacity-50">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500">Nenhuma lista encontrada</p>
              <p className="text-sm text-gray-400 mt-1">
                Tente buscar por outro nome ou data
              </p>
            </div>
          )}

        {/* Mensagem quando não há listas */}
        {!searchQuery &&
          filteredOpenLists.length === 0 &&
          filteredCompletedLists.length === 0 &&
          openLists.length === 0 &&
          completedLists.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white p-6 rounded-full shadow-lg inline-block mb-4 opacity-50">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500">Nenhuma lista criada</p>
              <p className="text-sm text-gray-400 mt-1">
                Suas listas aparecerão aqui
              </p>
            </div>
          )}
      </div>

      <ListNameModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSave={handleSaveListName}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setListToDelete(null);
        }}
        onConfirm={confirmDeleteList}
        listName={listToDelete?.name || ""}
        isCompleted={!listToDelete?.isActive}
      />
    </div>
  );
}
