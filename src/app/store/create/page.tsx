"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateStorePage = () => {

    const { data: session, status }: { data: any, status: string } = useSession();
    const token = session?.user?.token;
    const [logoFile, setLogoFile] = useState();
    const [previewLogo, setPreviewLogo] = useState();
    const [bannerFile, setBannerFile] = useState();
    const [previewBanner, setPreviewBanner] = useState();
    const router = useRouter();

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target?.files?.[0];
        setLogoFile(file);
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target?.files?.[0];
        setBannerFile(file);
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setPreviewBanner(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', e.target.name.value);
        data.append('description', e.target.description.value);
        data.append('contact', e.target.contact.value);

        if (logoFile) {
            data.append('logo', logoFile);
        }

        if (bannerFile) {
            data.append('banner', bannerFile);
        }

        try {
            const res = await fetch('http://localhost:3000/api/store', {
                method : "POST",
                body : data,
                headers : {
                    Authorization : token
                }
            });

            if (res.ok) {
                e.target.reset();
                router.push('/');
            } else if (res.status === 400) {
                const responseBody = await res.json();
                console.log(responseBody.body.errors)
            }
        } catch (error) {

        }
    }

    return (
        <div className='mb:mx-[10%] md:mx-[15%] lg:mx-[25%] xl:mx-[30%] 2xl:mx-[35%] min-h-[100vh] mb-[5rem]'>
            <div className=" shadow-md rounded-md mb:p-[2rem] mt-[3rem]  ">
                <h1 className='text-3xl font-semibold mb-[2rem]'>Create Store</h1>

                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label htmlFor="description" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" rows={15} name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <div className="mb-5">
                        <label htmlFor="contact" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Contact</label>
                        <input type="text" id="contact" name='contact' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label className='block mt-[1rem] mb-[.3rem] text-base font-semibold' htmlFor="logo">Logo</label>
                    <input type="file" name='logo' id='logo' onChange={handleLogoChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />
                    <img className="w-[20rem] my-[1rem] " src={previewLogo} alt="" />

                    <label className='block mt-[1rem] mb-[.3rem] text-base font-semibold' htmlFor="banner">Banner</label>
                    <input type="file" name='banner' id='banner' onChange={handleBannerChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />
                    <img className="w-[20rem] my-[1rem] " src={previewBanner} alt="" />



                    <button type="submit" className="text-white mt-[2rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStorePage