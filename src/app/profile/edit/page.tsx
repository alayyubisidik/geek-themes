"use client"
import { fetchWithToken } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


const Edit = () => {

    const { data: session, status }: { data: any, status: string } = useSession();
    const token = session?.user?.token;
    const [fileImg, setFileImg] = useState();
    const [previewImg, setPreviewImg] = useState();
    const router = useRouter();
    // console.log(fileImg)

    const { data: user } = useSWR(['http://localhost:3000/api/users/current', token], ([url, token]) => fetchWithToken(url, token, "GET"));

    const [data, setData] = useState({
        name: "",
        email: "",
        image: "",
        password : ""
    });

    // console.log(user)


    useEffect(() => {
        if (user && user.data) {
            setData({
                name: user.data.name,
                email: user.data.email,
                password: user.data.password,
                image: user.data.image || "",
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target?.files?.[0];
        setFileImg(file);
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (fileImg) {
            formData.append('image', fileImg);
        }

        const request = {
            method: "PATCH",
            headers: { "Authorization": token },
            body: formData
        }

        fetch(`http://localhost:3000/api/users/update`, request)
            .then(async response => {
                let data = await response.json();
                console.log(data.errors)
                if (response.status === 200) {
                    // window.location.reload();
                    router.push('/profile')
                }
            })
    }


    return (
        <div className='mb:mx-[10%] md:mx-[15%] lg:mx-[25%] xl:mx-[30%] 2xl:mx-[35%] min-h-[100vh] mb-[5rem]'>
            <Link href={'/profile'}>
                <button className='my-[2rem] mb:text-sm  bg-blue-500 py-2 px-4 rounded-lg flex items-center gap-[.5rem] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="white" className="bi bi-arrow-left-circle mb:w-[1.5rem] mb:h-[1.5rem] " viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                    <span>Back</span>
                </button>
            </Link>
            <div className="text-center shadow-md rounded-md mb:p-[2rem] mb:pb-[3rem] text-gray-500 mt-[5rem] mb-[5rem] dark:text-gray-400">
                <div className="mb:mx-[10%]">
                    <form className="max-w-sm mx-auto ">
                        <div className=" w-[8rem] h-[8rem] mb-[3rem] mx-auto relative">
                            <img className="rounded-full w-full h-full" src={previewImg || `http://localhost:3000/user-image/${data.image}`} />
                            <button className='text-[12px]  bg-blue-500 text-white py-1 px-2 rounded-lg absolute right-0 bottom-[-1rem]'>Change Image</button>
                            <input className='h-[1.6rem] opacity-0 w-[6rem] rounded-lg absolute right-0 bottom-[-1rem]' type="file" name='image' onChange={handleImageChange} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Name</label>
                            <input value={data.name} onChange={handleInputChange} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Email</label>
                            <input value={data.email} onChange={handleInputChange} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Password</label>
                            <input value={data.password} onChange={handleInputChange} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Edit