'use client';

import { signIn, signOut, useSession } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { IoShieldOutline } from "react-icons/io5";
import { LiaUserNinjaSolid } from "react-icons/lia";


export const LogoutButton = () => {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShieldOutline />
                <span className="group-hover:text-gray-700">Espere...</span>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <button
                onClick={() => signIn()}
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <LiaUserNinjaSolid />
                <span className="group-hover:text-gray-700">Logout</span>
            </button>
        )
    }

    return (
        <button onClick={() => signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    )
}
