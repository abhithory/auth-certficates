import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  recipientName: {
    type: String,
  },
  recipientEmail: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model('User', UserSchema);

export default User; 
