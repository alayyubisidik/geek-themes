"use client"
import { fetchWithToken, fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

interface Store {
    data : {
        id : number;
        user_id : number;
        name : string;
        slug : string;
        description : string;
        logo : string;
        banner : string;
        contact : number;
        created_at : string;
    }
}

const UpdateStoreDashboardPage = (props : {params : {slug : string}}) => {

    const [storeData, setStoreData] : any = useState({ name: "", description: "", logo: "", banner: "", contact: "" });
    const { data: session }: { data: any } = useSession();
    const token = session?.user?.token;
    const router = useRouter();
    const [logoFile, setLogoFile] = useState();
    const [previewLogo, setPreviewLogo] = useState();
    const [bannerFile, setBannerFile] = useState();
    const [previewBanner, setPreviewBanner] = useState();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('slug', props.params.slug)
        data.append('name', storeData.name);
        data.append('description', storeData.description);
        data.append('contact', storeData.contact);

        if (logoFile) {
            data.append('logo', logoFile);
        }

        if (bannerFile) {
            data.append('banner', bannerFile);
        }

        console.log(data)

        fetch('http://localhost:3000/api/stores', {
            method: "PATCH",
            headers: { Authorization: token },
            body: data
        }).then(async res => {
            const response = await res.json();
            if (res.status === 200) {
                router.push('/store/dashboard/store');
            } else {
                console.log(response.errors)
            }
        })
    }

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setStoreData({
            ...storeData,
            [name]: value,
        });
    };

    let { data : store } : {data : Store} = useSWR(['http://localhost:3000/api/stores-dashboard', token], ([url, token]) => fetchWithToken(url, token, "GET"));


    useEffect(() => {
        if (store && store.data) {
            setStoreData({
                name: store.data.name,
                description: store.data.description,
                logo: store.data.logo,
                banner: store.data.banner,
                contact: store.data.contact,
            });
        }
    }, [store]);


    return (
        <div className=' min-h-[100vh] mt-[-.5rem]'>
            <section className="bg-gray-50 dark:bg-gray-900 p-[2rem]">
                <h1 className='text-3xl font-bold mb-[2rem]'>Edit Store</h1>

                <form onSubmit={(e) => handleSubmit(e)} >

                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Name</label>
                        <input value={storeData.name} onChange={handleInputChange} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label htmlFor="description" className="block mt-[1rem] mb-[.5rem] text-base font-semibold text-gray-900 dark:text-white">Description</label>
                    <textarea value={storeData.description} onChange={handleInputChange} id="description" rows={10} name='description' className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <div className="mb-5">
                        <label htmlFor="contact" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Contact</label>
                        <input type="number" value={storeData.contact} onChange={handleInputChange} id="contact" name='contact' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <label className='block mt-[1rem] mb-[.3rem] text-base font-semibold' htmlFor="logo">Logo</label>
                    <input type="file" name='logo' id='logo' onChange={handleLogoChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />
                    <img className="w-[20rem] my-[1rem] " src={previewLogo || `http://localhost:3000/store-logo/${storeData.logo}`} alt="" />

                    <label className='block mt-[1rem] mb-[.3rem] text-base font-semibold' htmlFor="banner">Banner</label>
                    <input type="file" name='banner' id='banner' onChange={handleBannerChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" />
                    <img className="w-[20rem] my-[1rem] " src={previewBanner || `http://localhost:3000/store-banner/${storeData.banner}`} alt="" />


                    <button type="submit" className="text-white mt-[2rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            </section>
        </div>
    )
}

export default UpdateStoreDashboardPage