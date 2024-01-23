import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const body = await request.json();
    const { scheduleId, studentID } = body;

    const deletedSchedule = await prisma.generateSchedule.deleteMany({
        where: {
            id: scheduleId,
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

