"use client";
import { OneCertificate } from '@/utils/types/Certificate'
import React, { useState } from 'react'
import { NormalButton } from '../Button/NormalButton'
import { toast } from 'react-toastify'
import PopUpModal from '../Modal/PopUpModal';
import MintNftModalContent from './MintNftModalContent';


import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";

type ShareCertificateButtonsProps = {
    certificateDetails: OneCertificate
}

export default function ShareCertificateButtons({ certificateDetails }: ShareCertificateButtonsProps) {
    const [showMintNftModal, setShowMintNftModal] = useState(false);

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
        <>
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
                {/* <button className="btn_primary" type="submit" >
              Add certificate to your linked account
            </button> */}
                <NormalButton className="btn_primary_2"
                    onClick={() => {
                        setShowMintNftModal(true)
                    }}
                >
                    Mint NFT
                </NormalButton>
            </div>
            <PopUpModal isOpen={showMintNftModal} closeModal={() => setShowMintNftModal(false)}>
                <ThirdwebProvider activeChain={Mumbai}
                    supportedChains={[Mumbai]}
                    clientId='e69e5a67aa018f12d479d0e99d2c7090'
                >
                    <MintNftModalContent certificateDetails={certificateDetails} />
                </ThirdwebProvider>
            </PopUpModal>
        </>
    )
}
