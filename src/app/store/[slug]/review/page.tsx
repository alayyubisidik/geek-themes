"use client"
import { fetchWithToken } from '@/service/fetch';
import { useSession } from 'next-auth/react';
import React from 'react'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ReoviewStorePage = (props : { params : {slug : string}}) => {

    const { data : session} : { data : any} = useSession();
    const token = session?.user?.token;

    return (
        <div>
            <div className="w-full bg-gray-300 py-[1rem] px-[15%] flex justify-between mt-[3rem]">
                <p className='text-2xl font-semibold my-[1rem]'>Review</p>
        
            </div>
        </div>
    )
}

export default ReoviewStorePage