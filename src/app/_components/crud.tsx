"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const CRUD = () => {
    const router = useRouter()
    const [isEdit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [empData, setEmpData] = useState([])
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        gender: "",
    })

    useEffect(() => {
        const profile = async () => {
            try {
                const response = await axios.get("http://localhost:5000")
                if (response.status === 200) {
                    setEmpData(response.data.data)
                }
            } catch (error: any) {
                toast.error(error.message)
            }
        }
        profile();
    }, [loading === true])

    const addEmployees = async () => {
        try {
            setLoading(true)
            const result = await axios.post("http://localhost:5000/add", userData);
            if (result.status == 200) {
                toast.success(result.data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    const handleData = (element:any) => {
        setUserData(element)
        setEdit(true)
    }

    const editData = async () => {
        try {
            const data = {...userData}
            data.id = data._id
            delete data._id
            setLoading(true)
            const result = await axios.put("http://localhost:5000/edit", data);
            console.log(result)
            if (result.status == 200) {
                toast.success(result.data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async (element:any) => {
        try {
            setLoading(true)
            const result = await axios.delete(`http://localhost:5000/delete/${element._id}`);
            console.log(result)
            if (result.status == 200) {
                toast.success(result.data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    console.log(empData)

    return (
        <section className='w-full min-h-[70vh] mx-auto flex justify-between items-center'>
            <div className="w-auto py-5 px-10 h-full bg-white shadow-[0px_0px_3px_1px_#0001] rounded-md grid place-items-center">
                <h1 className='text-xl font-semibold mt-6'>Add Employee</h1>
                <div className='text-sm w-72 py-4 relative '>
                    <div className="py-2">
                        <label htmlFor="fname" className='block pb-2'>First name <span className="text-red-500">*</span> </label>
                        <input onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="text" name="fname" id="fname" placeholder='first name...' value={userData.first_name} />
                    </div>
                    <div className="py-2">
                        <label htmlFor="lname" className='block pb-2'>Last name <span className="text-red-500">*</span> </label>
                        <input onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="text" name="lname" id="lname" placeholder='last name...' value={userData.last_name} />
                    </div>
                    <div className="py-2">
                        <label htmlFor="email" className='block pb-2'>Email <span className="text-red-500">*</span> </label>
                        <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="email" name="email" id="email" placeholder='email...' value={userData.email} />
                    </div>
                    <div className="py-2">
                        <label htmlFor="mobile" className='block pb-2'>Mobile <span className="text-red-500">*</span> </label>
                        <input onChange={(e) => setUserData({ ...userData, mobile: e.target.value })} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="tel" name="mobile" id="mobile" placeholder='mobile...' value={userData.mobile} />
                    </div>
                    <div className="py-2">
                        <label htmlFor="Gender" className='block pb-2'>Gender <span className="text-red-500">*</span> </label>
                        <input onChange={(e) => setUserData({ ...userData, gender: e.target.value })} className='rounded-md w-full p-2 shadow-[0_0_3px_0px_#00000055] focus:border outline-none focus:border-purple-800 placeholder:text-xs' type="text" name="gender" id="gender" placeholder='gender...' value={userData.gender} />
                    </div>
                    <button onClick={() => isEdit ? editData() : addEmployees()} className="w-full px-4 py-2 mt-6 rounded-3xl focus:outline-none hover:bg-indigo-700 hover:scale-105 duration-300 transition-all bg-indigo-500 text-white font-semibold">{loading ? 'Procesing...' : isEdit ? 'Update' : 'Submit'}</button>
                    <button onClick={() => {
                        setUserData({
                            first_name: "",
                            last_name: "",
                            email: "",
                            mobile: "",
                            gender: "",
                        })
                        setEdit(false)
                    }} className="w-full px-4 py-2 mt-2 rounded-3xl focus:outline-none hover:bg-red-600 hover:scale-105 duration-300 transition-all bg-red-500 text-white font-semibold">{ 'Clear'}</button>
                    
                </div>
            </div>
            <div className="w-auto min-w-min min-h-[80vh] bg-white shadow-[0px_0px_3px_1px_#0001] rounded-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='py-5 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                            <th scope="col" className="p-5">
                                Name
                            </th>
                            <th scope="col" className="p-5">
                                Email
                            </th>
                            <th scope="col" className="p-5">
                                Mobile
                            </th>
                            <th scope="col" className="p-5">
                                Gender
                            </th>
                            <th scope="col" className="p-5">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empData.map((element: any, key) => (
                                <tr key={key} className={`bg-white ${element._id === userData._id && 'bg-gray-100' } hover:bg-gray-100 cursor-pointer`}>
                                    <td scope='row' className="flex items-end p-5 text-gray-900 whitespace-nowrap dark:text-white text-xs">
                                        {`${element.first_name} ${element.last_name}`}
                                    </td>
                                    <td className="text-xs p-5">
                                        {`${element.email}`}
                                    </td>
                                    <td className="text-xs p-5">
                                        {`${element.mobile}`}
                                    </td>
                                    <td className="text-xs p-5">
                                        {`${element.gender}`}
                                    </td>
                                    <td className="text-xs p-5 flex">
                                        <div onClick={() => handleData(element)} className="font-medium h-full text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</div>
                                        <div onClick={() => deleteData(element)} className="font-medium h-full text-red-600 dark:text-red-500 hover:underline cursor-pointer ml-4">Delete</div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CRUD