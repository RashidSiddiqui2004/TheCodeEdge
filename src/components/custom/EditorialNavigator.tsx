import { Editorial } from "@/model/Editorial";
import React from "react";

interface EditorialNavigatorProps {
    isCommentSectionOpen: boolean;
    editorial: Editorial;
    onNavigate: (questionId: string) => void;  
}

const EditorialNavigator: React.FC<EditorialNavigatorProps> = ({ isCommentSectionOpen, editorial, onNavigate }) => {
    return (
        <div
            className={`h-fit shadow-md transform transition-transform duration-500 ease-in-out text-white text-fell
                ${!isCommentSectionOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-6 flex flex-col h-full">
                <h2 className="text-lg mb-4">In this editorial</h2>
                <nav className="flex flex-col gap-2 overflow-y-auto flex-grow">
                    {editorial.problems.map((question, index) => (
                        <button
                            key={index}
                            className="text-sm text-gray-200 hover:bg-indigo-100 hover:text-indigo-800 p-3 rounded-md text-left transition"
                            onClick={() => onNavigate(question.problemName)}
                        >
                            {question.problemName}
                        </button>
                    ))}
                </nav>
                <div className="mt-2">
                    <button
                        className="w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-md hover:bg-indigo-700 transition"
                        onClick={() => onNavigate("")}  
                    >
                        Back to Top
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorialNavigator;
