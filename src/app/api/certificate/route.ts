import { connectToDb } from '@/database/connect';
import User from '@/database/models/UserModel';
import Certificate from '@/database/models/CertificateModel';
import { createCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { NextRequest, NextResponse } from 'next/server'

import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 10 });

export async function POST(req: NextRequest) {
  try {
    await connectToDb()
    const reqObj = await req.json();

    const validation = createCertificateZSchema.safeParse(reqObj.body);
    if (!validation?.success) {
      return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
    }

    const user = await User.findOne({ recipientEmail: validation.data.recipientEmail.toLowerCase() });
    if (!user) return NextResponse.json({ status: false, message: "User Not Found" }, { status: 404 });

    const _certificate = await Certificate.findOne({ userId: user._id });
    if (_certificate) return NextResponse.json({ status: true, message: "Certificate Already Exits with this email address", data: _certificate }, { status: 200 });
    const generatedCertificateNumber = randomUUID();
    const certificateNumber = String(generatedCertificateNumber).toLowerCase();

    const newPrompt = new Certificate({ certificateNumber, userId: user._id });
    await newPrompt.save();

    return NextResponse.json({ status: true, message: "Certificate created succefully", data: newPrompt }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 })
  }
}
