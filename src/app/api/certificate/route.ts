import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/CertificateModel';
import { createCertificateZSchema } from '@/zSchema/Certificate';
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const body = await req.json();
        const validation = createCertificateZSchema.safeParse(body);
        if (!validation?.success) {
            return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
        }

        const _certificate = await Certificate.findOne({ recipientEmail: validation.data.recipientEmail.toLowerCase() });
        if (_certificate) return NextResponse.json({ status: false, message: "Certificate Already Exits with this email address" }, { status: 409 });

        const newPrompt = new Certificate({ recipientName: validation.data.recipientName, recipientEmail: validation.data.recipientEmail.toLowerCase() });
        await newPrompt.save();
        return NextResponse.json({ status: true, message: "Certificate created succefully", data: newPrompt }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}