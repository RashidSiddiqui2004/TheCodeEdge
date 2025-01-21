import { AuthorBadge } from '@/enums/AuthorBadges';
import mongoose, { Schema, Document } from 'mongoose';

// first define the interface, then define Schema using corresponding interface 

export interface User extends Document {
    username: string
    email: string
    password: string
    verifyCode: string
    isVerified: boolean
    verifyCodeExpiry: Date
    role: "user" | "admin" | "moderator"
    bio: string
    avatarUrl: string
    socialLinks: {
        github?: string
        linkedin?: string
        twitter?: string
    }
    algoPoints: number
    authorBadge: keyof typeof AuthorBadge
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                "Please use a valid Email Address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        verifyCode: {
            type: String,
            required: [true, "Verification Code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verification Code Expiry Date is required"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user",
        },
        algoPoints: {
            type: Number,
            default: 0,
            min: [0, "AlgoPoints can't be negative"]
        },
        bio: {
            type: String,
            maxlength: [500, "Bio cannot be more than 500 characters"],
        },
        avatarUrl: String,
        socialLinks: {
            github: String,
            linkedin: String,
            twitter: String,
        },
    },
    {
        timestamps: true,
    },
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;