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
import { apiCreateCertificate } from '@/apiCalls/certificatesApi';


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
      </section>
    </main>
  )
}
