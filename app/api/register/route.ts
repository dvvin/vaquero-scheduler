import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, fullName, studentID, password, classification } = body;

        // Validation checks
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
        const existingEmail = await prisma.studentInfo.findUnique({
            where: {
                email: email
            }
        });

        if (existingEmail) {
            return new NextResponse(JSON.stringify({
                error: 'Email already exists'
            }), { status: 400 });
        }

        // Check if studentID exists
        const existingStudentID = await prisma.studentInfo.findUnique({
            where: {
                studentID: studentID
            }
        });

        if (existingStudentID) {
            return new NextResponse(JSON.stringify({
                error: 'Student ID already exists'
            }), { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.studentInfo.create({
            data: {
                email: email,
                fullName: fullName,
                studentID: studentID,
                password: hashedPassword,
                classification: classification // Save classification
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            message: 'User created successfully'
        },
            { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: 'Something went wrong'
        },
            { status: 500 });
    }
}
