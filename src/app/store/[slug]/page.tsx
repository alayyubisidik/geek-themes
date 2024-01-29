"use client"
import { fetchWithToken, fetcher } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import React from 'react'
import useSWR from 'swr';

interface Store {
    id : number;
    name : string;
    slug : string;
    description : string;
    contact : number;
    logo : string;
    banner : string;
    created_at : string;
    user : {
        name : string;
        image : string;
    }
}


const StorePage = (props : { params : {slug : string}}) => {

    const { data : session} : { data : any} = useSession();
    const token = session?.user?.token;

    console.log(props.params.slug)


    // const { data } = useSWR(
    //     `http://localhost:3000/api/stores/${props.params.slug}`,
    //     (url, method) => fetcher(url, "Get")
    // );

    let { data } = useSWR([`http://localhost:3000/api/stores/${props.params.slug}`, "GET"], ([url, method]) => fetcher(url, method));
    const store : Store = data?.data;

    return (
        <div>
            <div className="w-full bg-gray-300 py-[1rem] px-[15%] flex justify-between mt-[3rem]">
                {store ? (
                    <div>
                        <img className='w-[35rem]' src={`http://localhost:3000/store-banner/${store?.banner}`} alt="" />
                        <p className='text-xl mt-[2rem] mb-[.5rem] font-semibold'>{store.name}</p>
                        <p>{store.description}</p>
                        <p className='text-xl mt-[2rem] mb-[.5rem] font-semibold'>Contact</p>
                        <p>{store.contact}</p>
                    </div>
                ): null}
            </div>
        </div>
    )
}

export default StorePage