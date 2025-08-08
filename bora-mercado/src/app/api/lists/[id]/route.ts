import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ShoppingListModel from "@/models/ShoppingList";

// GET - Buscar lista específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    type Doc = {
      _id: { toString: () => string };
      name: string;
      startDate?: Date;
      endDate?: Date | null;
      items?: unknown[];
      totalValue?: number;
      isActive?: boolean;
    } | null;
    const doc = (await ShoppingListModel.findById(id).lean()) as Doc;
    if (!doc) {
      return NextResponse.json(
        { error: "Lista não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: doc._id.toString(),
      name: doc.name,
      startDate: doc.startDate,
      endDate: doc.endDate ?? null,
      items: doc.items ?? [],
      totalValue: doc.totalValue ?? 0,
      isActive: doc.isActive ?? true
    });
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar lista
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, items, endDate, totalValue, isActive } = body;
    await connectToDatabase();
    await ShoppingListModel.findByIdAndUpdate(id, {
      ...(name !== undefined ? { name } : {}),
      ...(items !== undefined ? { items } : {}),
      ...(endDate !== undefined
        ? { endDate: endDate ? new Date(endDate) : null }
        : {}),
      ...(totalValue !== undefined ? { totalValue } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
      updatedAt: new Date()
    });

    return NextResponse.json({ message: "Lista atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar lista
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    await ShoppingListModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Lista deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
