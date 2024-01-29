"use client"
import { fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr';

interface Category{
    id : number;
    name : string;
    slug : string;
}

const CreateTemplatePage = () => {
    const [templateFile, setTemplateFile] = useState();
    const [thumbnailFile, setThumbnailFile] = useState();
    const [previewImg, setPreviewImg] = useState();
    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target?.files?.[0];
        setThumbnailFile(file);
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTemplateFile = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file : any = e.target?.files?.[0]
        setTemplateFile(file);
    }   
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', e.currentTarget.name.value);
        data.append('category_id', e.currentTarget.category_id.value);
        data.append('price', e.currentTarget.price.value);
        data.append('description', e.currentTarget.description.value);
        data.append('feature', e.currentTarget.feature.value);
        data.append('tech_stack', e.currentTarget.tech_stack.value);
        if (thumbnailFile) {
            data.append('thumbnail_file', thumbnailFile);
        }
        if (templateFile) {
            data.append('template_file', templateFile);
        }

        fetch('http://localhost:3000/api/templates', {
            method: "POST",
            headers: { Authorization: token },
            body: data
        }).then(async res => {
            if (res.status === 200) {
                router.push('/store/dashboard/template');
            }
        })
    }

    const { data: categories, error } = useSWR(`http://localhost:3000/api/categories`, (url) => fetcher(url, "GET"));

    return (
        <div className=' min-h-[100vh] mt-[-.5rem]'>
            <section className="bg-gray-50 dark:bg-gray-900 p-[2rem]">
                <h1 className='text-3xl font-bold mb-[2rem]'>Create Template</h1>

                <form onSubmit={(e) => handleSubmit(e)} >

                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label htmlFor="countries" className="block mt-[1rem] mb-[.5rem] text-base font-semibold text-gray-900 dark:text-white">Category</label>
                    <select name="category_id" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {categories?.data.map((category : Category) => (
                            <option key={category.id} value={`${category.id}`}>{category.name}</option>
                        ))}
                    </select> 

                    <label htmlFor="description" className="block mt-[1rem] mb-[.5rem] text-base font-semibold text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" rows={10} name='description' className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <div className="mb-5">
                        <label htmlFor="feature" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Feature</label>
                        <p className='text-orange-500 text-sm my-[.3rem]'>Separate with comma</p>
                        <input type="text" id="feature" name='feature' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="tech_stack" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Tech Stack</label>
                        <p className='text-orange-500 text-sm my-[.3rem]'>Separate with comma</p>
                        <input type="text" id="tech_stack" name='tech_stack' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Price</label>
                        <input type="number" id="price" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label className='block mt-[1rem] mb-[.5rem] text-base font-semibold' htmlFor="thumbnail">Thumbnail</label>
                    <input type="file" name='thumbnail' id='thumbnail' onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />
                    <img className="w-[20rem] my-[1rem] " src={previewImg} alt="" />

                    <label className='block mt-[1rem] mb-[.5rem] text-base font-semibold' htmlFor="template">Template</label>
                    <p className='text-orange-500 text-sm my-[.3rem]'>Must be zip file format</p>
                    <input type="file" name='template' id='template' onChange={handleTemplateFile} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />

                    <button type="submit" className="text-white mt-[2rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </section>
        </div>
    )
}

export default CreateTemplatePage