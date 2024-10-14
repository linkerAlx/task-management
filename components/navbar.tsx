'use client';
import { useStateContext } from '@/context/stateContext';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const { user, setUser } = useStateContext();
    const { push } = useRouter();

    if (user) {
        push("/")
    };

    const logoutUser = async () => {
        await axios.post("/api/user/logout");
        setUser(null);
    }
    return (
        <div className="flex px-10 py-5">
            <p className='capitalize underline underline-offset-8'>{!user ? "why don't you came in ?" : "modify this page as you wish, it's all yours"}</p>
            <div className='ml-auto flex gap-5'>
                {user ? (
                    <>
                        <button onClick={logoutUser} className="border-[1px] border-black px-4 py-2 rounded-lg">Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="bg-black text-white px-4 py-2 rounded-lg">Sign in</Link>
                        <Link href="/registration" className="border-[1px] border-black px-4 py-2 rounded-lg">Sign up</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;
