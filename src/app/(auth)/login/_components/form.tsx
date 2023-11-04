"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const Form = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            setLoading(true)
            const result = await axios.post("/api/users/login", userData);
            if(result.status == 200) {
                toast.success(result.data.message)
                router.push("/profile", { scroll: false })
            }     
        } catch (error:any) {
            console.log("Login Error : ",error.message)
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-screen flex flex-col items-center min-h-screen justify-center'>
            <h1 className='text-xl font-semibold'>Login</h1>
            <div className='text-sm w-72 py-4 relative'>
                <div className="py-2">
                    <label htmlFor="email" className='block pb-2'>email <span className="text-red-500">*</span> </label>
                    <input onChange={(e) => setUserData({...userData, email : e.target.value})} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="email" name="email" id="email" placeholder='email...' value={userData.email} />
                </div>
                <div className="py-2">
                    <label htmlFor="password" className='block pb-2'>password <span className="text-red-500">*</span> </label>
                    <input onChange={(e) => setUserData({...userData, password : e.target.value})} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="password" name="password" id="password" placeholder='password...' value={userData.password} />
                </div>
                <button onClick={onLogin} className="w-full px-4 py-2 mt-8 rounded-3xl focus:outline-none hover:bg-indigo-700 hover:scale-105 duration-300 transition-all bg-indigo-500 text-white font-semibold">{loading ? 'Procesing...' : 'Login'}</button>
                <p className="text-center text-xs py-2">Click here to <Link href="signup"><span className="underline text-indigo-700">signup</span></Link> </p>
            </div>
        </div>
    )
}

export default Form