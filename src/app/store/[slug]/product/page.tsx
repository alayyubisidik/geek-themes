"use client"
import { fetchWithToken, fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';

const ProductStorePage = (props: { params: { slug: string } }) => {

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

    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;

    let { data } = useSWR([`http://localhost:3000/api/templates/store/${props.params.slug}`, "GET"], ([url, method]) => fetcher(url, method));
    const templates = data?.data;

    return (
        <div>
            <div className="w-full bg-gray-300 py-[1rem] px-[15%]  mt-[3rem] pb-[5rem]">
                <p className='text-2xl font-semibold my-[1rem] mb-[2rem]'>Product</p>

                <div className="flex gap-[1.5rem]">
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

export default ProductStorePage