"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetchWithToken } from '@/service/fetch'

interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    email: number;
    image: string;
    role: string;
    store: {
        slug: string;
    }
}

interface ApiResponse {
    data: User[]
}

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { data: session, status }: { data: any, status: string } = useSession();
    const token = session?.user?.token;

    let { data } = useSWR(['http://localhost:3000/api/users/current', token], ([url, token]) => fetchWithToken(url, token, "GET"));
    const user: User = data?.data;

    const handleLogout = () => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        });
    }


    return (
        <div>
            <nav className="bg-white px-[4%] border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md  py-[.5rem] md:py-[.7rem]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
                    <div className="font-bold sm:text-lg lg:text-xl">Blog<span className='text-blue-500'>Post</span></div>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="flex gap-[4rem]">
                        <Link href={'/'}>Home</Link>
                        <Link href={'/product'}>Product</Link>
                    </div>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-red-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                            {status === 'authenticated' && user?.role === 'customer' ? (
                                <Link href={'/store/create'}>
                                    <div className="">Start Selling</div>
                                </Link>
                            ) : null}

                            {status === 'authenticated' && user?.role === 'author' ? (
                                <Link href={`/store/${user?.store?.slug}`}>
                                    <div className="">My Store</div>
                                </Link>
                            ) : null}


                            {status === 'authenticated' ? (
                                <>
                                    <Link href={"/profile"} className='flex gap-[1rem]'>
                                        <div className="flex items-center gap-4 bg-white shadow-lg px-[1.5rem] py-[.2rem] rounded-[50px]">
                                            <img className="w-8 h-8 rounded-full" src={`http://localhost:3000/user-image/${user?.image}`} alt="" />
                                            <div className="font-medium">
                                                <div className='text-[15px]'>{user?.name}</div>
                                                <div className="text-[14px] text-gray-500 dark:text-gray-400">{user?.role}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ) : null}

                            {status === 'authenticated' && session.user.role == 'admin' ? (
                                <>
                                    <Link href={'/dashboard'}>
                                        <p className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md text-sm `} >Dashboard</p>
                                    </Link>
                                    <p onClick={handleLogout} className={`cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md text-sm `}>Logout</p>
                                </>
                            ) : null}

                            {status === 'unauthenticated' ? (
                                <p className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md text-sm `} onClick={() => signIn()}>Login</p>
                            ) : null}

                        </ul>
                    </div>
                </div>
            </nav>

        </div>

    )
}

export default Navbar