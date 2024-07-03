'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, complete: boolean) => {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw `Todo con id ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    })

    revalidatePath('/dashboard/server-todos');

    return updatedTodo;
}

export const addTodo = async (description: string) => {
    try {
        const todo = await prisma.todo.create({ data: { description } });
        revalidatePath('/dashboard/server-todos');
        return todo;

    } catch {
        message: 'Error creando todo'
    }
}