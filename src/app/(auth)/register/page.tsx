"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

const RegisterPage = () => {

  const router = useRouter();
  const { status }: { status: string } = useSession();
  const [fileImg, setFileImg] = useState();
  const [previewImg, setPreviewImg] = useState();

  useEffect(() => {
    if (status == 'authenticated') {
      router.replace('/');
    }
  });

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

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', e.target.name.value);
    data.append('username', e.target.username.value);
    data.append('email', e.target.email.value);
    data.append('password', e.target.password.value);

    if (fileImg) {
      data.append('image', fileImg);
    }

    const request = {
      method: "POST",
      body: data
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/register', request);

      if (res.ok) {
        e.target.reset();
        router.push('/login');
      } else if (res.status === 400) {
        const responseBody = await res.json();
        console.log(responseBody.body.errors)
      }
    } catch (error) {

    }
  }

  return (
    <div >
      <section className="bg-gray-50 dark:bg-gray-900 py-[5rem]">
        <div className="flex flex-col items-center justify-center  mx-auto h-full ">
          <a href="#" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
            <div className="font-bold sm:text-lg lg:text-2xl">Geek<span className='text-blue-500'>Themes</span></div>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an Account
              </h1>
              <form method='post' onSubmit={(e) => handleRegister(e)} className="space-y-4 md:space-y-6" >

                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name='name' id='name' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name='username' id='username' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name='email' id='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name='password' id='password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div>
                  <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Profile</label>
                  <input type="file" id='image' name='image' onChange={handleImageChange}/>
                  <img className="w-[20rem] my-[1rem] " src={previewImg} alt="" />
                </div>

                <button type="submit" className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                <p className="text-sm font-light text-gray-500 ">
                  Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage