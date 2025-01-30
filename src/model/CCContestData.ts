import { CodechefProblemFromAPI } from "@/types";
import { Schema, type Document, model, models } from "mongoose";

export interface CCContestData extends Document {
    contestId: string;
    problems: CodechefProblemFromAPI[];
    createdAt: Date;
    updatedAt: Date;
}

const CCContestDataSchema: Schema<CCContestData> = new Schema(
    {
        contestId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        problems: [
            {
                name: { type: String, required: true },
                problem_url: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true, // Auto-manage createdAt & updatedAt
    }
);

const CCContestDataModel =
    models.CCContestData || model<CCContestData>("CCContestData", CCContestDataSchema);

export default CCContestDataModel;
