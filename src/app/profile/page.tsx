'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '@/service/fetch';


const ProfilePage = () => {

    const { data: session, status }: { data: any, status: string } = useSession();
    const token = session?.user?.token;
    const router = useRouter();

    let { data: user } = useSWR(['http://localhost:3000/api/users/current', token], ([url, token]) => fetchWithToken(url, token, "GET"));
    // console.log(session)

    const handleLogout = () => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        });
    }


    return (
        <div className='mb:mx-[10%] md:mx-[15%] lg:mx-[20%] xl:mx-[30%] 2xl:mx-[35%] min-h-[100vh]'>
            <Link href={'/'}>
                <button className='my-[2rem] mb:text-sm  bg-blue-500 py-2 px-4 rounded-lg flex items-center gap-[.5rem] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-arrow-left-circle mb:w-[1.5rem] mb:h-[1.5rem] " viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                    <span>Back</span>
                </button>
            </Link>
            {user ? (
                <div className="text-center shadow-md rounded-md mb:p-[2rem] text-gray-500 mt-[5rem]  dark:text-gray-400">
                    <div className="relative w-[8rem] h-[8rem] mx-auto mb-[1rem]">
                        <Link href={'/profile/edit'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-pencil-square absolute bottom-0 right-[1rem] bg-blue-500" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </Link>
                        <img className="mx-auto mb-4 w-[8rem] h-[8rem] rounded-full" src={`http://localhost:3000/user-image/${user.data.image}`} alt="Bonnie Avatar" />
                    </div>
                    <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <a href="#">{user.data.name}</a>
                    </h3>
                    <p>{session?.user?.role}</p>
                    <ul className="mt-[2rem] flex flex-col text-slate-950">
                        <li onClick={handleLogout} className="hover:bg-red-500 text-left p-[.5rem] flex gap-[1rem] items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}

export default ProfilePage