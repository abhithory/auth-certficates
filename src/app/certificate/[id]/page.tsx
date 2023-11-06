"use client"
import axios from 'axios';
import { useEffect, useState } from "react";
import { OneCertificate } from "@/utils/types/Certificate";

import { useParams } from 'next/navigation'



export default function YourCertificatePage() {

    const params = useParams();

    if (!params?.id) {
        <main className="page_main flex_center flex-col">
            <section className="flex_center page_main flex-col text-center h-full">
                NO Certificate with this number
            </section>
        </main>
    }

    // TODO: define cer
    const [certificateDetails, setCertificateDetails] = useState<OneCertificate>();


    useEffect(() => {

    }, [])


    return (
        <main className="page_main flex_center flex-col">
            <section className="flex_center page_main flex-col text-center h-full">
                {params?.id}
            </section>
        </main>
    )
}
