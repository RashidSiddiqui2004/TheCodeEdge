import mongoose, { Schema, Document, Types } from "mongoose";
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";

const { ContestPlatforms, ProgrammingLanguages, QuestionDifficulty } = enumsTheCodeEdge;

// Defining the problem structure as a sub-document schema
const ProblemSchema: Schema = new Schema({
    problemName: {
        type: String,
        required: [true, "Problem name is required (same as in the Contest)"],
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
    approach: {
        type: String,
        required: [true, "Problem approach is required"],
        trim: true,
    },
    code: {
        type: String,
        trim: true,
    },
});

export interface Editorial extends Document {
    title: string;
    author: Types.ObjectId;
    contestPlatform: keyof typeof ContestPlatforms;
    contestName?: string; // optional if some platform is not supported by APIs
    languageUsed: keyof typeof ProgrammingLanguages;
    overallDifficulty: keyof typeof QuestionDifficulty;
    introduction?: string;
    problems: {
        title: string;
        link?: string;
        difficulty: keyof typeof QuestionDifficulty;
        approach: string;
        code?: string;
    }[];
    outro?: string;
    tags?: string[];
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
        contestName: {
            type: String,
            minlength: [3, "Contest name should be atleast 3 characters"],
        },
        languageUsed: {
            type: String,
            enum: Object.keys(ProgrammingLanguages),
            required: [true, "Programming language is required"],
        },
        overallDifficulty: {
            type: String,
            enum: Object.keys(QuestionDifficulty),
            default: QuestionDifficulty.Medium,
            required: [true, "Overall difficulty is required"],
        },
        introduction: {
            type: String,
            // required: [true, "Editorial introduction is required"],
            trim: true,
            // minlength: [8, "Title must be at least 8 characters long"],
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        problems: [ProblemSchema],
        outro: {
            type: String,
            trim: true,
            maxlength: [50, "Title cannot exceed 200 characters"],
        },
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
            min: [0, "Likes can't be negative"],
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
    }
);

const EditorialModel =
    (mongoose.models.Editorial as mongoose.Model<Editorial>) ||
    mongoose.model<Editorial>("Editorial", EditorialSchema);

export default EditorialModel;
