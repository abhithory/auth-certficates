import React from 'react';


import { useStorage, useSigner, useAddress } from "@thirdweb-dev/react";
import { Contract, ethers } from 'ethers';
import { CertificateNftContractAddress } from '@/assets/web3/Address';
import CertificateNftAbi from '@/assets/web3/Abis/CertificateNftAbi.json';




export default function useMintNft() {
    const storage = useStorage();
    const signer = useSigner();


    const getNftContract = (): Contract => {
        const contract = new ethers.Contract(CertificateNftContractAddress, CertificateNftAbi, signer);
        return contract
    }


    const uploadMetadataToIPFS = async (imageUrl: string) => {

        const metadataURI = await storage?.upload({
            "name": "Certificate of Completing Cohort",
            "description": "this certificate is given to this user on completing Cohort",
            "image": imageUrl,
        });


        return metadataURI
    }


    return {
        getNftContract,
        uploadMetadataToIPFS
    }
}
