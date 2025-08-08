import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Buscar todas as listas
export async function GET() {
  try {
    const listsRef = collection(db, "shoppingLists");
    const q = query(listsRef, orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);

    const lists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate(),
      endDate: doc.data().endDate?.toDate()
    }));

    return NextResponse.json(lists);
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
    const body = await request.json();
    const { name, items, startDate, endDate, totalValue, isActive } = body;

    const docRef = await addDoc(collection(db, "shoppingLists"), {
      name,
      items,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      totalValue,
      isActive,
      createdAt: new Date()
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lista:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
