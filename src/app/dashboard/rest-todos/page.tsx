import { TodosGrid } from "@/app/todos";
import prisma from "@/lib/prisma";

export const metadata = {
    title: 'Listado de Todos',
    description: 'SEO Title',
};

export default async function RestTodosPage() {
    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

    // useEffect(() => {
    //     fetch('/api/todos')
    //         .then(resp => resp.json())
    //         .then(console.log);
    // }, [])

    return (
        <div>

            <TodosGrid todos={todos} />
        </div>
    )
}
