# Certificate Generation and Verification System

The Certificate Generation and Verification System is a web application that allows users to create, download, and share digital certificates. The system ensures the authenticity of the certificates through a verification process. Users can generate certificates, download them in PDF format, and share them on social media platforms.

### Project Website: [https://auth-certficates.vercel.app/](https://auth-certficates.vercel.app/)

## Features

- **Certificate Generation:** Users can fill in their details to generate a certificate, choosing from predefined templates or uploading custom designs.

- **PDF Certificate Download:** Generated certificates are available for download in PDF format, including user details, a unique certificate number.

- **Social Media Sharing:** Users can share certificates on social media platforms (LinkedIn, Twitter) through API integration.

- **Certificate Verification:** A verification page where anyone can enter a certificate number to verify its authenticity.

- **Blockchain Integration (Optional):** Integration with a blockchain for enhanced security and the possibility to mint certificates as non-fungible tokens (NFTs).

## Tech Stack

- Frontend/Backend: Nextjs 14
- Database: MongoDB
- Blockchain Integration (Optional): Ethereum, Binance Smart Chain
- UI Framework: Tailwind Css

## Local Setup

1. Clone the repository:
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the .env.example file to .env:
   ```bash
   cp .env.example .env
   ```
4. Open the .env file and update the MONGODB_URL with your local MongoDB connection string.

   ```bash
    # MongoDB Connection URL
   DATABASE_URL="mongodb://your-mongodb-url"

   # only if you want to Allow NFT Mining
   NEXT_PUBLIC_THIRD_WEB_CLIENT_ID="your-client-id"
   ```
   
![Screenshot from 2023-11-28 02-59-43](https://github.com/abhithory/auth-certficates/assets/76877003/602953e7-c5e4-4ece-a3b2-440e6e0cb926)


