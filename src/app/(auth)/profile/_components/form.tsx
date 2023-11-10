"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const Form = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
    })

    useEffect(() => {
      const profile = async () => {
        try {
            const response = await axios.get("/api/users/profile")
            if(response.status === 200){
                setUserData(response.data.data)
            }    
        } catch (error:any) {
            toast.error(error.message)
        }        
      }
      profile();
    }, [])    

    const handleProfile = async () => {

    }

    const logout = async () => {
        try {
            setLoading(true)
            const result = await axios.get("/api/users/logout")
            if(result.status == 200) {
                toast.success(result.data.message)
                router.push("/login")
            }
        } catch (error:any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-screen flex flex-col items-center min-h-screen justify-center'>
            <h1 className='text-xl font-semibold'>User Profile</h1>
            <div className='text-sm w-72 py-4 relative'>
                <div className="w-16 h-16 rounded-full mx-auto bg-white photo">
                </div>
                <div className="py-2">
                    <label htmlFor="username" className='block pb-2'>username <span className="text-red-500">*</span> </label>
                    <input onChange={(e) => setUserData({...userData, username : e.target.value})} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:outline outline-none focus:outline-purple-800 focus:outline-1 placeholder:text-xs' type="text" name="username" id="username" placeholder='username...' value={userData.username} />
                </div>
                <div className="py-2">
                    <label htmlFor="email" className='block pb-2'>email <span className="text-red-500">*</span> </label>
                    <input onChange={(e) => setUserData({...userData, email : e.target.value})} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:outline outline-none focus:outline-purple-800 focus:outline-1 placeholder:text-xs' type="email" name="email" id="email" placeholder='email...' value={userData.email} />
                </div>
                <button onClick={handleProfile} className="w-full px-4 py-2 mt-8 rounded-3xl focus:outline-none hover:bg-indigo-700 hover:scale-105 duration-300 transition-all bg-indigo-500 text-white font-semibold">Update</button>
                <button onClick={logout} className="w-full px-4 py-2 mt-4 rounded-3xl focus:outline-none hover:bg-red-700 hover:scale-105 duration-300 transition-all bg-red-500 text-white font-semibold">{!loading ? "Logout" : "Processing..."}</button>
            </div>
        </div>
    )
}

export default Form