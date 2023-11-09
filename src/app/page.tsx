"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import { getCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { useState } from "react";
import { OneCertificate } from "@/utils/types/Certificate";

import { toast } from 'react-toastify';
import { formatDateTime } from "@/utils/helpers/dates";
import Link from "next/link";
import { NormalButton } from "@/components/Button/NormalButton";
import ShareCertificateButtons from "@/components/ShareCertificate/ShareCertificate";
import { apiLoadCertificateWithNumer } from "@/apiCalls/certificatesApi";
import MintCertificateButton from "@/components/NftMintingButton/MintCertificateButton";


type GetCertificateType = z.infer<typeof getCertificateZSchema>

export default function Home() {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
    reset
  } = useForm<GetCertificateType>({
    resolver: zodResolver(getCertificateZSchema)
  })

  const [certificateDetails, setCertificateDetails] = useState<OneCertificate>();
  const [loadingCertificate, setLoadingCertificate] = useState(false);





  const onSubmit: SubmitHandler<GetCertificateType> = async (data) => {
    try {
      setLoadingCertificate(true)
      const certificate = await apiLoadCertificateWithNumer(data?.certificateNumber);
      setCertificateDetails(certificate);
      reset()
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
        <h1 className="text_highlight_gradient text_heading_size">Verify Certificate</h1>
        <div className="mt-14 ">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center mt-12 xl:w-[40vw] md:w-[80vw] w-[90vw]'>
            <input type="text" placeholder='Enter Centificate Number' className='input_1' {...register("certificateNumber")} />
            <NormalButton loading={loadingCertificate} disabled={!isValid || loadingCertificate} className={`btn_primary_${isValid ? "1" : "2"}`} type='submit'>
              Get Cetificate
            </NormalButton>
          </form>
        </div>

        {certificateDetails &&
          <div className="mt-12">
            <div className="">
              <p className="text_sub_heading_size">Recipient Name:<span className="text_highlight_gradient  font-bold"> {certificateDetails?.recipientName} </span> </p>
              <p className="text_sub_heading_size">Recipient Email:: <span className="text_highlight_gradient  font-bold">{certificateDetails?.recipientEmail}</span></p>
              <p className="text_sub_heading_size">Date of Issuance: <span className="text_highlight_gradient  font-bold">{formatDateTime(certificateDetails?.createdAt)} </span></p>
            </div>
            <div className="mt-4">
              <Link href={"/certificate/" + certificateDetails.certificateNumber} target="_blank">
                <NormalButton className={`btn_primary_1`}>

                  View Certificate
                </NormalButton>
              </Link>
            </div>
            <div className="mt-8">
              <h1 className="text_sub_heading_size mb-2">Share Certificate</h1>

              <ShareCertificateButtons certificateDetails={certificateDetails} />
            </div>
          </div>
        }

      </section>
    </main>
  )
}
