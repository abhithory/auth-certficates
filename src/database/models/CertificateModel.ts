import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const CertificateSchema = new Schema({
    certificateNumber: {
        type: String,
        unique: [true, 'Certificate Number already exists!'],
        default: uuidv4
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

// CertificateSchema.pre('save', async function (next) {
//     console.log("isNew", this.isNew);

//     if (!this.isNew) {
//         return next();
//     }
//     const generatedCertificateNumber = uuidv4();
//     this.certificateNumber = String(generatedCertificateNumber).toLowerCase();
//     console.log("generatedCertificateNumber", generatedCertificateNumber);
//     next();
// });

const Certificate = models.Certificate || model('Certificate', CertificateSchema);

export default Certificate;