import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/CertificateModel';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectToDb();

        const { id: _certNumber } = params;

        const _certificate = await Certificate.findOne({ certificateNumber: String(_certNumber).toLowerCase() });
        if (!_certificate) return NextResponse.json({ status: false, message: "Certificate Not Found" }, { status: 404 });

        return NextResponse.json({ status: true, data: _certificate }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}
