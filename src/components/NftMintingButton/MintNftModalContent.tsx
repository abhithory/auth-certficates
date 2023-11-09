"use client";
import React, { useRef, useState } from 'react';
import { OneCertificate } from '@/utils/types/Certificate';
import { ConnectWallet } from "@thirdweb-dev/react";

import { useAddress } from "@thirdweb-dev/react";
import { NormalButton } from '../Button/NormalButton';
import { useGenerateCertificate } from '@/hooks/useGenerateCertificate';
import useMintNft from '@/hooks/useMintNft';
import { apiSetNftMinted } from '@/apiCalls/certificatesApi';



type MintNftModalContentProps = {
    certificateDetails: OneCertificate,
    setCertificateDetails: (certificate: OneCertificate) => void;
}


function MintNftModalContent({ certificateDetails, setCertificateDetails }: MintNftModalContentProps) {
    const address = useAddress();

    const { generateCertificateImage } = useGenerateCertificate({ certificateDetails });
    const { uploadMetadataToIPFS, getNftContract } = useMintNft()

    const [mintingNFT, setMintingNFT] = useState(false);
    const [mintingStepCount, setMintingStepCount] = useState<string>("0");
    const [mintedNftId, setMintedNftId] = useState("")

    const [certificateImageUrl, setCertificateImageUrl] = useState("")

    const pdfContainer = useRef<any>(null)


    const mintNFT = async () => {
        try {
            setMintingNFT(true);
            setMintingStepCount("1")

            const certificateImageUrl = await generateCertificateImage();

            setCertificateImageUrl(certificateImageUrl as string)

            setMintingStepCount("2")
            const metadataURI = await uploadMetadataToIPFS(certificateImageUrl);
            setMintingStepCount("3")
            const nftContract = getNftContract();
            console.log(metadataURI);

            const mintNftTx = await nftContract.safeMint(address, metadataURI);
            const updatedCertificate = await apiSetNftMinted(certificateDetails?.certificateNumber);
            setMintingStepCount("4")
            const receipt = await mintNftTx.wait();
            const nftId = String(receipt?.events[0]?.args?.tokenId);
            setMintedNftId(nftId)
            setMintingStepCount("5")
            setCertificateDetails(updatedCertificate);
        } catch (error) {
            setMintingStepCount("-1")


        } finally {
            setMintingNFT(false);
        }
    }

    const MintingStepsData: { [index: string]: string } = {
        "-1": "Something Went Wrong. Please Try Again",
        "0": "Loading",
        "1": "Creating Metadata",
        "2": "Uploading Metadata to IPFS",
        "3": "Minting NFT. Please Confirm",
        "4": "Please Wait. Confirming the Transaction",
        "5": "Minted Succefully. Please Check Your Wallet"
    }


    return (
        <div className="" ref={pdfContainer} >

            {(certificateDetails?.nftMinted && !mintedNftId) ?
                <p className='text_highlight_gradient
                '>You have already Minted NFT</p>
                :
                <>
                    <ConnectWallet
                        switchToActiveChain={true}
                    />

                    <div className="mt-4">
                        {address ?
                            <div className="">
                                {mintedNftId ?
                                    <h1> Your NFT id: <span className='text_highlight_gradient'>{mintedNftId}</span></h1>
                                    :
                                    <NormalButton onClick={mintNFT} loading={mintingNFT}>
                                        {mintingNFT ? "Minting NFT..." : "Mint Nft"}
                                    </NormalButton>
                                }
                                {certificateImageUrl &&
                                    <div className="my-12">
                                        {mintingStepCount &&
                                            <p className="my-12">{MintingStepsData[mintingStepCount]}</p>
                                        }

                                        <img src={certificateImageUrl} alt="jbkjbk" width="100%" />
                                        <p className='mt-2'>This certificate Will be Minted as NFT</p>

                                    </div>

                                }
                            </div>
                            :
                            <p className=''>Please Connect your Wallet inorder to mint Certificate as NFT</p>
                        }

                    </div>
                </>
            }
        </div>
    )
}

export default MintNftModalContent