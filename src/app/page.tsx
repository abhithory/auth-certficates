"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import { getCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { useState } from "react";
import { OneCertificate } from "@/utils/types/Certificate";
import PopUpModal from "@/components/Modal/PopUpModal";

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


  const onSubmit: SubmitHandler<GetCertificateType> = async (data) => {
    console.log("data", data)
    const createdCertifcate = await axios.get(`/api/certificate/${data?.certificateNumber}`)
    console.log("generated", createdCertifcate);
    setCertificateDetails(createdCertifcate?.data as OneCertificate);
  }


  console.log("certificateNumber", watch("certificateNumber"))


  function shareOnLinkedIn(title: string, url: string) {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(linkedInShareUrl, '_blank');
  }

  function shareOnTwitter(text: string, url: string) {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterShareUrl, '_blank');
  }


  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <h1 className="text_highlight_gradient text_sub_heading_size">Genertate your Centificate</h1>
        <h1 className="md:mt-4  text_heading_size">with <span className='text_primary_gradient_2'>DataVault</span></h1>
        <div className="mt-14 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter Centificate Number' className='input_1' {...register("certificateNumber")} />
            <button className="btn_primary_1" type="submit" >
              Get Cetificate
            </button>
          </form>
        </div>

        {certificateDetails &&
          <div className="">
            <h2>Share Certificate:</h2>
            <div className="d-flex items-center justify-center">
              <button className="btn_primary" type="submit"
                onClick={() => {
                  shareOnLinkedIn(window.location.href + "/certificate" + certificateDetails?.certificateNumber, "Checkout my latest certificate")
                }}
              >
                Linked
              </button>
              <button className="btn_primary" type="submit"
                onClick={() => {
                  shareOnTwitter(window.location.href + "/certificate" + certificateDetails?.certificateNumber, "Checkout my latest certificate: ")
                }}
              >
                Twitter
              </button>
            </div>
            {/* <button className="btn_primary" type="submit" >
              Add certificate to your linked account
            </button> */}
            <button className="btn_primary" type="submit" >
              Mint NFT soon...
            </button>
          </div>
        }

        <PopUpModal isOpen={!!certificateDetails} closeModal={() => {

        }}>
          <div className="">
            <p>Certificate issued for: {certificateDetails?.recipientName}</p>
            <p>Certificate issued for email: {certificateDetails?.recipientEmail}</p>
            <p>Certificate issued at: {certificateDetails?.createdAt}</p>
            <p>Certificate Number: {certificateDetails?.certificateNumber}</p>
          </div>
        </PopUpModal>

      </section>
    </main>
  )
}
