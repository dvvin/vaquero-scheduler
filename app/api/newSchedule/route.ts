import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const body = await request.json();
    const { studentID } = body;

    const deletedSchedule = await prisma.generateSchedule.deleteMany({
        where: {
            StudentInfo: {
                studentID: studentID
            }
        }
    });

    return new NextResponse(JSON.stringify({
        message: 'Schedule deleted successfully',
        deletedSchedule
    }), { status: 200 });
}
