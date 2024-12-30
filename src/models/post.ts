import mongoose from 'mongoose';

export interface IPost {
    message: string;
    sender: string;
}

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
});

export default mongoose.model<IPost>('Post', postSchema);