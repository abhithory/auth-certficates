"use client"
import { OneCertificate } from '@/utils/types/Certificate';
import React, { useState, useRef, useEffect } from 'react';
import { NormalButton } from '../Button/NormalButton';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { SimpleSpinner } from '../Spinner/SimpleSpinner';
import { capitalizeFirstLetter } from '@/utils/helpers/texts';



type GenerateCertificateProps = {
    certificateDetails: OneCertificate
}

export function GenerateCertificate({ certificateDetails }: GenerateCertificateProps) {
    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

    useEffect(() => {

        async function generateCertificate() {
            const existingPdfBytes = await fetch('/certificate.pdf').then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)


            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();

            const fontSize = 50;
            const textWidth = timesRomanBoldFont.widthOfTextAtSize(certificateDetails.recipientName, fontSize);
            const xRecipient = (width - textWidth) / 2;
            const yRecipient = (height - fontSize) / 2;
            firstPage.drawText(capitalizeFirstLetter(certificateDetails.recipientName), {
                x: xRecipient,
                y: yRecipient + 10,
                size: fontSize,
                font: timesRomanBoldFont,
                color: rgb(0, 0, 0),
            });

            const certificateNumberFontSize = 12;
            firstPage.drawText(certificateDetails.certificateNumber, {
                x: width * 0.18,
                y: certificateNumberFontSize,
                size: certificateNumberFontSize,
                font: timesRomanBoldFont,
                color: rgb(0, 0, 0),
            });
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

            console.log(pdfDataUri);


            setCertificateUrl(pdfDataUri)
        }

        generateCertificate()
    }, [])


    return (
        <div className='w-[80vw] h-[80vh]'>
            {certificateUrl ? (
                <object width="100%" height="100%" data={certificateUrl} type="application/pdf">   </object>
            ) :
                <div>
                    <SimpleSpinner className='w-24 h-24' />
                </div>

            }
        </div >
    );
}

