import { Schema, model, models } from 'mongoose';



const CertificateSchema = new Schema({
    certificateNumber: {
        type: String,
        unique: [true, 'Certificate Number already exists!'],
        required: [true, "Certificate number is required"]
    },
    recipientName: {
        type: String,
    },
    recipientEmail: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    nftMinted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Certificate = models.Certificate || model('Certificate', CertificateSchema);

export default Certificate;