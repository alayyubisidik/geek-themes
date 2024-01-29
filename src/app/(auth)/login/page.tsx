"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

const LoginPage = ({ searchParams }: any) => {

    const { status }: { status: string } = useSession();
    const [error, setError] = useState("");
    const router = useRouter();

    console.log(status);

    useEffect(() => {
        if (status == 'authenticated') {
            router.replace('/');
        }
    });

    if (searchParams.callbackUrl == 'http://localhost:3000') {
        searchParams.callbackUrl = 'http://localhost:4000'
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                username: e.target.username.value,
                password: e.target.password.value,
                callbackUrl: searchParams.callbackUrl
            });

            if (!res?.error) {
                router.push(searchParams.callbackUrl)
            } else {
                setError('Username or password is incorrect');
            }
        } catch (error) {
            setError('Username or password is incorrect');
        }
    }

    return (
        <div className=''>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <div className="font-bold sm:text-lg lg:text-2xl">Blog<span className='text-blue-500'>Post</span></div>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form method='post' onSubmit={(e) => handleLogin(e)} className="space-y-4 md:space-y-6" >
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input type="text" name='username' id='username' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="messi_isGoat" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit" className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage