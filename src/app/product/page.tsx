"use client"
import { fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'
import useSWR from 'swr';

interface Template {
    id: number;
    name: string;
    slug: string;
    price: number;
    folder_name: string;
    created_at: string;
    category: {
        name: string;
        slug: string
    },
    store: {
        name: string;
        slug: string
    },
}

const ProductPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session }: { data: any } = useSession();
    const token: any = session?.user?.token;

    let { data } = useSWR(['http://localhost:3000/api/templates', 'GET'], ([url, method]) => fetcher(url, method));
    const templates = data?.data;
    // console.log(templates)

    return (
        <div className='py-[2rem] px-[10%]'>
            <h1 className='text-2xl font-bold'>Product</h1>

            <div className="my-[2rem]">
                <div className=' mb-[2rem]'>
                    <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" autoFocus id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by title, category and content" />
                            <button hidden type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-wrap gap-[1rem] justify-center ">
                    {templates ? templates.map((template: Template) => (
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={`http://localhost:3000/uploads/${template.id}/thumbnail.jpg`} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-[.3rem] text-xl font-bold tracking-tight text-gray-900 dark:text-white">{template.name}</h5>
                                </a>
                                <p className='text-sm'>by <b>{template.store.name}</b> in <b>{template.category.name}</b></p>
                                <p className='py-[1rem] text-xl font-semibold'>${template.price}</p>

                                <div className="flex justify-between">
                                    <p className='text-sm'>10 Sales</p>
                                    <div className="flex gap-[1rem]">
                                        <div className="p-[.5rem] border-slate-900 border-[1px] cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                            </svg>
                                        </div>
                                        <Link target='_blank' href={`http://localhost:3000/uploads/${template.id}/${template.folder_name}/index.html`}>
                                            <div className="p-[.5rem] border-slate-900 border-[1px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        </div>
    )
}

export default ProductPage