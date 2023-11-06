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


type CreateCertificateType = z.infer<typeof createCertificateZSchema>


export default function CreateCertificate() {


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isValidating },
  } = useForm<CreateCertificateType>({
    resolver: zodResolver(createCertificateZSchema)
  })

  const [createdCertificate, setCreatedCertificate] = useState<OneCertificate>();

  const onSubmit: SubmitHandler<CreateCertificateType> = async (data) => {
    console.log("data", data)

    try {

      const createdCertifcate = await axios.post("/api/certificate", {
        body: data
      })
      console.log("createdCertifcate", createdCertifcate);

      toast.success("Certificate Created Succefully");
      setCreatedCertificate(createdCertifcate?.data?.data)
      reset()
    } catch (error: any) {
      console.log(error);

      toast.error((error)?.response?.data?.message)
    }
  }


  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <h1 className="text_highlight_gradient text_sub_heading_size">Get your Centificate</h1>
        <div className="mt-14 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Your Name' required className='input_1' {...register('recipientName')} />
            {errors?.recipientEmail &&
              <p>{errors?.recipientEmail?.message}</p>
            }
            <input type="email" placeholder='Enter your email' required className='input_1' {...register('recipientEmail')} />
            {errors?.recipientEmail &&
              <p>{errors?.recipientEmail?.message}</p>
            }
            <button disabled={!isValid} className={`btn_primary_${isValid ? "1" : "2"}`} type='submit'>
              generate centificate Cetificate
            </button>
          </form>
        </div>

        {createdCertificate &&
          <div className="mt-12">

            <p>your Certificate Number: {createdCertificate?.certificateNumber}</p>
            <Link href={"/certificate/" + createdCertificate.certificateNumber} target="_blank">
              <button className={`btn_primary_1`}>
                Download Your Certificate
              </button>
            </Link>
          </div>
        }
      </section>
    </main>
  )
}
