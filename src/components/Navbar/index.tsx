"use client"
import React from 'react'

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';


export function Navbar() {
    const router = useRouter();

    const pathname = usePathname();

    if (pathname.startsWith("/certificate/")) {
        return <></>
    }

    return (
        <nav className="w-full flex justify-between  py-4 h-[12vh] xl:px-20 md:px-14 px-8">
            <span onClick={() => router.push("/")} className=" cursor-pointer flex items-center justify-center gap-4 xl:ml-8 md:ml-4 ml-2">
                {/* <img
          src="/assests/logo.svg"
          // width={100}
          // height={100}
          className='xl:w-24 md:w-16 w-14'
          alt="Picture of the author"
        /> */}
                <h1 className="md:text-3xl  text-xl secondary_gradient font-bold ">Certificate Authentication</h1>
            </span>
            <span className="flex items-center justify-center gap-4">


                <Link href={"/create"}>
                    <button className="btn_primary_1" >Create</button>
                </Link>

            </span>
        </nav>
    )
}