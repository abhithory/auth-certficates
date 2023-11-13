"use client"

import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import axios, { AxiosError } from 'axios';
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import { createCertificateZSchema } from '@/utils/zSchema/CertificateValidations';

import { toast } from 'react-toastify';
import { OneCertificate } from '@/utils/types/Certificate';
import { useState } from 'react';
import Link from 'next/link';
import { NormalButton } from '@/components/Button/NormalButton';
import ShareCertificateButtons from '@/components/ShareCertificate/ShareCertificate';
import { apiCreateCertificate } from '@/apiCalls/certificatesApi';
import MintCertificateButton from '@/components/NftMintingButton/MintCertificateButton';


type CreateCertificateType = z.infer<typeof createCertificateZSchema>


export default function CreateCertificate() {


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateCertificateType>({
    resolver: zodResolver(createCertificateZSchema)
  })

  const [createdCertificate, setCreatedCertificate] = useState<OneCertificate>();
  const [creatingCertificate, setCreatingCertificate] = useState(false);

  const onSubmit: SubmitHandler<CreateCertificateType> = async (data) => {
    try {
      setCreatingCertificate(true);
      const createdCertifcate = await apiCreateCertificate(data);
      if (createdCertifcate.status === 201) {
        toast.success("Certificate Created Succefully");
      } else {
        toast.info("Certificate Already created with this email");
      }
      setCreatedCertificate(createdCertifcate?.data?.data)
      reset()
    } catch (error: any) {
      console.log(error);

      toast.error((error)?.response?.data?.message)

    } finally {
      setCreatingCertificate(false);
    }
  }


  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <h1 className="text_highlight_gradient text_heading_size">Generate your Certificate</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center mt-12 xl:w-[40vw] md:w-[80vw] w-[90vw]'>
          <input type="text" placeholder='Your Name' required className='input_1' {...register('recipientName')} />
          {errors?.recipientEmail &&
            <p>{errors?.recipientEmail?.message}</p>
          }
          <input type="email" placeholder='Enter your email' required className='input_1' {...register('recipientEmail')} />
          {errors?.recipientEmail &&
            <p>{errors?.recipientEmail?.message}</p>
          }
          <NormalButton loading={creatingCertificate} disabled={!isValid || creatingCertificate} className={`btn_primary_${isValid ? "1" : "2"}`} type='submit'>
            Generate Cetificate
          </NormalButton>
        </form>

        {createdCertificate &&
          <>
            <div className="mt-12">
              <p>Your Certificate Number: {createdCertificate?.certificateNumber}</p>
              <Link href={"/certificate/" + createdCertificate.certificateNumber} target="_blank">
                <button className={`btn_primary_1`}>
                  Download Your Certificate
                </button>
              </Link>

            </div>
            <div className="mt-8">
              <h1 className="text_highlight_gradient text_sub_heading_size mb-2">Share Certificate</h1>

              <ShareCertificateButtons certificateDetails={createdCertificate} />
              {/* 
              <div className="mt-4">

                <MintCertificateButton setCertificateDetails={setCreatedCertificate} certificateDetails={createdCertificate} />
              </div> */}

            </div>
          </>
        }
      </section>
    </main>
  )
}
