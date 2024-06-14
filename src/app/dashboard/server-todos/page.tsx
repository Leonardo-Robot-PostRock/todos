import { TodosGrid } from "@/app/todos";
import { NewTodo } from "@/app/todos/components/NewTodo";
import prisma from "@/lib/prisma";

export const metadata = {
    title: 'Listado de Todos',
    description: 'SEO Title',
};

export default async function ServerTodosPage() {
    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

    return (
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    )
}