import { OneCertificate } from '@/utils/types/Certificate'
import React from 'react'
import { NormalButton } from '../Button/NormalButton'

type ShareCertificateButtonsProps = {
    certificateDetails: OneCertificate
}

export default function ShareCertificateButtons({ certificateDetails }: ShareCertificateButtonsProps) {
    const shareCertificateButtonsContent = "Checkout my latest certificate:";
    const certificateUrl = window.location.href + "/certificate" + certificateDetails?.certificateNumber;


    function shareOnLinkedIn() {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}&title=${encodeURIComponent(shareCertificateButtonsContent)}`;
        window.open(linkedInShareUrl, '_blank');
    }

    function shareOnTwitter() {
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCertificateButtonsContent)}&url=${encodeURIComponent(certificateUrl)}`;
        window.open(twitterShareUrl, '_blank');
    }

    return (
        <div className="d-flex items-center justify-center">
            <NormalButton className="btn_primary_2"
                onClick={() => {
                    shareOnLinkedIn()
                }}
            >
                Linked
            </NormalButton>
            <NormalButton className="btn_primary_2"
                onClick={() => {
                    shareOnTwitter()
                }}
            >
                Twitter
            </NormalButton>
            {/* <button className="btn_primary" type="submit" >
              Add certificate to your linked account
            </button> */}
            <NormalButton>
                Mint NFT soon...
            </NormalButton>
        </div>
    )
}
