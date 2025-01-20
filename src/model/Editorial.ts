
import mongoose, { Schema, type Document } from "mongoose"

export interface Editorial extends Document {
    title: string
    content: string
    author: mongoose.Types.ObjectId
    problem: {
        title: string
        link: string
        difficulty: "Easy" | "Medium" | "Hard"
    }
    tags: string[]
    likes: number
    comments: mongoose.Types.ObjectId[]
    isApproved: boolean
    approvedBy?: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const EditorialSchema: Schema<Editorial> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Editorial title is required"],
            trim: true,
            minlength: [8, "Title must be at least 5 characters long"],
            maxlength: [200, "Title cannot be more than 200 characters"],
        },
        content: {
            type: String,
            required: [true, "Editorial content is required"],
            minlength: [50, "Content must be at least 100 characters long"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
        problem: {
            title: {
                type: String,
                required: [true, "Problem title is required"],
            },
            link: {
                type: String,
                required: [true, "Problem link is required"],
            },
            difficulty: {
                type: String,
                enum: ["Easy", "Medium", "Hard"],
                required: [true, "Problem difficulty is required"],
            },
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        likes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        isApproved: {
            type: Boolean,
            default: false,
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,  
    },
)

const EditorialModel =
    (mongoose.models.Editorial as mongoose.Model<Editorial>) || mongoose.model<Editorial>("Editorial", EditorialSchema)

export default EditorialModel;

