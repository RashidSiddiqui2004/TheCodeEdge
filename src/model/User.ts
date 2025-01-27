
import { SocialLinkInterface } from '@/app/(app)/user/[id]/page';
import { AuthorBadge } from '@/enums/AuthorBadges';
import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface User extends Document {
    username: string;
    email?: string;
    imageUrl: string;
    clerkUserId: string;
    role: "user" | "admin";
    bio: string;
    socialLinks: SocialLinkInterface;
    algoPoints: number;
    authorBadge?: keyof typeof AuthorBadge;
    editorials: ObjectId[];
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
        imageUrl: {
            type: String,
            default: "https://github.com/shadcn.png"
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
        },
        editorials: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Editorial",
            default: [],
        },
    },
    {
        timestamps: true,
    },
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;