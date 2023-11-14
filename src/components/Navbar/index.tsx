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
        <h1 className="md:text-3xl  text-xl secondary_gradient font-bold ">Certificate Authentication</h1>
      </span>
      <span className="flex items-center justify-center gap-4">
        <Link href={"/email"}>
          <button className="btn_primary_1" >Get Certificate</button>
        </Link>

      </span>
    </nav>
  )
}
