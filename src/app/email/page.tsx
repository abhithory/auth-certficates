"use client"
import { toast } from 'react-toastify';
import { NormalButton } from "@/components/Button/NormalButton";
import ShareCertificateButtons from "@/components/ShareCertificate/ShareCertificate";
import { useState } from "react";
import { OneCertificate } from '@/utils/types/Certificate';
import { apiCreateCertificate } from "@/apiCalls/certificatesApi";

export default function EmailCertificate() {
  const [email, setEmail] = useState("");
  const [creatingCertificate, setCreatingCertificate] = useState(false);

  const [createdCertificate, setCreatedCertificate] = useState<OneCertificate>();

  async function onSubmit() {
    try {
      setCreatingCertificate(true);
      const createdCertifcate = await apiCreateCertificate({
        recipientEmail: email
      });

      if (createdCertifcate.status === 201) {
        toast.success("Certificate Created Succefully");
      } else {
        toast.info("Certificate Already created with this email");
      }
      setCreatedCertificate(createdCertifcate?.data?.data)
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
        <div onSubmit={() => { }} className='flex flex-col gap-4 items-center mt-12 xl:w-[40vw] md:w-[80vw] w-[90vw]'>
          <input type="email" placeholder='Enter your email' required onChange={(e) => { setEmail(e.target.value) }} className={"input_1"} />
          <NormalButton loading={creatingCertificate} disabled={creatingCertificate} className={`btn_primary_1`} onClick={() => {
            onSubmit()
          }}>
            Generate Cetificate
          </NormalButton>
        </div>

        {createdCertificate &&
          <>
            <div className="mt-12">
              <p>Your Certificate Number: {createdCertificate?.certificateNumber}</p>
              <a href={"/certificate/" + createdCertificate.certificateNumber} target="_blank" />
              <button className={`btn_primary_1`}>
                Download Your Certificate
              </button>

            </div>
            <div className="mt-8">
              <h1 className="text_highlight_gradient text_sub_heading_size mb-2">Share Certificate</h1>
              <ShareCertificateButtons certificateDetails={createdCertificate} />

            </div>
          </>
        }
      </section>
    </main >
  )
}
