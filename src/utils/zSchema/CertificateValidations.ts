import { z } from 'zod';

export const createCertificateZSchema = z.object({
    recipientName: z.string().min(1, "Name is Required").max(20, "Name should be less than 20 characters"),
    recipientEmail: z.string().min(1).max(400, "Email should be less than 400 characters")
})


export const getCertificateZSchema = z.object({
    certificateNumber: z.string().min(1).max(500, "Certificate Number should be less than 500 characters"),
})