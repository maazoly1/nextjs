import React from 'react'

const page = ({ params }: any) => {
    const slug = params.slug;
    return (
        <div className='w-screen h-screen grid place-items-center'>
            <div className="">
                {slug.map((element: any, i: any) => (
                    <span key={i} className="ml-1">{`/\t${element}`}</span>
                ))}
                <span className="p-4 text-2xl inline-block rounded bg-orange-500 ml-2 font-semibold">404: Not Found</span>
            </div>
        </div>
    )
}

export default page