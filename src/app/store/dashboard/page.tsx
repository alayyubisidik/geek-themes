"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StoreDashboardLayout = () => {
    const pathname = usePathname();
    return (
        <div className=' min-h-[100vh] mt-[-.5rem]'>
            <h1 className='text-3xl font-bold'>Author Dashboard</h1>

        </div>
    )
}

export default StoreDashboardLayout