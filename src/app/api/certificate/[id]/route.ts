import { connectToDb } from '@/database/connect';
import Certificate from '@/database/models/Certificated';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectToDb();

        const _certificate = await Certificate.findById(params.id);
        if (!_certificate) return new Response("Prompt Not Found", { status: 404 });

        return NextResponse.json({ status: true, data: _certificate }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}
