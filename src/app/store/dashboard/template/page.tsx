"use client"
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetchWithToken } from '@/service/fetch';
import { useSession } from 'next-auth/react';

interface Template {
    id: number;
    name: string;
    slug: string;
    price: number;
    description: string;
    feature: string;
    tech_stack: string;
    created_at: string;
    folder_name: string;
    category: {
        name: string;
    }
}

const TemplateDashboardPage = () => {

    const { data: session, status }: { data: any, status: string } = useSession();
    const token = session?.user?.token;

    let { data } = useSWR(['http://localhost:3000/api/templates-dashboard', token], ([url, token]) => fetchWithToken(url, token, "GET"));
    const templates = data?.data;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        return formatter.format(date);
    };

    return (
        <div className=' min-h-[100vh] mt-[-.5rem]'>
            <section className="bg-gray-50 dark:bg-gray-900 p-[2rem]">
                <h1 className='text-3xl font-bold '>Template</h1>

                <Link href={'/store/dashboard/template/create'}>
                    <button className='py-2 px-3 text-sm my-[1.5rem] bg-blue-500 text-white rounded-md'>Create a New Template</button>
                </Link>

                <div className="mx-auto  ">
                    {/* <!-- Start coding here --> */}
                    <div className=" relative shadow-md sm:rounded-lg ">
                        <div className="flex border-b-1 bg-gray-200 flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <h5 className='text-lg font-bold'>{templates ? templates.length : null} Templates</h5>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-center">No</th>
                                        <th scope="col" className="px-4 py-3 text-center">Thumbnail</th>
                                        <th scope="col" className="px-4 py-3 text-center">Name</th>
                                        <th scope="col" className="px-4 py-3 text-center">Category</th>
                                        <th scope="col" className="px-4 py-3 text-center">Feature</th>
                                        <th scope="col" className="px-4 py-3 text-center">Tech Stack</th>
                                        <th scope="col" className="px-4 py-3 text-center">Price</th>
                                        <th scope="col" className="px-4 py-3 text-center">Created At</th>
                                        <th scope="col" className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {templates ? templates.map((template: Template, index: number) => (
                                        <tr key={template.id} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3 text-center">{index + 1}</td>
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-[1rem] dark:text-white">
                                                <div className="h-[5em] w-[5rem] bg-blue-500">
                                                    <img className='w-[100%] h-full' src={`http://localhost:3000/uploads/${template.id}/thumbnail.jpg`} alt="" />
                                                </div>
                                            </th>
                                            <td className="px-4 py-3 text-center">{template.name}</td>
                                            <td className="px-4 py-3 text-center">{template.category.name}</td>
                                            <td className="px-4 py-3 text-center">{template.feature}</td>
                                            <td className="px-4 py-3 text-center">{template.tech_stack}</td>
                                            <td className="px-4 py-3 text-center">{template.price}</td>
                                            <td className="px-4 py-3 text-center">{formatDate(template.created_at)}</td>
                                            <td className="px-4 py-3 flex items-center justify-center gap-[1rem] ">
                                                {/* <div className="bg-red-500 p-[.5rem] rounded-md cursor-pointer" onClick={() => handleRemove(template.slug)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg>
                                                </div> */}
                                                <Link target='_blank' href={`http://localhost:3000/uploads/${template.id}/${template.folder_name}/index.html`}>
                                                    <div className="bg-blue-500 p-[.5rem] rounded-md cursor-pointer"  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                                <Link href={`/store/dashboard/template/edit/${template.slug}`}>
                                                    <div className="bg-sky-400 p-[.5rem] rounded-md cursor-pointer"  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil-square bg-sky-500" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </div>

                                                </Link>
                                            </td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default TemplateDashboardPage