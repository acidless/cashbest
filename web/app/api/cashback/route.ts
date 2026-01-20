import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import {Cashback} from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
    let items: Cashback[];

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
              amount,
              expires
            ) VALUES (
              ${item.bank},
              ${item.category},
              ${item.amount},
              ${item.expires}
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

export async function GET() {
    const rows = await sql`
        SELECT
            category,
            json_agg(
                    json_build_object(
                            'category', category,
                            'bank', bank,
                            'amount', amount,
                            'expires', expires
                    )
                        ORDER BY amount DESC
            ) AS cashback
        FROM cashback
        GROUP BY category
        ORDER BY MAX(amount) DESC
    `;

    return NextResponse.json(rows);
}
