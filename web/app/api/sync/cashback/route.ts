import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

type CashbackItem = {
    bank: string;
    category: string;
    amount: number;
};

export async function POST(req: Request) {
    let items: CashbackItem[];

    try {
        items = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    if (!Array.isArray(items)) {
        return NextResponse.json(
            { error: "Expected array" },
            { status: 400 }
        );
    }

    try {
        await sql`TRUNCATE TABLE cashback`;

        for (const item of items) {
            await sql`
            INSERT INTO cashback (
              bank,
              category,
              amount
            ) VALUES (
              ${item.bank},
              ${item.category},
              ${item.amount}
            )
          `;
        }

        return NextResponse.json({
            status: "ok",
            inserted: items.length
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}
