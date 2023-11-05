import mongoose from 'mongoose';

export let isConnectedToDb = false;
export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(process.env.DATABASE_URL || "")
        isConnectedToDb = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}