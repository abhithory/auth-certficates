import { connectToDb } from "@/database/connect";
import Certificate from "@/database/models/CertificateModel";
import { getCertificateZSchema } from "@/utils/zSchema/CertificateValidations";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, { params }: { params: any }) {
    try {
        await connectToDb()

        const validation = getCertificateZSchema.safeParse(params);
        if (!validation?.success) {
            return NextResponse.json({ status: false, message: validation.error.errors }, { status: 400 })
        }

        const _certificate = await Certificate.findOne({ certificateNumber: String(validation?.data?.certificateNumber).toLowerCase() });
        if (!_certificate) return NextResponse.json({ status: false, message: "Certificate Not Found" }, { status: 404 });
        _certificate.nftMinted = true

        await _certificate.save();
        return NextResponse.json({ status: true, message: "Nft Minted Seted", data: _certificate }, { status: 201 })
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}