import { SocialLinkInterface } from '@/app/(app)/users/[id]/page';
import { AuthorBadge } from '@/enums/AuthorBadges';
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    username: string
    email?: string
    clerkUserId: string
    role: "user" | "admin"
    bio: string
    socialLinks: SocialLinkInterface
    algoPoints: number
    authorBadge?: keyof typeof AuthorBadge
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
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                "Please use a valid Email Address",
            ],
        },
        clerkUserId: {
            type: String
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
        socialLinks: {
            github: String,
            linkedin: String,
            leetcode: String,
            codechef: String,
            codeforces: String,
        },
        authorBadge: {
            type: String,
            default: AuthorBadge.Reader
        }
    },
    {
        timestamps: true,
    },
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;