import { OneCertificate } from '@/utils/types/Certificate'
import React, { useState } from 'react'
import { NormalButton } from '../Button/NormalButton'



type ShareCertificateButtonsProps = {
    certificateDetails: OneCertificate
}

export default function ShareCertificateButtons({ certificateDetails }: ShareCertificateButtonsProps) {

    const shareCertificateButtonsContent = "🏆 Proud recipient of Live Full Stack Open Source Cohort! 🎓 This certificate represents dedication, hard work, and a commitment to excellence 🙏 #Certification #Success #Achievement.";
    const certificateUrl = window.location.origin + "/certificate/" + certificateDetails?.certificateNumber;



    function shareOnLinkedIn() {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}&title=${encodeURIComponent(shareCertificateButtonsContent)}`;
        window.open(linkedInShareUrl, '_blank');
    }

    function shareOnTwitter() {
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCertificateButtonsContent)}&url=${encodeURIComponent(certificateUrl)}`;
        window.open(twitterShareUrl, '_blank');
    }


    return (
        <div className="flex gap-2 items-center justify-center">
            <NormalButton className="btn_primary_2"
                onClick={() => {
                    shareOnLinkedIn()
                }}
            >
                Linkedin
            </NormalButton>
            <NormalButton className="btn_primary_2"
                onClick={() => {
                    shareOnTwitter()
                }}
            >
                Twitter
            </NormalButton>
        </div>
    )
}
