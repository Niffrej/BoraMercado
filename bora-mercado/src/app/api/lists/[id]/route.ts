import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Buscar lista específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, "shoppingLists", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "Lista não encontrada" },
        { status: 404 }
      );
    }

    const data = docSnap.data();
    const list = {
      id: docSnap.id,
      ...data,
      startDate: data.startDate?.toDate(),
      endDate: data.endDate?.toDate()
    };

    return NextResponse.json(list);
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

    const docRef = doc(db, "shoppingLists", id);
    await updateDoc(docRef, {
      name,
      items,
      endDate: endDate ? new Date(endDate) : null,
      totalValue,
      isActive,
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
    const docRef = doc(db, "shoppingLists", id);
    await deleteDoc(docRef);

    return NextResponse.json({ message: "Lista deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
