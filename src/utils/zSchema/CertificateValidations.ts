import { z } from 'zod';

import MintCertificateButton from '@/components/NftMintingButton/MintCertificateButton';
export const createCertificateZSchema = z.object({
  recipientEmail: z.string().min(1).max(400, "Email should be less than 400 characters")
})

export const getCertificateZSchema = z.object({
  certificateNumber: z.string().min(1).max(500, "Certificate Number should be less than 500 characters"),
})
