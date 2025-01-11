import mongoose from "mongoose";

export interface IComment {
  postId: mongoose.Schema.Types.ObjectId;
  content: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IComment>("Comment", commentSchema);
