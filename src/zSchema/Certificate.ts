import { z } from 'zod';

export const createCertificateZSchema = z.object({
    recipientName: z.string().min(1).max(255),
    recipientEmail: z.string().min(1).max(400)
})