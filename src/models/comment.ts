import mongoose from "mongoose";

export interface IComment {
  postId: string;
  content: string;
  sender: string;
}

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  sender: { type: String, required: true },
});

export default mongoose.model<IComment>("Comment", commentSchema);
