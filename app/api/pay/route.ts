import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tariff, amount, method } = body;

    if (!tariff || !amount || !method) {
      return NextResponse.json({ error: "Нет данных" }, { status: 400 });
    }

    // Временная ссылка для теста
    const fakePaymentUrl = "https://antelope.fake/pay/12345";

    return NextResponse.json({ url: fakePaymentUrl });
  } catch (err) {
    console.error("Ошибка API:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
