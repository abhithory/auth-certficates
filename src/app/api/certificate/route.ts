import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/CertificateModel';
import { createCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { NextRequest, NextResponse } from 'next/server'

import ShortUniqueId from 'short-unique-id';


const { randomUUID } = new ShortUniqueId({ length: 16 });

export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const reqObj = await req.json();

        const validation = createCertificateZSchema.safeParse(reqObj.body);
        if (!validation?.success) {
            return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
        }


        const _certificate = await Certificate.findOne({ recipientEmail: validation.data.recipientEmail.toLowerCase() });
        if (_certificate) return NextResponse.json({ status: true, message: "Certificate Already Exits with this email address", data: _certificate }, { status: 200 });


        const generatedCertificateNumber = randomUUID();
        const certificateNumber = String(generatedCertificateNumber).toLowerCase();

        console.log({ certificateNumber });


        const newPrompt = new Certificate({ certificateNumber, recipientName: validation.data.recipientName, recipientEmail: validation.data.recipientEmail.toLowerCase() });
        await newPrompt.save();
        return NextResponse.json({ status: true, message: "Certificate created succefully", data: newPrompt }, { status: 201 })
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}