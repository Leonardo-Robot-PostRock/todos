'use client';

import { useEffect } from "react";
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
    useEffect(() => {
        console.log('Client Side');
    }, [])

    const { data: session } = useSession();



    return (
        <div>
            <h1>Profile Page</h1>

            <div className="flex flex-col">
                <span>{session?.user?.name ?? 'No name'}</span>
                <span>{session?.user?.email ?? 'No Email'}</span>
                <span>{session?.user?.image ?? 'No Image'}</span>
            </div>
        </div>
    );
}