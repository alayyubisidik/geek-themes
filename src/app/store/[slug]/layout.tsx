"use client"
import { fetchWithToken, fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import useSWR from 'swr';

interface Store {
    id: number;
    name: string;
    slug: string;
    description: string;
    contact: number;
    logo: string;
    banner: string;
    created_at: string;
    user: {
        name: string;
        image: string;
    }
}


const StoreLayout = ({ children, params }: { children: React.ReactNode, params: { slug: string } }) => {

    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;

    let { data } = useSWR([`http://localhost:3000/api/stores/${params.slug}`, "GET"], ([url, method]) => fetcher(url, method));
    const store: Store = data?.data;

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'long' };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        return formatter.format(date);
    };

    return (
        <div>
            <div className="w-full bg-gray-300 py-[1rem] px-[15%] flex justify-between mt-[3rem]">
                {store ? (
                    <>
                        <div className="flex gap-[1rem]">
                            <img className="w-[5rem] h-[5rem]" src={`http://localhost:3000/store-logo/${store?.logo}`} alt="" />
                            <div className="">
                                <p>{store.name}</p>
                                <p>{store.user.name}'s Store</p>
                                <p>Member since {formatDate(store.created_at)}</p>
                                {store ? (
                                    <>
                                        {store.user.name == session?.user?.name ? (
                                            <Link href={'/store/dashboard'}>
                                                <button className='py-1 px-2 bg-blue-500 text-white text-sm rounded-md'>Dashboard</button>
                                            </Link>
                                        ) : null}
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className="">
                            <div className="">Rating</div>
                            <div className="">Sales</div>
                        </div>
                    </>
                ) : null}
            </div>
            <ul className=' flex gap-[2rem] items-center w-full pl-[15%]'>
                <Link href={`/store/${params.slug}`}>
                    <li>Profile</li>
                </Link>
                <Link href={`/store/${params.slug}/product`}>
                    <li>Product</li>
                </Link>
                <Link href={`/store/${params.slug}/review`}>
                    <li>Review</li>
                </Link>

            </ul>
            {children}
        </div>
    )
}

export default StoreLayout