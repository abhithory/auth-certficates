"use client"
import { OneCertificate } from '@/utils/types/Certificate';
import React, { useState, useRef, useEffect } from 'react';

import { SimpleSpinner } from '../Spinner/SimpleSpinner';
import { useGenerateCertificate } from '@/hooks/useGenerateCertificate';



type GenerateCertificateProps = {
    certificateDetails: OneCertificate
}

export function GenerateCertificate({ certificateDetails }: GenerateCertificateProps) {

    const { certificatePdfUrl, certificateImageUrl } = useGenerateCertificate({ certificateDetails });
    return (
        <div className='w-[80vw] h-[80vh]'>
            {certificatePdfUrl ? (
                <>
                    <object width="100%" height="100%" data={certificatePdfUrl} type="application/pdf">   </object>
                </>
            ) :
                <div>
                    <SimpleSpinner className='w-24 h-24' />
                </div>

            }
        </div >
    );
}

