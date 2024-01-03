import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, password } = body;

        // Validation checks
        if (username.length < 3) {
            return new NextResponse(JSON.stringify({
                error: 'Username must be at least 3 characters'
            }), { status: 400 });
        }

        if (!email.includes('.') || email.split('.').pop().length < 2) {
            return new NextResponse(JSON.stringify({
                error: 'Invalid email format'
            }), { status: 400 });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*\-])(?=.*[0-9])(?=.*[a-z]).{6,}$/;

        if (password.length < 6) {
            return new NextResponse(JSON.stringify({
                error: 'Password must be at least 6 characters'
            }), { status: 400 });
        }

        else if (!passwordRegex.test(password)) {
            return new NextResponse(JSON.stringify({
                error: 'Password must contain at least one uppercase letter and one special character'
            }), { status: 400 });
        }

        // check if email exists
        const existingEmail = await prisma.login.findUnique({
            where: { email: email }
        });

        if (existingEmail) {
            return new NextResponse(JSON.stringify({
                error: 'Email already exists'
            }), { status: 400 });
        }

        // check if username exists
        const existingUsername = await prisma.login.findUnique({
            where: { username: username }
        });

        if (existingUsername) {
            return new NextResponse(JSON.stringify({
                error: 'Username already exists'
            }), { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.login.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            message: 'User created successfully'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 });
    }
}
