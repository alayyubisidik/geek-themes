"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StoreDashboardLayout = ({children} : {children : React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <div className='grid grid-cols-[1fr_5fr] min-h-[100vh] mt-[-.5rem]'>

            <div className="bg-blue-500 pt-[2rem]">
                <ul>
                    <Link href={'/store/dashboard'}>
                        <li className={`text-white p-[1rem] hover:bg-blue-900 pl-[2rem] ${pathname == '/store/dashboard' ? 'bg-blue-900 ' : ""}`}>Dashboard</li>
                    </Link>
                    <Link href={'/store/dashboard/store'}>
                        <li className={`text-white p-[1rem] hover:bg-blue-900 pl-[2rem] ${pathname.startsWith('/store/dashboard/store') ? 'bg-blue-900 ' : ""}`}>Store</li>
                    </Link>
                    <Link href={'/store/dashboard/template'}>
                        <li className={`text-white p-[1rem] hover:bg-blue-900 pl-[2rem] ${pathname.startsWith('/store/dashboard/template') ? 'bg-blue-900 ' : ""}`}>Template</li>
                    </Link>
                    <Link href={'/store/dashboard/order'}>
                        <li className={`text-white p-[1rem] hover:bg-blue-900 pl-[2rem] ${pathname.startsWith('/store/dashboard/order') ? 'bg-blue-900 ' : ""}`}>Order</li>
                    </Link>
                    <Link href={'/store/dashboard/rating'}>
                        <li className={`text-white p-[1rem] hover:bg-blue-900 pl-[2rem] ${pathname.startsWith('/store/dashboard/rating') ? 'bg-blue-900 ' : ""}`}>Rating</li>
                    </Link>
                </ul>
            </div>
            <div className="p-[3rem]">
                {children}
            </div>
        </div>
    )
}

export default StoreDashboardLayout