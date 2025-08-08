import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ShoppingListModel from "@/models/ShoppingList";

// GET - Buscar todas as listas
export async function GET() {
  try {
    await connectToDatabase();
    const lists = await ShoppingListModel.find({})
      .sort({ startDate: -1 })
      .lean();
    type Doc = {
      _id: { toString: () => string };
      name: string;
      startDate?: Date;
      endDate?: Date | null;
      items?: unknown[];
      totalValue?: number;
      isActive?: boolean;
    };
    const docs = lists as unknown as Doc[];
    const mapped = docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      startDate: doc.startDate,
      endDate: doc.endDate ?? null,
      items: doc.items ?? [],
      totalValue: doc.totalValue ?? 0,
      isActive: doc.isActive ?? true
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Erro ao buscar listas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova lista
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const {
      name,
      items = [],
      startDate,
      endDate,
      totalValue = 0,
      isActive = true
    } = body;

    const created = await ShoppingListModel.create({
      name,
      items,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      totalValue,
      isActive
    });
    return NextResponse.json({ id: created._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
