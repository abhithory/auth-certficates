import { Schema, model, models } from 'mongoose';

const CertificateSchema = new Schema({
  certificateNumber: {
    type: String,
    unique: [true, 'Certificate Number already exists!'],
    required: [true, "Certificate number is required"]
  },
  userId: {
    type: String,
    required: [true, 'User is required'],
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Certificate = models.Certificate || model('Certificate', CertificateSchema);

export default Certificate;
