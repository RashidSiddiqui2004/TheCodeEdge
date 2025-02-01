import mongoose, { Schema, type Document } from "mongoose"

export interface Company extends Document {
    companyName: string;
    companyLogo: string;
    createdAt: Date;
    updatedAt: Date;
}

const CompanySchema: Schema<Company> = new Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
        },
        companyLogo: {
            type: String,
            required: [true, "Company logo is required"],
        },
    },
    {
        timestamps: true,
    },
)
const CompanyModel =
    (mongoose.models.Company as mongoose.Model<Company>) || mongoose.model<Company>("Company", CompanySchema)

export default CompanyModel;