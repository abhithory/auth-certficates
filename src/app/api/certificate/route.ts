import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/Certificated';
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod';

const createCertificateSchema = z.object({
    recipientName: z.string().min(1).max(255),
    recipientEmail: z.string().min(1).max(400)
})

export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const body = await req.json();
        const validation = createCertificateSchema.safeParse(body);
        if (!validation?.success) {
            return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
        }
        const newPrompt = new Certificate({ recipientName: validation.data.recipientName, recipientEmail: validation.data.recipientEmail });
        await newPrompt.save();
        return NextResponse.json({ status: true, message: "Certificate created succefully", data: newPrompt }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}