import mongoose from 'mongoose';

export interface IPost {
    content: string;
    title: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model<IPost>('Post', postSchema);