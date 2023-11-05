import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const CertificateSchema = new Schema({
    certificateNumber: {
        type: String,
        unique: true,
        required: true,
    },
    recipientName: {
        type: String,
    },
    recipientEmail: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    image: {
        type: String,
    }
});

CertificateSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    const generatedCertificateNumber = uuidv4();
    this.certificateNumber = generatedCertificateNumber;
    next();
});

const Certificate = models.Certificate || model('Certificate', CertificateSchema);

export default Certificate;