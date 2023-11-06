"use client"
import axios from 'axios';
import { useEffect, useState } from "react";
import { OneCertificate } from "@/utils/types/Certificate";

import { useParams } from 'next/navigation'
import { toast } from 'react-toastify';
import { SimpleSpinner } from '@/components/Spinner/SimpleSpinner';
import { formatDateTime } from '@/utils/helpers/dates';
import { GenerateCertificate } from '@/components/GenerateCertificate/GenerateCertificate';


export default function YourCertificatePage() {

    const params = useParams();

    const [certificateDetails, setCertificateDetails] = useState<OneCertificate>();
    const [loadingCertificate, setLoadingCertificate] = useState(false);

    useEffect(() => {

        const loadCertificate = async () => {
            try {
                setLoadingCertificate(true)
                const createdCertifcate = await axios.get(`/api/certificate/${params?.id}`)
                setCertificateDetails(createdCertifcate?.data?.data as OneCertificate);
            } catch (error: any) {
                console.log(error);
                const errorData = (error)?.response?.data?.message
                toast.error(typeof errorData === "string" ? errorData : "Something went wround")
            } finally {
                setLoadingCertificate(false)
            }
        }
        loadCertificate()
    }, [params?.id]);



    return (
        <main className="page_main flex_center flex-col">
            {loadingCertificate ?
                <section className="flex_center page_main flex-col text-center h-full">
                    <SimpleSpinner className='w-24 h-24' />
                </section>
                :
                <section className=" ">
                    {certificateDetails &&
                        <div className="flex_center flex-col gap-8 mt-12">
                            <h1 className="text_highlight_gradient text_heading_size">{certificateDetails.recipientName}{"'s"} Certificate</h1>
                            <GenerateCertificate certificateDetails={certificateDetails} />
                        </div>
                    }
                </section>
            }

        </main>
    )
}
