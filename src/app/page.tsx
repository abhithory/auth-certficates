"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import { getCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { useState } from "react";
import { OneCertificate } from "@/utils/types/Certificate";
import PopUpModal from "@/components/Modal/PopUpModal";

import { toast } from 'react-toastify';
import { formatDateTime } from "@/utils/helpers/dates";
import Link from "next/link";
import { NormalButton } from "@/components/Button/NormalButton";
import ShareCertificateButtons from "@/components/ShareCertificate/ShareCertificate";


type GetCertificateType = z.infer<typeof getCertificateZSchema>

export default function Home() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<GetCertificateType>({
    resolver: zodResolver(getCertificateZSchema)
  })

  // TODO: define cer
  const [certificateDetails, setCertificateDetails] = useState<OneCertificate>();
  const [loadingCertificate, setLoadingCertificate] = useState(false);


  const onSubmit: SubmitHandler<GetCertificateType> = async (data) => {
    console.log("data", data)
    try {
      setLoadingCertificate(true)
      const createdCertifcate = await axios.get(`/api/certificate/${data?.certificateNumber}`)
      console.log("generated", createdCertifcate);
      setCertificateDetails(createdCertifcate?.data?.data as OneCertificate);
    } catch (error: any) {
      console.log(error);
      const errorData = (error)?.response?.data?.message

      toast.error(typeof errorData === "string" ? errorData : "Enter Valid Data. Something unexpted in backend")
    } finally {
      setLoadingCertificate(false)
    }
  }




  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <h1 className="text_highlight_gradient text_sub_heading_size">Verify Certificate</h1>
        <div className="mt-14 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter Centificate Number' className='input_1' {...register("certificateNumber")} />
            <NormalButton className="btn_primary_1" type="submit" loading={loadingCertificate} disabled={loadingCertificate}>
              Get Cetificate
            </NormalButton>
          </form>
        </div>

        {certificateDetails &&
          <div className="">
            <div className="">
              <p>Certificate issued for: {certificateDetails?.recipientName}</p>
              <p>Certificate issued for email: {certificateDetails?.recipientEmail}</p>
              <p>Certificate issued at: {formatDateTime(certificateDetails?.createdAt)}</p>
            </div>
            <div className="">
              <Link href={"/certificate/" + certificateDetails.certificateNumber} target="_blank">
                <NormalButton className={`btn_primary_1`}>
                  View Certificate
                </NormalButton>
              </Link>
            </div>
            <h2>Share Certificate:</h2>
            <ShareCertificateButtons certificateDetails={certificateDetails} />
          </div>
        }

      </section>
    </main>
  )
}
