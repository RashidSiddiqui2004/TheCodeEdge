import mongoose, { ObjectId, Schema, type Document } from "mongoose"

export interface Comment extends Document {
    content: string
    author: string
    editorial: ObjectId
    likes: number
    replies: ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const CommentSchema: Schema<Comment> = new Schema(
    {
        content: {
            type: String,
            required: [true, "Comment content is required"],
            trim: true,
            minlength: [1, "Comment must not be empty"],
            maxlength: [1000, "Comment cannot be more than 1000 characters"],
        },
        author: {
            type: String,
            ref: "User",
            required: [true, "Comment author is required"],
        },
        editorial: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Editorial",
            required: [true, "Associated editorial is required"],
        },
        likes: {
            type: Number,
            default: 0,
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ]
    },
    {
        timestamps: true,
    },
)
const CommentModel =
    (mongoose.models.Comment as mongoose.Model<Comment>) || mongoose.model<Comment>("Comment", CommentSchema)

export default CommentModel;