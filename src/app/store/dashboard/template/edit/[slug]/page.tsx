"use client"
import { fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

interface Category {
    id: number;
    name: string;
    slug: string;
}

const UpdateTemplatePage = (props: { params: { slug: string } }) => {

    const [templateData, setTemplateData] = useState({ name: "", category_id: "", price: "", feature: "", tech_stack: "", description: "" });
    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data: any = {
            slug : props.params.slug,
            ...templateData
        };

        fetch('http://localhost:3000/api/templates', {
            method: "PATCH",
            headers: { Authorization: token, "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }).then(async res => {
            const response = await res.json();
            if (res.status === 200) {
                router.push('/store/dashboard/template');
            } else {
                console.log(response.errors)
            }
        })
    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTemplateData({
            ...templateData,
            [name]: value,
        });
    };

    const { data: categories } = useSWR(`http://localhost:3000/api/categories`, (url) => fetcher(url, "GET"));

    const { data: template } = useSWR(`http://localhost:3000/api/templates/${props.params.slug}`, (url) => fetcher(url, "GET"));

    useEffect(() => {
        if (template && template.data) {
            setTemplateData({
                name: template.data.name,
                category_id: template.data.category_id,
                price: template.data.price,
                description: template.data.description,
                feature: template.data.feature,
                tech_stack: template.data.tech_stack
            });
        }
    }, [template]);


    return (
        <div className=' min-h-[100vh] mt-[-.5rem]'>
            <section className="bg-gray-50 dark:bg-gray-900 p-[2rem]">
                <h1 className='text-3xl font-bold mb-[2rem]'>Edit Template</h1>

                <form onSubmit={(e) => handleSubmit(e)} >

                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Name</label>
                        <input value={templateData.name} onChange={handleInputChange} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label htmlFor="countries" className="block mt-[1rem] mb-[.3rem] text-base font-semibold text-gray-900 dark:text-white">Category</label>
                    <select name="category_id" id="category" value={templateData.category_id} onChange={(e) => setTemplateData({ ...templateData, category_id: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {categories?.data.map((category: Category) => (
                            <option key={category.id} value={`${category.id}`}>{category.name}</option>
                        ))}
                    </select>

                    <label htmlFor="description" className="block mt-[1rem] mb-[.5rem] text-base font-semibold text-gray-900 dark:text-white">Description</label>
                    <textarea value={templateData.description} onChange={handleInputChange} id="description" rows={10} name='description' className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <div className="mb-5">
                        <label htmlFor="feature" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Feature</label>
                        <p className='text-orange-500 text-sm my-[.3rem]'>Separate with comma</p>
                        <input value={templateData.feature} onChange={handleInputChange} type="text" id="feature" name='feature' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="tech_stack" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Tech Stack</label>
                        <p className='text-orange-500 text-sm my-[.3rem]'>Separate with comma</p>
                        <input value={templateData.tech_stack} onChange={handleInputChange} type="text" id="tech_stack" name='tech_stack' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Price</label>
                        <input type="number" value={templateData.price} onChange={handleInputChange} id="price" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <button type="submit" className="text-white mt-[2rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </section>
        </div>
    )
}

export default UpdateTemplatePage