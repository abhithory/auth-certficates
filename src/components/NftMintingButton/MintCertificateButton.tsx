import React, { useState } from 'react'
import { NormalButton } from '../Button/NormalButton'
import PopUpModal from '../Modal/PopUpModal'
import MintNftModalContent from './MintNftModalContent'

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import { OneCertificate } from '@/utils/types/Certificate';


type MintCertificateButtonsProps = {
    certificateDetails: OneCertificate,
    setCertificateDetails: (certificate: OneCertificate) => void;
    className?: string;
}

export default function MintCertificateButton({ certificateDetails, setCertificateDetails, className }: MintCertificateButtonsProps) {
    const [showMintNftModal, setShowMintNftModal] = useState(false);

    const thirdWebClientId = process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID || "";

    return (
        <>
            <NormalButton className={`btn_secondary_2`}
                onClick={() => {
                    if (!certificateDetails.nftMinted) {
                        setShowMintNftModal(true)
                    }
                }}
            >
                {certificateDetails.nftMinted ?
                    "NFT Already Minted"
                    :
                    "Mint Certificate as NFT"
                }
            </NormalButton>
            <PopUpModal isOpen={showMintNftModal} closeModal={() => setShowMintNftModal(false)}>
                <ThirdwebProvider activeChain={Mumbai}
                    supportedChains={[Mumbai]}
                    clientId={thirdWebClientId}
                >
                    <MintNftModalContent certificateDetails={certificateDetails} setCertificateDetails={setCertificateDetails} />
                </ThirdwebProvider>
            </PopUpModal>
        </>
    )
}
