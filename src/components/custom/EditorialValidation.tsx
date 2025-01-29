import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface EditorialValidationProps {
    handleUpdateShowSchema: (updatedValue: boolean) => void; // To close the popup
}

const EditorialValidation: React.FC<EditorialValidationProps> = ({ handleUpdateShowSchema }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-4 w-96 bg-white shadow-lg rounded-lg border p-4 z-50"
        >
            <Card>
                <CardContent className="relative">
                    {/* Close Button */}
                    <button
                        onClick={() => handleUpdateShowSchema(false)}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 transition"
                    >
                        <X size={18} />
                    </button>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2 text-center">Editorial Structure</h3>

                    {/* Schema Details */}
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>Title:</strong> Min 8, Max 200 characters.</p>
                        <p><strong>Introduction:</strong> Max 5000 characters.</p>
                        <p><strong>Contest Platform:</strong> CodeChef / Codeforces.</p>
                        <p><strong>Contest Name:</strong> Min 4 characters.</p>
                        <p><strong>Language Used:</strong> C, C++, Java, Python, JavaScript.</p>
                        <p><strong>Overall Difficulty:</strong> Easy / Medium / Hard / Expert.</p>
                        <p><strong>Problems:</strong> List of problems with:</p>
                        <ul className="list-disc pl-5">
                            <li>Problem Name (Required)</li>
                            <li>Approach (Required)</li>
                            {/* <li>Difficulty (Easy / Medium / Hard / Expert)</li> */}
                            <li>Link (Valid URL)</li>
                            <li>Code</li>
                        </ul>
                        <p><strong>Outro:</strong> Max 1000 characters.</p>
                        <p><strong>Tags:</strong> List of relevant tags.</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default EditorialValidation;
