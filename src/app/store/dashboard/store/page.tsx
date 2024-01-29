"use client"
import { fetchWithToken } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';

interface Store {
    data: {
        id: number;
        user_id: number;
        name: string;
        slug: string;
        description: string;
        logo: string;
        banner: string;
        contact: number;
        created_at: string;
    }
}

const StoreDashboardPage = () => {

    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;

    let { data: store }: { data: Store } = useSWR(['http://localhost:3000/api/stores-dashboard', token], ([url, token]) => fetchWithToken(url, token, "GET"));

    return (
        <div className=' min-h-[100vh] mt-[-.5rem] pb-[5rem]'>
            <section className="bg-gray-50 dark:bg-gray-900 p-[2rem]">
                <h1 className='text-3xl font-bold mb-[2rem]'>Store</h1>

                {store ? (
                    <>
                        <div className="my-[1.5rem]">
                            <p className='text-sm text-gray-500 mb-[.2rem]'>Name</p>
                            <p className='text-2xl font-semibold'>{store.data.name}</p>
                        </div>

                        <div className="my-[1.5rem]">
                            <p className='text-sm text-gray-500 mb-[.2rem]'>Description</p>
                            <p className=' '>{store.data.description}</p>
                        </div>

                        <div className="my-[1.5rem]">
                            <p className='text-sm text-gray-500 mb-[.2rem]'>contact</p>
                            <p className=' '>{store.data.contact}</p>
                        </div>

                        <div className="my-[1.5rem] w-[15rem]">
                            <p className='text-sm text-gray-500 mb-[.5rem]'>Logo</p>
                            <img className='w-full' src={`http://localhost:3000/store-logo/${store.data.logo}`} alt="" />
                        </div>

                        <div className="my-[1.5rem] w-[25rem] overflow-hidden">
                            <p className='text-sm text-gray-500 mb-[.5rem]'>Banner</p>
                            <img className='w-full' src={`http://localhost:3000/store-banner/${store.data.banner}`} alt="" />
                        </div>

                        <Link href={`/store/dashboard/store/edit/${store.data.slug}`}>
                            <button className='py-2 px-3 text-sm my-[1rem] bg-blue-500 text-white rounded-md'>Edit Store</button>
                        </Link>

                        <button className='block py-2 px-3 text-sm  bg-red-500 text-white rounded-md'>Remove Store</button>
                    </>
                ) : null}

            </section>

        </div>
    )
}

export default StoreDashboardPage