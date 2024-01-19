import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: Request, response: NextResponse) {
    const schedule = await prisma.generateSchedule.findMany({
        include: {
            StudentInfo: true
        }
    });

    return new NextResponse(JSON.stringify(schedule), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
    });
}

