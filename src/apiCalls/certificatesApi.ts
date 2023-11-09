import { OneCertificate } from "@/utils/types/Certificate"
import { createCertificateZSchema } from "@/utils/zSchema/CertificateValidations";
import axios from "axios"
import { z } from "zod";

export const apiLoadCertificateWithNumer = async (certificateNumber: string): Promise<OneCertificate> => {
    try {

        const createdCertifcate = await axios.get(`/api/certificate/${certificateNumber}`)
        return createdCertifcate?.data?.data;
    } catch (error) {
        throw error
    }
}


type CreateCertificateType = z.infer<typeof createCertificateZSchema>
export const apiCreateCertificate = async (certificateData: CreateCertificateType) => {
    try {

        const createdCertifcate = await axios.post("/api/certificate", {
            body: certificateData
        })
        return createdCertifcate;
    } catch (error) {
        throw error
    }
}

export const apiSetNftMinted = async (certificateNumber: string): Promise<OneCertificate> => {
    try {
        const createdCertifcate = await axios.post(`/api/certificate/${certificateNumber}/nftminted`)
        return createdCertifcate?.data?.data;
    } catch (error) {
        throw error
    }
}