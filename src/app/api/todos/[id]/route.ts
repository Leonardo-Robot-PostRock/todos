import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = params;

    const todoById = await prisma.todo.findUnique({
        where: {
            id
        }
    })

    if (!todoById) {
        return NextResponse.json({ message: 'Todo no encontrado' }, { status: 400 });
    }

    if (todoById) {
        return NextResponse.json(todoById);
    }
}