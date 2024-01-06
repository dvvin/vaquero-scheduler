import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { campus, time, difficultyRating, teachingStyle, studentInfo } = body;

    // Attempt to find the student in the database
    const student = await prisma.studentInfo.findUnique({
        where: {
            studentID: studentInfo.studentID
        }
    });

    // If student does not exist, return an error response
    if (!student) {
        return new NextResponse(JSON.stringify({
            error: 'Student not found'
        }), { status: 404 });
    }

    // If student exists, create the GenerateSchedule entry
    const generatedSchedule = await prisma.generateSchedule.create({
        data: {
            campus,
            time,
            difficultyRating,
            teachingStyle,
            studentInfoId: student.id // Link with the existing student
        }
    });

    return new NextResponse(JSON.stringify({
        generatedSchedule
    }), { status: 200 });
}
