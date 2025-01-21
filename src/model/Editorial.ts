import mongoose, { Schema, Document, Types } from "mongoose";
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";

const { ContestPlatforms, ProgrammingLanguages, QuestionDifficulty } = enumsTheCodeEdge;

// Define the problem structure as a sub-document schema
const ProblemSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, "Problem title is required"],
        trim: true,
    },
    link: {
        type: String,
        required: [true, "Problem link is required"],
        trim: true,
        validate: {
            validator: (v: string) => /^https?:\/\/[\w.-]+/.test(v),
            message: "Invalid URL format",
        },
    },
    difficulty: {
        type: String,
        enum: Object.values(QuestionDifficulty),
        required: [true, "Problem difficulty is required"],
    },
});

export interface Editorial extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    contestPlatform: keyof typeof ContestPlatforms;
    languageUsed: keyof typeof ProgrammingLanguages;
    overallDifficulty: keyof typeof QuestionDifficulty;
    problems: {
        title: string;
        link: string;
        difficulty: keyof typeof QuestionDifficulty;
    }[];
    tags: string[];
    likes: number;
    comments: Types.ObjectId[];
    isApproved: boolean;
    approvedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const EditorialSchema: Schema<Editorial> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Editorial title is required"],
            trim: true,
            minlength: [8, "Title must be at least 8 characters long"],
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        content: {
            type: String,
            required: [true, "Editorial content is required"],
            minlength: [50, "Content must be at least 50 characters long"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
        contestPlatform: {
            type: String,
            enum: Object.keys(ContestPlatforms),
            required: [true, "Contest platform is required"],
        },
        languageUsed: {
            type: String,
            enum: Object.keys(ProgrammingLanguages),
            required: [true, "Programming language is required"],
        },
        overallDifficulty: {
            type: String,
            enum: Object.keys(QuestionDifficulty),
            required: [true, "Overall difficulty is required"],
        },
        problems: [ProblemSchema],
        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        likes: {
            type: Number,
            default: 0,
            min: [0, "Likes cannot be negative"],
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
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const EditorialModel =
    (mongoose.models.Editorial as mongoose.Model<Editorial>) ||
    mongoose.model<Editorial>("Editorial", EditorialSchema);

export default EditorialModel;
