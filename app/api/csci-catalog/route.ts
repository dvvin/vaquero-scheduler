// In your route.ts file
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const courses = await prisma.course.findMany({
        include: {
            professors: {
                include: {
                    courses: true,
                },
            },
        },
    });

    return new NextResponse(JSON.stringify(courses), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
    });
}
