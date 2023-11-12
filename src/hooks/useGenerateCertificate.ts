import { OneCertificate } from '@/utils/types/Certificate';
import { useState, useEffect } from 'react';

import { encodeToBase64, PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { capitalizeFirstLetter } from '@/utils/helpers/texts';
import { toast } from 'react-toastify'





type GenerateCertificateProps = {
    certificateDetails: OneCertificate
}

export function useGenerateCertificate({ certificateDetails }: GenerateCertificateProps) {
    const [genertating, setGenertating] = useState(false);
    const [certificatePdfUrl, setCertificateUrl] = useState<string | null>(null);
    const [certificateImageUrl, setCertificateImageUrl] = useState("");

    useEffect(() => {
        async function generateCertificate() {
            setGenertating(true);
            try {

                const existingPdfBytes = await fetch('/certificate.pdf').then((res) => res.arrayBuffer());
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)


                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize();


                const fontSize = 50;
                const textWidth = timesRomanBoldFont.widthOfTextAtSize(certificateDetails.recipientName, fontSize);
                const xRecipient = (width - textWidth) / 2;
                const yRecipient = height * 0.44;
                firstPage.drawText(capitalizeFirstLetter(certificateDetails.recipientName), {
                    x: xRecipient,
                    y: yRecipient,
                    size: fontSize,
                    font: timesRomanBoldFont,
                    color: rgb(1, 1, 1),
                });

                const certificateNumberFontSize = 12;
                firstPage.drawText("Certificate No:" + certificateDetails.certificateNumber, {
                    x: width * 0.12,
                    y: height * 0.08,
                    size: certificateNumberFontSize,
                    font: timesRomanBoldFont,
                    color: rgb(1, 1, 1),
                });
                const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
                setCertificateUrl(pdfDataUri);
            } catch (error) {
                console.log(error);

                toast.error("something went wrong while generating Certificate");
            } finally {
                setGenertating(false);
            }
        }

        generateCertificate()
    }, [certificateDetails]);


    const generateCertificateImage = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            const offscreenCanvas = document.createElement('canvas');
            const ctx = offscreenCanvas.getContext('2d');

            const certificateImage = new Image();
            certificateImage.src = '/certificate.png';

            certificateImage.onload = () => {
                // Set the off-screen canvas dimensions to match the loaded image
                offscreenCanvas.width = certificateImage.width;
                offscreenCanvas.height = certificateImage.height;

                const recipientName = capitalizeFirstLetter(certificateDetails.recipientName);

                if (ctx) {
                    ctx.drawImage(certificateImage, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
                    ctx.font = 'bold 60px Times Roman';

                    const textWidth = ctx.measureText(`${recipientName}`).width;
                    const textX = (offscreenCanvas.width - textWidth) / 2;
                    const textY = (offscreenCanvas.height + 50) / 2;
                    ctx.fillText(`${recipientName}`, textX, textY);


                    ctx.font = 'bold 18px Times Roman';
                    ctx.fillText(certificateDetails.certificateNumber, offscreenCanvas.width * 0.18, offscreenCanvas.height);

                    const dataUrl = offscreenCanvas.toDataURL();
                    resolve(dataUrl);
                } else {
                    reject('Error creating off-screen canvas context');
                }
            };

            certificateImage.onerror = () => {
                reject('Error loading certificate image');
            };
        });

    }


    return {
        certificatePdfUrl,
        certificateImageUrl,
        generateCertificateImage,
        genertating
    };
}

