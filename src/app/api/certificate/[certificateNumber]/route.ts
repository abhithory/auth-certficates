import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/CertificateModel';
import User from '@/database/models/UserModel'
import { getCertificateZSchema } from '@/utils/zSchema/CertificateValidations';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connectToDb();

    const validation = getCertificateZSchema.safeParse(params);
    if (!validation?.success) {
      return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
    }

    const _certificate = await Certificate.findOne({ certificateNumber: String(validation?.data?.certificateNumber).toLowerCase() });
    const _user = await User.findOne({ _id: _certificate?.userId })

    if (!_certificate) return NextResponse.json({ status: false, message: "Certificate Not Found" }, { status: 404 });
    if (!_user) return NextResponse.json({ status: false, message: "User Not Found" }, { status: 404 });

    return NextResponse.json({ status: true, data: { certificateNumber: _certificate.certificateNumber, createdAt: _certificate.createdAt, recipientName: _user.recipientName } }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 })
  }
}
