// In your route.ts file
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
    const users = await prisma.user.findMany({
        include: {
            posts: {
                include: {
                    author: true,
                },
            },
        },
    });

    return new NextResponse(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
    });
}
